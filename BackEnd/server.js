const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");
const pool = require("./database");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json(), cors());

const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) =>
    path.extname(file.originalname).toLowerCase() === ".xlsx"
      ? cb(null, true)
      : cb(new Error("Only .xlsx files allowed")),
});

app.post(
  "/api/finances/upload/:userId/:year",
  upload.single("file"),
  async (req, res) => {
    const { userId, year } = req.params;
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    try {
      const [users] = await pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
      );
      if (!users.length) throw new Error("User not found");

      const wb = XLSX.readFile(filePath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      if (!sheet) throw new Error("Empty or invalid sheet");

      const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });
      const toInsert = rows
        .map((r) => {
          const month = r.Month ?? r.month;
          const amount = Number(r.Amount ?? r.amount);
          return month && !isNaN(amount)
            ? [userId, Number(year), String(month), amount]
            : null;
        })
        .filter(Boolean);

      if (!toInsert.length) throw new Error("No valid rows found in file");

      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();
        await conn.query(
          "DELETE FROM financial_records WHERE user_id = ? AND year = ?",
          [userId, year]
        );
        await conn.query(
          "INSERT INTO financial_records (user_id, year, month, amount) VALUES ?",
          [toInsert]
        );
        await conn.commit();
        res.json({
          message: "File processed and data saved",
          inserted: toInsert.length,
        });
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    } catch (err) {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      console.error(err);
      res
        .status(err.message === "User not found" ? 404 : 500)
        .json({ error: err.message });
    }
  }
);

// GET records with user name
app.get("/api/finances/:userId/:year", async (req, res) => {
  const { userId, year } = req.params;

  try {
    const [records] = await pool.query(
      `SELECT fr.record_id, fr.user_id, u.name AS user_name, fr.year, fr.month, fr.amount, fr.created_at
       FROM financial_records fr
       JOIN users u ON fr.user_id = u.user_id
       WHERE fr.user_id = ? AND fr.year = ?
       ORDER BY STR_TO_DATE(CONCAT(fr.year, fr.month), "%Y%B")`,
      [userId, year]
    );

    if (!records.length) {
      const [users] = await pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
      );
      if (!users.length)
        return res.status(404).json({ error: "User not found" });
      return res.json({
        user: { user_id: users[0].user_id, name: users[0].name },
        year: Number(year),
        records: [],
      });
    }

    res.json({
      user: { user_id: records[0].user_id, name: records[0].user_name },
      year: Number(year),
      records,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

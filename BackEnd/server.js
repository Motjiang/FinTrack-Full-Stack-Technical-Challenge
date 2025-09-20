const express = require("express");
const multer = require("multer"); // Middleware for handling multipart/form-data (file uploads)
const XLSX = require("xlsx"); // Library to read/write Excel files
const path = require("path");
const fs = require("fs");
const pool = require("./database"); // MySQL connection pool
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();

// --- Middleware setup ---
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// --- Upload directory setup ---
const UPLOAD_DIR = path.join(__dirname, "uploads");
// Ensure the folder exists; create if missing
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// --- Multer setup for file uploads ---
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR, // Files saved in uploads folder
    filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Unique filenames
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB per file
  fileFilter: (_, file, cb) =>
    path.extname(file.originalname).toLowerCase() === ".xlsx"
      ? cb(null, true) // Accept only Excel files
      : cb(new Error("Only .xlsx files allowed")), // Reject others
});

// --- POST endpoint: Upload Excel and save financial records ---
app.post(
  "/api/finances/upload/:userId/:year",
  upload.single("file"), // Accept a single file with "file" field
  async (req, res) => {
    const { userId, year } = req.params;

    // Validate file presence
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;

    try {
      // Check if user exists
      const [users] = await pool.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId]
      );
      if (!users.length) throw new Error("User not found");

      // Read Excel file
      const wb = XLSX.readFile(filePath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      if (!sheet) throw new Error("Empty or invalid sheet");

      // Convert Excel sheet to JSON rows
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

      // Prepare rows for insertion
      const toInsert = rows
        .map((r) => {
          const month = r.Month ?? r.month; // Support different column names
          const amount = Number(r.Amount ?? r.amount);
          return month && !isNaN(amount)
            ? [userId, Number(year), String(month), amount]
            : null; // Ignore invalid rows
        })
        .filter(Boolean); // Remove null values

      if (!toInsert.length) throw new Error("No valid rows found in file");

      // --- Database transaction ---
      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();

        // Remove existing records for the same user/year
        await conn.query(
          "DELETE FROM financial_records WHERE user_id = ? AND year = ?",
          [userId, year]
        );

        // Bulk insert new records
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
        await conn.rollback(); // Rollback on error
        throw err;
      } finally {
        conn.release();
      }
    } catch (err) {
      // Delete uploaded file if any error occurs
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      console.error(err);
      res
        .status(err.message === "User not found" ? 404 : 500)
        .json({ error: err.message });
    }
  }
);

// --- GET endpoint: Fetch financial records for a user/year ---
app.get("/api/finances/:userId/:year", async (req, res) => {
  const { userId, year } = req.params;

  try {
    // Join financial_records with users table to get user name
    const [records] = await pool.query(
      `SELECT fr.record_id, fr.user_id, u.name AS user_name, fr.year, fr.month, fr.amount, fr.created_at
       FROM financial_records fr
       JOIN users u ON fr.user_id = u.user_id
       WHERE fr.user_id = ? AND fr.year = ?
       ORDER BY STR_TO_DATE(CONCAT(fr.year, fr.month), "%Y%B")`,
      [userId, year]
    );

    if (!records.length) {
      // Return user info with empty records if no data
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

    // Return records with user info
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

// --- Start server ---
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

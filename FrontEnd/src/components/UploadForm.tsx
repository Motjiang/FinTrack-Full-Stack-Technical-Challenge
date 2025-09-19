import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { uploadFinancialData } from "../services/api";

interface UploadFormProps {
  userId: number;
  year: number;
  onUploadSuccess?: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({
  userId,
  year,
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select a file.");

    setLoading(true);

    try {
      const res = await uploadFinancialData(userId, year, file);
      toast.success(`Success! ${res.inserted} records saved.`);
      setFile(null);
      onUploadSuccess?.();
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Upload failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
        <input
          type="file"
          accept=".xlsx"
          className="form-control"
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

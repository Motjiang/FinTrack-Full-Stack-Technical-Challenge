import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { uploadFinancialData } from "../services/api";

// Props for the UploadForm component
interface UploadFormProps {
  userId: number; // Current user ID for which file is being uploaded
  year: number; // Year for the financial records
  onUploadSuccess?: () => void; // Optional callback after successful upload
}

const UploadForm: React.FC<UploadFormProps> = ({
  userId,
  year,
  onUploadSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null); // Selected file state
  const [loading, setLoading] = useState(false); // Loading state for submission

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate file selection
    if (!file) return toast.warning("Please select a file.");

    setLoading(true); // Show loading state

    try {
      // Call API to upload file
      const res = await uploadFinancialData(userId, year, file);

      // Show success toast with number of records inserted
      toast.success(`Success! ${res.inserted} records saved.`);

      setFile(null); // Reset file input
      onUploadSuccess?.(); // Trigger optional callback if provided
    } catch (err: unknown) {
      // Handle error messages gracefully
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Upload failed");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
        {/* File input */}
        <input
          type="file"
          accept=".xlsx" // Only allow Excel files
          className="form-control"
          onChange={handleFileChange}
        />

        {/* Submit button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;

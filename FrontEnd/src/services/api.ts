import axios from "axios";

// Create a pre-configured Axios instance
// This allows all requests to use the same base URL and headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL from environment variable
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

/**
 * Upload an Excel file containing financial records for a specific user and year
 * @param userId - ID of the user
 * @param year - Year of the financial records
 * @param file - Excel file to upload (.xlsx)
 * @returns Response data from the server
 */
export const uploadFinancialData = async (
  userId: number,
  year: number,
  file: File
) => {
  // FormData is required to send file content via multipart/form-data
  const formData = new FormData();
  formData.append("file", file);

  // POST request to backend endpoint
  const response = await api.post(`/upload/${userId}/${year}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Override header for file upload
    },
  });

  return response.data; // Return server response
};

/**
 * Fetch financial records for a specific user and year
 * @param userId - ID of the user
 * @param year - Year of the financial records
 * @returns An object containing records, userName, and year
 */
export const getFinancialRecords = async (userId: number, year: number) => {
  const response = await api.get(`/${userId}/${year}`);

  // Standardize the response so frontend always has expected data
  return {
    records: response.data.records,                    // Array of financial records
    userName: response.data.user?.name || "Unknown User", // Fallback if user name missing
    year: response.data.year,                          // Year of the records
  };
};

export default api;

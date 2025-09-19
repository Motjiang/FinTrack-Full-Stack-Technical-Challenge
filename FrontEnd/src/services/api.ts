import axios from "axios";

// Create a pre-configured Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Upload Excel file
export const uploadFinancialData = async (
  userId: number,
  year: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/upload/${userId}/${year}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get financial records
export const getFinancialRecords = async (userId: number, year: number) => {
  const response = await api.get(`/${userId}/${year}`);
  return response.data;
};

export default api;

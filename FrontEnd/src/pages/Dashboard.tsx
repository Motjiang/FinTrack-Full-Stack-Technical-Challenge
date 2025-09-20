import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import SearchForm from "../components/SearchForm";
import DataDisplay from "../components/DataDisplay";
import { getFinancialRecords } from "../services/api";
import type { FinancialRecord } from "../types/financialRecord";

const Dashboard: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [userId, setUserId] = useState<number>(1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const [userName, setUserName] = useState<string>("");

  const handleSearch = async (id: number, yr: number) => {
    setUserId(id);
    setYear(yr);
    try {
      const data = await getFinancialRecords(id, yr);
      setRecords(data.records);
      setUserName(data.userName)
    } catch (err) {
      console.error(err);
      setRecords([]);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="header">Financial Dashboard</h2>
      <p className="description">
        Track and visualize monthly financial records. Upload Excel files, fetch
        data, and analyze trends with interactive table and charts.
      </p>

      <div className="d-flex align-items-start gap-3 mb-4">
        <div className="flex-grow-1">
          <UploadForm
            userId={userId}
            year={year}
            onUploadSuccess={() => handleSearch(userId, year)}
          />
        </div>
        <div>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

<DataDisplay records={records} userName={userName} year={year} />
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import type { FormEvent } from "react";

interface SearchFormProps {
  onSearch: (userId: number, year: number) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [userId, setUserId] = useState<number>(1);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(userId, year);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2" style={{ margin: 0 }}>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="userId" className="visually-hidden">User ID</label>
        <input
          id="userId"
          type="number"
          className="form-control"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          style={{ height: "38px" }} // match UploadForm input height
        />
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label htmlFor="year" className="visually-hidden">Year</label>
        <input
          id="year"
          type="number"
          className="form-control"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ height: "38px" }} // match UploadForm input height
        />
      </div>
      <button type="submit" className="btn btn-success" style={{ height: "38px" }}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;

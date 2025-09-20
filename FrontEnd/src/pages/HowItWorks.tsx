import React from "react";
import "./HowItWorks.css";

const HowItWorks: React.FC = () => {
  return (
    <div className="howitworks container my-5">
      <h1 className="display-4 mb-4">How FinTrack Works :)</h1>
      <p className="lead mb-5">
        FinTrack is a simple and intuitive financial tracker that lets you
        upload monthly financial data, visualize it, and manage records
        effortlessly.
      </p>

      <section className="mb-5">
        <h2 className="h4 mb-3">1. Upload Your Excel File</h2>
        <p>
          Select an Excel file (.xlsx) containing <strong>Month</strong> and{" "}
          <strong>Amount</strong> columns. The app validates the file type and
          structure before uploading.
        </p>
        <ul>
          <li>
            File type must be <strong>.xlsx</strong>.
          </li>
          <li>Each row must have a valid month and numeric amount.</li>
          <li>Invalid rows are skipped automatically.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="h4 mb-3">2. Upload Validation & Notifications</h2>
        <p>
          After clicking <strong>Upload</strong>, FinTrack validates your data
          and stores it in the database. You will get a notification using{" "}
          <strong>React Toastify</strong> confirming whether the upload was
          successful or if there were errors.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="h4 mb-3">3. Search & View Data</h2>
        <p>
          You can select a <strong>User ID</strong> and <strong>Year</strong> to
          fetch stored financial records.
        </p>
        <ul>
          <li>Records are displayed in a clean, striped table.</li>
          <li>Table includes Month and Amount columns.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="h4 mb-3">4. Visualize with Charts</h2>
        <p>
          Data is automatically displayed in a <strong>bar chart</strong> for
          easy visualization of trends across months. Each month has a distinct
          color for clarity.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="h4 mb-3">5. Technologies Used</h2>
        <p>This project demonstrates a full-stack workflow:</p>
        <ul>
          <li>
            <strong>Frontend:</strong> ReactJS, TypeScript, Bootstrap 5, CSS,
            Chart.js, React Toastify
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express, Axios
          </li>
          <li>
            <strong>Database:</strong> MySQL
          </li>
        </ul>
      </section>

      <p className="text-muted mt-5">
        By following these steps, anyone can upload financial data, validate it,
        and visualize it clearly — making it easy to understand your financial
        trends.
      </p>
    </div>
  );
};

export default HowItWorks;

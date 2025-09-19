import React from "react";
import "./HowItWorks.css";

const HowItWorks: React.FC = () => {
  return (
    <div className="how-container">

      {/* Header */}
      <header className="how-header">
        <h1>FinTrack: Your Financial Tracker</h1>
        <p>Step-by-step guide to uploading, visualizing, and analyzing your financial data.</p>
      </header>

      {/* Steps / Manual */}
      <section className="how-steps">
        <div className="step">
          <div className="step-number">1</div>
          <h2>Upload Your Excel File</h2>
          <p>
            Choose a <code>.xlsx</code> file containing monthly financial data for a user and a specific year. 
            Our system validates the file to ensure it meets the required structure.
          </p>
        </div>

        <div className="step">
          <div className="step-number">2</div>
          <h2>Backend Processing & Storage</h2>
          <p>
            The backend, built with <strong>Node.js</strong> and <strong>Express</strong>, parses your Excel file 
            and stores each record in the <strong>MySQL</strong> database. Each record is associated with the selected user and year.
          </p>
        </div>

        <div className="step">
          <div className="step-number">3</div>
          <h2>Retrieve & Display Data</h2>
          <p>
            Use the dashboard to select a <strong>user</strong> and <strong>year</strong>. The system fetches the data via the API and displays it in a table 
            and an interactive bar chart using <strong>React.js</strong> and <strong>Chart.js</strong>.
          </p>
        </div>

        <div className="step">
          <div className="step-number">4</div>
          <h2>Analyze & Visualize</h2>
          <p>
            Quickly analyze trends in income and spending. Use the visual dashboard to make informed financial decisions. 
            You can upload updated files, and the system will merge or update records for the year.
          </p>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="tech-stack">
        <h2>Technology Stack</h2>
        <ul>
          <li><strong>Frontend:</strong> React.js, TypeScript, Vite, Bootstrap 5, Chart.js, Custom CSS</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MySQL</li>
          <li><strong>File Handling:</strong> Excel (.xlsx) parsing with <code>xlsx</code> library</li>
          <li><strong>API Communication:</strong> Axios</li>
        </ul>
      </section>

    </div>
  );
};

export default HowItWorks;

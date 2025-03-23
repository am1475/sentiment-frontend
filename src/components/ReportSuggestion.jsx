import React from 'react';
import ReactMarkdown from 'react-markdown';

const ReportSuggestion = ({ suggestionText }) => {
  return (
    <div className="report-container">
      <ReactMarkdown>{suggestionText}</ReactMarkdown>
      <style jsx>{`
        .report-container {
          background-color: #fff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-top: 20px;
          color: #333;
          font-family: 'Arial', sans-serif;
        }
        .report-container h1,
        .report-container h2,
        .report-container h3 {
          color: #1976d2;
          margin-bottom: 10px;
        }
        .report-container h3 {
          font-size: 1.2rem;
          color: #F44336;
        }
        .report-container p {
          margin-bottom: 10px;
          font-size: 1rem;
          line-height: 1.5;
        }
        .report-container ul {
          margin-left: 20px;
          list-style-type: disc;
          margin-bottom: 10px;
        }
        .report-container li {
          margin-bottom: 5px;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default ReportSuggestion;

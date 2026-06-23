import React, { useState } from 'react';
import { createFormattedSheet, saveWorkbook } from '../utils/excelBuilder';
import tracker from '../utils/monetization';
import './ExcelGenerator.css';

const ExcelGenerator = ({ onGenerate }) => {
  const [csvData, setCsvData] = useState('');
  const [sheetName, setSheetName] = useState('Sheet1');
  const [fileName, setFileName] = useState('nurasyid-export');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGenerateExcel = async () => {
    if (!csvData.trim()) {
      setError('Please enter some data first');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const rows = csvData.split('\n').map(line => {
        return line.split(',').map(cell => cell.trim());
      }).filter(row => row.some(cell => cell));

      if (rows.length === 0) {
        throw new Error('No valid data found');
      }

      const workbook = createFormattedSheet(rows, sheetName, {
        hasHeader: true,
        autoFilter: true,
        freezePane: true
      });

      await saveWorkbook(workbook, `${fileName}.xlsx`);

      tracker.trackFileGeneration({
        name: `${fileName}.xlsx`,
        size: csvData.length,
        rows: rows.length,
        columns: rows[0].length,
        source: 'manual'
      });
      onGenerate?.();

      setSuccess(true);
      setCsvData('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to generate Excel file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="excel-generator-container">
      <div className="generator-card">
        <h2>📊 Excel Generator</h2>
        <p>Enter data and create a formatted Excel file</p>

        <div className="form-group">
          <label>File Name (without .xlsx)</label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="nurasyid-export"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Sheet Name</label>
          <input
            type="text"
            value={sheetName}
            onChange={(e) => setSheetName(e.target.value)}
            placeholder="Sheet1"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Data (CSV format - comma separated)</label>
          <textarea
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            placeholder="Name, Email, Amount\nJohn Doe, john@example.com, 1000\nJane Smith, jane@example.com, 2000"
            className="textarea-field"
            rows="10"
          />
          <small>Each line is a row. Separate columns with commas.</small>
        </div>

        <div className="info-box">
          <p>💡 <strong>Tip:</strong> The first row will be formatted as header with blue background</p>
          <p>✨ <strong>Features:</strong> Auto-fit columns, freeze header, auto-filter, watermark</p>
        </div>

        <button
          onClick={handleGenerateExcel}
          disabled={loading}
          className="btn btn-generate"
        >
          {loading ? '⏳ Generating...' : '📥 Generate & Download Excel'}
        </button>

        {error && <div className="error-message">❌ {error}</div>}
        {success && (
          <div className="success-message">✅ Excel file downloaded successfully with nurasyid watermark!</div>
        )}
      </div>
    </div>
  );
};

export default ExcelGenerator;
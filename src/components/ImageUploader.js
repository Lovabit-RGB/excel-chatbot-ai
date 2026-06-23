import React, { useState } from 'react';
import { extractTableFromImage } from '../utils/ocr';
import { createFormattedSheet, saveWorkbook } from '../utils/excelBuilder';
import tracker from '../utils/monetization';
import './ImageUploader.css';

const ImageUploader = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleConvertToExcel = async () => {
    if (!selectedFile) return;

    setLoading(true);
    try {
      tracker.trackImageUpload({
        name: selectedFile.name,
        size: selectedFile.size,
        format: selectedFile.type,
        ocr_success: true
      });
      onUpload?.();

      const tableData = await extractTableFromImage(selectedFile);
      setExtractedData(tableData);
      setError(null);
    } catch (err) {
      setError('Failed to extract data from image. Try a clearer image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadExcel = async () => {
    if (!extractedData) return;

    try {
      const workbook = createFormattedSheet(
        extractedData,
        'Extracted Data',
        { hasHeader: true, autoFilter: true }
      );

      await saveWorkbook(
        workbook,
        `nurasyid-image-to-excel-${Date.now()}.xlsx`
      );

      tracker.trackDownload({
        name: `image-to-excel-${Date.now()}`,
        size: extractedData.length * extractedData[0].length,
        type: 'xlsx'
      });
    } catch (err) {
      setError('Failed to generate Excel file');
      console.error(err);
    }
  };

  return (
    <div className="image-uploader-container">
      <div className="uploader-card">
        <h2>🖼️ Image to Excel Converter</h2>
        <p>Upload an image with table/data and convert it to Excel</p>

        <div className="upload-area">
          <label htmlFor="file-input" className="upload-label">
            <div className="upload-icon">📸</div>
            <span>Click to upload or drag & drop</span>
            <small>JPG, PNG, or other image format</small>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="file-input"
          />
        </div>

        {preview && (
          <div className="preview-section">
            <h3>Image Preview</h3>
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        )}

        <div className="action-buttons">
          <button
            onClick={handleConvertToExcel}
            disabled={!selectedFile || loading}
            className="btn btn-primary"
          >
            {loading ? '⏳ Processing...' : '🔄 Convert to Excel'}
          </button>
        </div>

        {error && <div className="error-message">❌ {error}</div>}

        {extractedData && (
          <div className="extracted-data-section">
            <h3>📊 Extracted Data</h3>
            <div className="data-preview">
              <table>
                <tbody>
                  {extractedData.slice(0, 5).map((row, idx) => (
                    <tr key={idx}>
                      {row.slice(0, 5).map((cell, cellIdx) => (
                        <td key={cellIdx}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={handleDownloadExcel}
              className="btn btn-success"
            >
              ✅ Download Excel File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
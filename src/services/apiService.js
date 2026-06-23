/**
 * API Service for Excel Chatbot AI
 * Handles all API communications
 */

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Get AI response for chat message
 */
export const getChatResponse = async (message) => {
  try {
    const response = await apiClient.post('/chat', { message });
    return response.data;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};

/**
 * Generate Excel from data
 */
export const generateExcelFromData = async (data) => {
  try {
    const response = await apiClient.post('/excel/generate', { data });
    return response.data;
  } catch (error) {
    console.error('Excel generation error:', error);
    throw error;
  }
};

/**
 * Process image OCR
 */
export const processImageOCR = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await apiClient.post('/ocr/process', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('OCR processing error:', error);
    throw error;
  }
};

/**
 * Get file download URL
 */
export const getFileDownloadURL = async (fileId) => {
  try {
    const response = await apiClient.get(`/files/${fileId}/download`);
    return response.data;
  } catch (error) {
    console.error('File download error:', error);
    throw error;
  }
};

export default apiClient;
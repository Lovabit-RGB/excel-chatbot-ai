/**
 * OCR utility using Tesseract.js
 * Converts images to text and Excel data
 */

import { createWorker } from 'tesseract.js';

let worker = null;

const initWorker = async () => {
  if (!worker) {
    worker = await createWorker();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
  }
  return worker;
};

export const extractTextFromImage = async (image) => {
  try {
    const w = await initWorker();
    const result = await w.recognize(image);
    return result.data.text;
  } catch (error) {
    console.error('OCR error:', error);
    throw error;
  }
};

export const extractTableFromImage = async (image) => {
  try {
    const text = await extractTextFromImage(image);
    return parseTableText(text);
  } catch (error) {
    console.error('Table extraction error:', error);
    throw error;
  }
};

const parseTableText = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  const table = lines.map(line => {
    return line.split(/\s{2,}|\t/).map(cell => cell.trim());
  });
  return table;
};

export const terminateWorker = async () => {
  if (worker) {
    await worker.terminate();
    worker = null;
  }
};

export default { extractTextFromImage, extractTableFromImage, terminateWorker };

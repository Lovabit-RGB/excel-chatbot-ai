/**
 * Analytics Service for Monetization Tracking
 * Sends analytics data to backend
 */

import axios from 'axios';

const ANALYTICS_URL = process.env.REACT_APP_ANALYTICS_URL || 'http://localhost:3001/analytics';

const analyticsClient = axios.create({
  baseURL: ANALYTICS_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Track event
 */
export const trackEvent = async (event) => {
  try {
    await analyticsClient.post('/track', event);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

/**
 * Get analytics summary
 */
export const getAnalyticsSummary = async (sessionId) => {
  try {
    const response = await analyticsClient.get(`/summary/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error('Analytics summary error:', error);
    throw error;
  }
};

/**
 * Get revenue report
 */
export const getRevenueReport = async (params) => {
  try {
    const response = await analyticsClient.get('/revenue', { params });
    return response.data;
  } catch (error) {
    console.error('Revenue report error:', error);
    throw error;
  }
};

export default analyticsClient;
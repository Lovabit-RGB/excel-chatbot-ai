/**
 * Monetization tracking system
 * Tracks pay-per-click metrics for the Excel Chatbot AI
 */

class MonetizationTracker {
  constructor() {
    this.events = [];
    this.session_id = this.generateSessionId();
    this.start_time = new Date();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  trackClick(action, metadata = {}) {
    const event = {
      type: 'click',
      action,
      timestamp: new Date(),
      session_id: this.session_id,
      metadata
    };
    this.events.push(event);
    this.sendAnalytics(event);
    return event;
  }

  trackFileGeneration(fileData) {
    return this.trackClick('file_generation', {
      file_name: fileData.name,
      file_size: fileData.size,
      rows: fileData.rows,
      columns: fileData.columns,
      source: fileData.source
    });
  }

  trackImageUpload(imageData) {
    return this.trackClick('image_upload', {
      file_name: imageData.name,
      file_size: imageData.size,
      format: imageData.format,
      ocr_success: imageData.ocr_success
    });
  }

  trackChatInteraction(message, response) {
    return this.trackClick('chat_interaction', {
      message_length: message.length,
      response_length: response.length,
      timestamp: new Date()
    });
  }

  trackDownload(downloadData) {
    return this.trackClick('download', {
      file_name: downloadData.name,
      file_size: downloadData.size,
      file_type: downloadData.type
    });
  }

  async sendAnalytics(event) {
    try {
      if (process.env.REACT_APP_ANALYTICS_URL) {
        await fetch(process.env.REACT_APP_ANALYTICS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event)
        });
      }
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }

  getStats() {
    const actionCounts = {};
    this.events.forEach(event => {
      actionCounts[event.action] = (actionCounts[event.action] || 0) + 1;
    });
    return {
      session_id: this.session_id,
      total_clicks: this.events.length,
      session_duration: new Date() - this.start_time,
      actions: actionCounts,
      start_time: this.start_time,
      end_time: new Date()
    };
  }
}

const tracker = new MonetizationTracker();
export default tracker;
export { MonetizationTracker };

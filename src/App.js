import React, { useState } from 'react';
import ChatBot from './components/ChatBot';
import ExcelGenerator from './components/ExcelGenerator';
import ImageUploader from './components/ImageUploader';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [monetizationData, setMonetizationData] = useState({
    clicks: 0,
    conversions: 0,
    uploads: 0
  });

  const trackClick = (action) => {
    setMonetizationData(prev => ({
      ...prev,
      clicks: prev.clicks + 1,
      [action]: prev[action] + 1
    }));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🤖 Excel Chatbot AI</h1>
        <p>AI-Powered Excel Generation & Guidance</p>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat Assistant
        </button>
        <button
          className={`nav-btn ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => setActiveTab('image')}
        >
          🖼️ Image to Excel
        </button>
        <button
          className={`nav-btn ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          📊 Excel Generator
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'chat' && (
          <ChatBot onInteraction={() => trackClick('conversions')} />
        )}
        {activeTab === 'image' && (
          <ImageUploader onUpload={() => trackClick('uploads')} />
        )}
        {activeTab === 'generator' && (
          <ExcelGenerator onGenerate={() => trackClick('conversions')} />
        )}
      </main>

      <footer className="app-footer">
        <div className="monetization-stats">
          <span>📊 Interactions: {monetizationData.clicks}</span>
          <span>📁 Files Generated: {monetizationData.conversions}</span>
          <span>📸 Images Uploaded: {monetizationData.uploads}</span>
        </div>
        <p>© 2024 nurasyid - All Excel files watermarked</p>
      </footer>
    </div>
  );
}

export default App;
import React, { useState, useRef, useEffect } from 'react';
import tracker from '../utils/monetization';
import './ChatBot.css';

const ChatBot = ({ onInteraction }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m the Excel Chatbot AI. I can help you with:\n• Excel formulas and functions\n• Data organization\n• Calculations\n• File generation'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();

    if (lowerMsg.includes('formula') || lowerMsg.includes('sum') || lowerMsg.includes('average')) {
      return `I can help with Excel formulas! For example:\n• =SUM(A1:A10) - Add a range\n• =AVERAGE(B1:B10) - Calculate average\n• =IF(A1>0, "Yes", "No") - Conditional formula\n\nWhat specific formula do you need?`;
    }
    if (lowerMsg.includes('data') || lowerMsg.includes('organize')) {
      return `Here are tips for organizing data:\n• Use headers in the first row\n• Keep data consistent (same format)\n• Remove duplicates\n• Sort logically\n• Use data validation rules\n\nWould you like help with a specific format?`;
    }
    if (lowerMsg.includes('chart') || lowerMsg.includes('graph')) {
      return `Excel charts help visualize data! Popular types:\n• Column/Bar charts - Compare values\n• Pie charts - Show proportions\n• Line charts - Show trends\n• Scatter plots - Show relationships\n\nReady to create a chart?`;
    }
    if (lowerMsg.includes('generate') || lowerMsg.includes('create')) {
      return `I can generate Excel files for you! You can:\n• Upload images to convert to spreadsheets\n• Input data directly\n• Use templates\n• Apply formatting automatically\n\nWhich method would you prefer?`;
    }

    return `That's a great question! I'm learning. In the meantime, I can help with:\n• =SUM(), =AVERAGE(), =COUNT() formulas\n• Data formatting and organization\n• Creating charts and pivot tables\n• Generating Excel files\n\nTry asking about any of these!`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { type: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    tracker.trackChatInteraction(userMsg, '');
    onInteraction?.();

    setTimeout(() => {
      const botResponse = generateResponse(userMsg);
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message message-${msg.type}`}>
            <div className="message-content">
              {msg.type === 'bot' && <span className="bot-icon">🤖</span>}
              {msg.type === 'user' && <span className="user-icon">👤</span>}
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="message message-bot">
            <div className="message-content">
              <span className="bot-icon">🤖</span>
              <p className="typing">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about Excel formulas, data organization, charts..."
          className="chat-input"
          disabled={loading}
        />
        <button type="submit" className="send-btn" disabled={loading}>
          📤 Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
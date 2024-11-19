import React, { useState, useEffect } from 'react';

function SlackFeed() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://ai-intel-backend.onrender.com/api/slack')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch Slack messages');
        return response.json();
      })
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Slack messages:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Slack messages...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="articles-grid">
      {messages.map((message, index) => (
        <article key={index} className="article-card">
          <p className="slack-message">{message.text}</p>
          <div className="analysis">
            <h3>AI Summary</h3>
            <p>{message.analysis.summary}</p>
          </div>
          <div className="meta">
            <span>{new Date(message.timestamp).toLocaleDateString()}</span>
            <span>Slack</span>
          </div>
          <a href={message.link} target="_blank" rel="noopener noreferrer">
            View in Slack →
          </a>
        </article>
      ))}
    </div>
  );
}

export default SlackFeed;
import React, { useState, useEffect } from 'react';

function SlackFeed() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://ai-intel-backend-dpvm.onrender.com';

    fetch(`${API_URL}/api/slack`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch Slack messages');
        return response.json();
      })
      .then(data => {
        console.log('Slack data:', data);  // Debug log
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
          <p>{message.text}</p>
          <div className="meta">
            <span>{new Date(message.timestamp).toLocaleDateString()}</span>
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
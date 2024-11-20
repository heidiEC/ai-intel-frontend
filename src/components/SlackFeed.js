import React, { useState, useEffect } from 'react';
import './SlackFeed.css';

function SlackFeed() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : process.env.REACT_APP_API_URL;

    fetch(`${API_URL}/api/slack`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch Slack messages');
        return response.json();
      })
      .then(data => {
        console.log('Slack data:', data);
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
          <h2>{message.title}</h2>
          {message.summary && <p>{message.summary}</p>}
          <div className="meta">
            <span>{new Date(message.timestamp).toLocaleDateString()}</span>
            {message.type && <span className="type-badge">{message.type}</span>}
          </div>
          <div className="links">
            <a href={message.url} target="_blank" rel="noopener noreferrer">
              View Source →
            </a>
            <a href={message.slackLink} target="_blank" rel="noopener noreferrer">
              View in Slack →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default SlackFeed;
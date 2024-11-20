import React, { useState, useEffect } from 'react';
import './ArticleFeed.css';

function ArticleFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_URL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : process.env.REACT_APP_API_URL;

    fetch(`${API_URL}/api/articles`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch articles');
        return response.json();
      })
      .then(data => {
        console.log('Articles data:', data);
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="articles-grid">
      {articles.map((article, index) => (
        <article key={index} className="article-card">
          <h2>{article.title}</h2>
          {article.summary && <p>{article.summary}</p>}
          <div className="meta">
            <span>{new Date(article.pubDate).toLocaleDateString()}</span>
            <span>{article.source}</span>
          </div>
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            Read more →
          </a>
        </article>
      ))}
    </div>
  );
}

export default ArticleFeed;
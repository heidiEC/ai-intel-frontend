import React, { useState } from 'react';
import ArticleFeed from './components/ArticleFeed';
import SlackFeed from './components/SlackFeed';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Intel</h1>
        <div className="feed-toggle">
          <button 
            className={activeTab === 'articles' ? 'active' : ''}
            onClick={() => setActiveTab('articles')}
          >
            AI Intel Feed
          </button>
          <button 
            className={activeTab === 'slack' ? 'active' : ''}
            onClick={() => setActiveTab('slack')}
          >
            Slack Feed
          </button>
        </div>
      </header>
      <main>
        {activeTab === 'articles' ? <ArticleFeed /> : <SlackFeed />}
      </main>
    </div>
  );
}

export default App;

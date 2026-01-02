'use client';

import { useState } from 'react';

export default function Landing() {
  const [topic, setTopic] = useState('');
  const [tweet, setTweet] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTweet = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    setTweet('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim() })
      });
      
      const data = await response.json() as { tweet?: string };
      setTweet(data.tweet || 'Failed to generate tweet');
    } catch {
      setTweet('Error generating tweet');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateTweet();
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-black text-white flex items-center justify-center px-4">
      <main className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            EILIX
          </h1>
          <p className="text-xl text-white/60">
            Explain anything like a viral tweet
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter any topic..."
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-lg focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
            disabled={loading}
          />
          
          <button
            onClick={generateTweet}
            disabled={loading || !topic.trim()}
            className="w-full px-6 py-4 bg-white text-black rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Tweet'}
          </button>
        </div>

        {tweet && (
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
            <p className="text-lg leading-relaxed">{tweet}</p>
            <div className="flex items-center justify-between text-sm text-white/40">
              <span>{tweet.length} characters</span>
              <button
                onClick={() => navigator.clipboard.writeText(tweet)}
                className="hover:text-white/80 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}




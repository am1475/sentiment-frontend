import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SentimentAnalysis = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('https://sentiment-backend-knfp.onrender.com/analyze', { text });
      const sentimentData = response.data;

      setResult(sentimentData);

      navigate('/dashboard', {
        state: {
          sentimentData,
          examples: [{ text, sentiment: sentimentData }]
        }
      });
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div className="sentiment-analysis">
      <h2>Sentiment Analysis</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your feedback here"
      />
      <button onClick={handleAnalyze}>Analyze Sentiment</button>
      {result && (
        <div>
          <p>Positive: {result.positive}</p>
          <p>Neutral: {result.neutral}</p>
          <p>Negative: {result.negative}</p>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalysis;

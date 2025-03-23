import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SentimentAnalysis = () => {
  const [productName, setProductName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(''); // New rating state
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    try {
      const response = await axios.post('https://sentiment-backend-2.onrender.com/analyze', { 
        productName, 
        feedback,
        rating // sending rating along with the payload
      });
      const sentimentData = response.data;

      setResult(sentimentData);

      navigate('/dashboard', {
        state: {
          sentimentData,
          examples: [{ productName, text: feedback, sentiment: sentimentData, rating }]
        }
      });
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <>
      <style>{`
        .sentiment-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: #f2f2f2;
        }
        .sentiment-analysis {
          max-width: 800px;
          width: 90%;
          padding: 20px;
          font-family: 'Arial', sans-serif;
          background-color: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .sentiment-analysis h2 {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }
        .sentiment-input,
        .sentiment-textarea {
          width: 100%;
          font-size: 1.2rem;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 20px;
          resize: vertical;
        }
        .analyze-button {
          font-size: 1.2rem;
          padding: 12px 24px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          display: block;
          margin: 0 auto;
        }
        .analyze-button:hover {
          background-color: #0056b3;
        }
        .result-container {
          margin-top: 20px;
          font-size: 1.5rem;
          text-align: center;
          color: #444;
        }
      `}</style>
      <div className="sentiment-wrapper">
        <div className="sentiment-analysis">
          <h2>Product Feedback Analysis</h2>
          <input
            type="text"
            className="sentiment-input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
          />
          <textarea
            className="sentiment-textarea"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your product feedback here"
          />
          <input
            type="text"
            className="sentiment-input"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter product rating"
          />
          <button className="analyze-button" onClick={handleAnalyze}>
            Analyze Sentiment
          </button>
          {result && (
            <div className="result-container">
              <p>Positive: {result.positive}</p>
              <p>Neutral: {result.neutral}</p>
              <p>Negative: {result.negative}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SentimentAnalysis;

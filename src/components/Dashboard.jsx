import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

// ReportSuggestion component styled to look like a printed PDF page
const ReportSuggestion = ({ suggestionText, radarData, productNames, radarColors }) => {
  return (
    <div id="suggestion-box" className="pdf-report">
      <div className="pdf-header">
        <h2>Business Report</h2>
        <p className="pdf-date">{new Date().toLocaleDateString()}</p>
      </div>
      <div className="pdf-content">
        <ReactMarkdown>{suggestionText}</ReactMarkdown>
        <div className="radar-chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis domain={[0, 5]} />
              {productNames.map((product, index) => (
                <Radar
                  key={product}
                  name={product}
                  dataKey={product}
                  stroke={radarColors[index % radarColors.length]}
                  fill={radarColors[index % radarColors.length]}
                  fillOpacity={0.6}
                />
              ))}
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="pdf-footer">
        <p>Page 1</p>
      </div>
      <style jsx>{`
        .pdf-report {
          width: 210mm;
          max-width: 95%;
          min-height: 297mm;
          margin: 20px auto;
          padding: 40px;
          background: #ffffff;
          border: 3px groove #aaa;
          box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
          font-family: 'Times New Roman', Times, serif;
          color: #000;
          position: relative;
          font-size: 18px;
        }
        .pdf-header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 10px;
        }
        .pdf-header h2 {
          margin: 0;
          font-size: 28px;
        }
        .pdf-date {
          font-size: 16px;
          color: #555;
        }
        .pdf-content {
          margin-top: 20px;
        }
        .pdf-content p {
          font-size: 18px;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .radar-chart-container {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
        }
        .pdf-footer {
          text-align: center;
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          font-size: 14px;
          color: #555;
        }
        @media (max-width: 600px) {
          .pdf-report {
            padding: 20px;
            font-size: 16px;
          }
          .pdf-header h2 {
            font-size: 22px;
          }
          .pdf-content p {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  // Check if current feedback sentiment data was passed via location.state.
  const { sentimentData } = location.state || {};
  // If sentimentData exists, it might contain a sentimentScores field.
  const dataForAnalysis = sentimentData ? (sentimentData.sentimentScores || sentimentData) : null;

  const [storedData, setStoredData] = useState([]);
  const [report, setReport] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const response = await axios.get('https://sentiment-backend-2.onrender.com/products');
        console.log("Fetched stored data:", response.data);
        setStoredData(response.data);
      } catch (error) {
        console.error('Error fetching stored data:', error);
      }
    };
    fetchStoredData();
  }, []);

  // Helper function to compute sentiment percentages using rating ranges.
  const computeSentiment = (data) => {
    let extremelyPositive = 0,
      positive = 0,
      neutral = 0,
      negative = 0,
      extremelyNegative = 0;
    data.forEach(entry => {
      const rating = Number(entry.rating);
      if (rating >= 4.5) extremelyPositive++;
      else if (rating >= 3.5) positive++;
      else if (rating >= 2.5) neutral++;
      else if (rating >= 1.5) negative++;
      else extremelyNegative++;
    });
    const total = extremelyPositive + positive + neutral + negative + extremelyNegative;
    return total > 0
      ? {
          extremelyPositive: (extremelyPositive / total) * 100,
          positive: (positive / total) * 100,
          neutral: (neutral / total) * 100,
          negative: (negative / total) * 100,
          extremelyNegative: (extremelyNegative / total) * 100,
        }
      : { extremelyPositive: 0, positive: 0, neutral: 0, negative: 0, extremelyNegative: 0 };
  };

  // Compute overall sentiment from stored feedback data (historical)
  const overallSentiment = computeSentiment(storedData);

  // Determine which sentiment data to use for the graphs:
  // - If current feedback (dataForAnalysis) is available, use that.
  // - Otherwise, use the overall sentiment computed from historical data.
  const currentSentimentAvailable = dataForAnalysis !== null;

  const analysisChartData = currentSentimentAvailable
    ? [
        { name: 'Positive', value: dataForAnalysis.positive },
        { name: 'Neutral', value: dataForAnalysis.neutral },
        { name: 'Negative', value: dataForAnalysis.negative },
      ]
    : [
        { name: 'Positive', value: overallSentiment.positive },
        { name: 'Neutral', value: overallSentiment.neutral },
        { name: 'Negative', value: overallSentiment.negative },
      ];

  // For the line chart, show a detailed breakdown when historical data is used.
  // If current sentiment is available, show a simplified chart.
  const lineChartData = currentSentimentAvailable
    ? [
        { sentiment: 'Positive', value: dataForAnalysis.positive },
        { sentiment: 'Neutral', value: dataForAnalysis.neutral },
        { sentiment: 'Negative', value: dataForAnalysis.negative },
      ]
    : [
        { sentiment: 'Extremely Positive', value: overallSentiment.extremelyPositive },
        { sentiment: 'Positive', value: overallSentiment.positive },
        { sentiment: 'Neutral', value: overallSentiment.neutral },
        { sentiment: 'Negative', value: overallSentiment.negative },
        { sentiment: 'Extremely Negative', value: overallSentiment.extremelyNegative },
      ];

  // Compute product ratings for radar chart and commodity analysis.
  const productRatings = storedData.reduce((acc, cur) => {
    const product = cur.name;
    const rating = Number(cur.rating);
    if (!isNaN(rating)) {
      if (!acc[product]) {
        acc[product] = { sum: 0, count: 0 };
      }
      acc[product].sum += rating;
      acc[product].count += 1;
    }
    return acc;
  }, {});

  const commodityRatingData = Object.entries(productRatings).map(
    ([product, { sum, count }]) => ({
      product,
      avgRating: sum / count,
    })
  );
  const percentageAreaData = commodityRatingData.map(item => ({
    product: item.product,
    percentage: (item.avgRating / 5) * 100,
  }));

  const productReviewCounts = storedData.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});
  const productChartData = Object.keys(productReviewCounts).map((productName) => ({
    product: productName,
    reviews: productReviewCounts[productName],
  }));

  const productNames = Object.keys(productRatings);
  const maxReviewCount = Math.max(...Object.values(productReviewCounts), 1);
  const radarData = [
    { metric: 'Avg Rating' },
    { metric: 'Normalized Reviews' },
    { metric: 'Overall Score' },
  ];
  productNames.forEach(product => {
    const avg = productRatings[product].sum / productRatings[product].count;
    const normalized = (productReviewCounts[product] / maxReviewCount) * 5;
    const overall = (avg + normalized) / 2;
    radarData[0][product] = avg;
    radarData[1][product] = normalized;
    radarData[2][product] = overall;
  });
  const radarColors = ['#FF5722', '#4CAF50', '#1976d2', '#FFC107', '#F44336'];

  // Group storedData by product so that each product appears once in the feedback table.
  const groupedFeedback = storedData.reduce((acc, cur) => {
    if (!acc[cur.name]) {
      acc[cur.name] = {
        name: cur.name,
        totalRating: Number(cur.rating),
        count: 1,
        feedbacks: [cur.feedback],
      };
    } else {
      acc[cur.name].totalRating += Number(cur.rating);
      acc[cur.name].count += 1;
      acc[cur.name].feedbacks.push(cur.feedback);
    }
    return acc;
  }, {});
  // Remove duplicate feedbacks for each product.
  const uniqueFeedback = Object.values(groupedFeedback).map(item => ({
    ...item,
    feedbacks: Array.from(new Set(item.feedbacks))
  }));

  const handleGenerateReport = async () => {
    if (storedData.length === 0) {
      setReport({ suggestion: 'No feedback available to generate a report.' });
      return;
    }
    const lowRatedProducts = Object.entries(productRatings)
      .map(([product, { sum, count }]) => ({ product, avg: sum / count }))
      .filter(item => item.avg < 3);
    let prompt = '';
    if (lowRatedProducts.length > 0) {
      prompt = `
**Low-Rated Products Analysis:**
${lowRatedProducts.map(item => `**${item.product}:** Average Rating ${item.avg.toFixed(1)}`).join('\n')}

**Instructions:**
Provide a detailed business analysis that includes:
- Possible reasons for these low ratings.
- At least three actionable recommendations for each product, formatted as bullet points.
`;
    } else {
      prompt = `
All products have average ratings of 3 stars or above.
Provide detailed suggestions on how to maintain or further improve customer satisfaction.
Include at least three actionable recommendations formatted as bullet points.
`;
    }
    try {
      const response = await axios.post('https://sentiment-backend-2.onrender.com/gemini', { prompt });
      setReport({ suggestion: response.data.suggestion });
    } catch (error) {
      console.error("Error generating suggestion from Gemini:", error);
      setReport({ suggestion: "Failed to generate suggestions. Please try again later." });
    }
  };

  const printSuggestion = () => {
    const printContents = document.getElementById('suggestion-box').innerHTML;
    const newWindow = window.open('', '', 'height=800,width=600');
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Report</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; margin: 20px; background: #0d1b2a; }
            .pdf-report { width: 100%; background: #fff; color: #000; }
            .pdf-header, .pdf-footer { text-align: center; }
            .pdf-header h2 { margin: 0; font-size: 28px; }
            .pdf-date { font-size: 16px; color: #555; }
            .pdf-content { margin-top: 20px; }
            .pdf-content p { font-size: 18px; line-height: 1.5; margin-bottom: 16px; }
            .radar-chart-container { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    newWindow.document.close();
    newWindow.addEventListener('afterprint', () => {
      newWindow.close();
    });
    newWindow.focus();
    newWindow.print();
  };

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: '#0d1b2a' }}>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">Business Dashboard</h2>

        {/* Global Sentiment Analysis Graphs */}
        <div className="flex flex-col lg:flex-row lg:justify-around gap-6 mb-6">
          <div className="w-full lg:w-5/12 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Sentiment Bar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analysisChartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full lg:w-5/12 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Sentiment Line Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sentiment" />
                <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick.toFixed(0)}%`} />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#F44336" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Adjacent Charts on Larger Screens */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          {/* Overall / Product Sentiment Analysis Line Chart */}
          <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {selectedProduct ? `Sentiment Analysis for ${selectedProduct}` : 'Overall Sentiment Analysis'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sentiment" />
                <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick.toFixed(0)}%`} />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={3} name="Sentiment (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Commodity Average Rating Percentage Area Chart */}
          <div className="w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Avg Rating (%) by Product</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={percentageAreaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
                <Area type="monotone" dataKey="percentage" stroke="#1976d2" fill="#1976d2" name="Avg Rating (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Feedback Table (Grouped by Product with Unique Feedbacks) */}
        <div className="stored-data mb-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-white">Product Feedback</h3>
          {uniqueFeedback.length > 0 ? (
            <div className="overflow-auto max-h-80">
              <table className="w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border">Product</th>
                    <th className="py-2 px-4 border">Feedbacks</th>
                    <th className="py-2 px-4 border">Avg. Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueFeedback.map((item, index) => (
                    <tr
                      key={index}
                      className={`text-center border-b border-gray-300 cursor-pointer ${
                        selectedProduct === item.name ? 'bg-blue-100' : ''
                      }`}
                      onClick={() => setSelectedProduct(item.name)}
                    >
                      <td className="py-2 px-4 border">{item.name}</td>
                      <td className="py-2 px-4 border">{item.feedbacks.join(' | ')}</td>
                      <td className="py-2 px-4 border">{(item.totalRating / item.count).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {selectedProduct && (
                <p className="mt-2 text-center text-blue-600">
                  Showing sentiment analysis for <strong>{selectedProduct}</strong>
                </p>
              )}
            </div>
          ) : (
            <p className="text-lg text-center text-white">No product feedback stored yet.</p>
          )}
        </div>

        {/* Product Review Count Chart */}
        <div className="product-chart mb-6">
          <h3 className="text-2xl font-bold mb-4 text-center text-white">Product Review Counts</h3>
          {productChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productChartData} margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reviews" fill="#1976d2" name="Review Count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-lg text-center text-white">No review data to display.</p>
          )}
        </div>

        {/* Report Generation and Print Section */}
        <div className="report-section text-center mb-6">
          <button
            className="analyze-button mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleGenerateReport}
          >
            Generate Report
          </button>
          <button
            className="print-button ml-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={printSuggestion}
          >
            Print Report
          </button>
          {report && (
            <ReportSuggestion
              suggestionText={report.suggestion}
              radarData={radarData}
              productNames={productNames}
              radarColors={radarColors}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

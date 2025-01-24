import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const location = useLocation();
  const { sentimentData = { positive: 0, neutral: 0, negative: 0 }, examples = [] } = location.state || {};

  useEffect(() => {
    console.log('Sentiment Data:', sentimentData);
    console.log('Examples:', examples);
  }, [sentimentData, examples]);

  const totalSentiments = sentimentData.positive + sentimentData.neutral + sentimentData.negative;
  const positivePercentage = totalSentiments ? (sentimentData.positive / totalSentiments) * 100 : 0;
  const neutralPercentage = totalSentiments ? (sentimentData.neutral / totalSentiments) * 100 : 0;
  const negativePercentage = totalSentiments ? (sentimentData.negative / totalSentiments) * 100 : 0;

  const determineStarRating = () => {
    if (positivePercentage >= 80) {
      return 5;
    } else if (positivePercentage >= 60) {
      return 4;
    } else if (positivePercentage >= 40) {
      return 3;
    } else if (positivePercentage >= 20) {
      return 2;
    } else {
      return 1;
    }
  };

  const starRating = determineStarRating();

  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Analysis',
        data: [positivePercentage, neutralPercentage, negativePercentage],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      },
    ],
  };

  const quotes = {
    5: "Excellent! Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
    4: "Very Good! Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
    3: "Good! Keep your spirits high.",
    2: "Fair! Keep pushing forward.",
    1: "Poor! Every adversity, every failure, every heartache carries with it the seed of an equal or greater benefit. - Napoleon Hill"
  };

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Sentiment Analysis Dashboard</h2>
      <p className="text-lg mb-6 text-center">An overview of sentiment analysis based on the provided text data.</p>
      <div className="flex flex-col lg:flex-row lg:justify-around mb-6">
        <div className="chart-container mb-6 w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-center">Histogram</h3>
          <div className="relative h-64"> {/* Set a fixed height for the chart */}
            <Bar data={chartData} options={{ maintainAspectRatio: false, plugins: { tooltip: { enabled: true } } }} />
          </div>
        </div>
        <div className="chart-container mb-6 w-full lg:w-1/2 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-center">Pie Chart</h3>
          <div className="relative h-64"> {/* Set a fixed height for the chart */}
            <Pie data={chartData} options={{ maintainAspectRatio: false, plugins: { tooltip: { enabled: true } } }} />
          </div>
        </div>
      </div>
      <div className="final-sentiment text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Customer Satisfaction Rating</h3>
        <p className="text-lg">{`${starRating} Star${starRating > 1 ? 's' : ''}`}</p>
      </div>
      <div className="quote text-center mt-6">
        <h3 className="text-xl font-bold mb-2">Quote of the Day</h3>
        <p className="text-lg italic">"{quotes[starRating]}"</p>
      </div>
      <div className="examples mb-6">
        <h3 className="text-2xl font-bold mb-4 text-center">Examples of Analyzed Text</h3>
        <div className="flex flex-col items-center">
          {examples.length > 0 ? (
            examples.map((example, index) => (
              <div key={index} className="mb-4 p-4 w-full lg:w-2/3 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-lg">{example.text}</p>
                <p className="text-sm text-gray-500">Sentiment: {JSON.stringify(example.sentiment)}</p>
              </div>
            ))
          ) : (
            <p className="text-lg">No examples to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

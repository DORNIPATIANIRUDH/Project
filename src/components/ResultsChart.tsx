import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { CategoryScore } from '../types';
import { categoryDescriptions } from '../data/questions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ResultsChartProps {
  categoryScores: CategoryScore[];
}

const ResultsChart: React.FC<ResultsChartProps> = ({ categoryScores }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const sortedScores = [...categoryScores].sort((a, b) => {
      const percentA = (a.score / a.maxScore) * 100;
      const percentB = (b.score / b.maxScore) * 100;
      return percentB - percentA;
    });

    const labels = sortedScores.map(
      (score) => score.category.charAt(0).toUpperCase() + score.category.slice(1)
    );
    
    const percentages = sortedScores.map(
      (score) => (score.score / score.maxScore) * 100
    );

    const backgroundColors = percentages.map(percentage => {
      if (percentage >= 80) return 'rgba(34, 197, 94, 0.6)';
      if (percentage >= 60) return 'rgba(59, 130, 246, 0.6)';
      if (percentage >= 40) return 'rgba(234, 179, 8, 0.6)';
      return 'rgba(239, 68, 68, 0.6)';
    });

    const borderColors = percentages.map(percentage => {
      if (percentage >= 80) return 'rgb(22, 163, 74)';
      if (percentage >= 60) return 'rgb(37, 99, 235)';
      if (percentage >= 40) return 'rgb(202, 138, 4)';
      return 'rgb(220, 38, 38)';
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Category Score (%)',
          data: percentages,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    });
  }, [categoryScores]);

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.parsed.x.toFixed(1)}%`;
          },
          title: function(context: any) {
            const categoryKey = context[0].label.toLowerCase();
            return categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
          },
          afterTitle: function(context: any) {
            const categoryKey = context[0].label.toLowerCase() as keyof typeof categoryDescriptions;
            return categoryDescriptions[categoryKey] || '';
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Score (%)',
        },
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData as any} options={options} />
    </div>
  );
};

export default ResultsChart;
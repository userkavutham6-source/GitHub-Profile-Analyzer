import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageChart = ({ data }) => {
  if (!data || !data.labels || data.labels.length === 0) return null;

  // Modern preset colors
  const backgroundColors = [
    '#4318ff', // accent
    '#05cd99', // success
    '#ffce20', // warning
    '#ee5d50', // danger
    '#8f75ff'  // accent light
  ];

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: backgroundColors.slice(0, data.labels.length),
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'var(--text-secondary)',
          font: {
            family: "'Inter', sans-serif",
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'var(--bg-card)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--border-color)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Inter', sans-serif"
        }
      }
    },
    cutout: '70%'
  };

  return (
    <div className="card animate-fade-in" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Language Distribution</h3>
      <div style={{ flex: 1, position: 'relative' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LanguageChart;

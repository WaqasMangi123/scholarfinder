import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import './realtimedata.css';

// Registering the required components of Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale);

function GraphicalRepresentation() {
    const [formData, setFormData] = useState({
        users: 0,
        feedbackReceived: 0,
        positiveFeedback: 0,
        engagements: 0,
        recommendations: 0,
    });

    const [chartData, setChartData] = useState({
        users: 0,
        feedbackReceived: 0,
        positiveFeedback: 0,
        engagements: 0,
        recommendations: 0,
        successRate: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: parseInt(value) || 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate success rate
        const totalEngagement = formData.positiveFeedback + formData.engagements;
        const totalBasis = formData.feedbackReceived + formData.recommendations;
        const successRate = totalBasis > 0 ? ((totalEngagement / totalBasis) * 100).toFixed(2) : 0;

        setChartData({ ...formData, successRate });
    };

    // Bar Chart Data (Feedback and Engagement)
    const feedbackAndEngagementData = {
        labels: ['Feedback Received', 'Positive Feedback', 'Engagements', 'Recommendations', 'Success Rate'],
        datasets: [
            {
                label: 'Metrics',
                data: [
                    chartData.feedbackReceived,
                    chartData.positiveFeedback,
                    chartData.engagements,
                    chartData.recommendations,
                    chartData.successRate,
                ],
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8', '#dc3545'],
                borderColor: ['#0056b3', '#218838', '#e0a800', '#117a8b', '#c82333'],
                borderWidth: 1,
            },
        ],
    };

    const feedbackAndEngagementOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Feedback, Engagement, and Success Rate Metrics' },
        },
    };

    // Line Chart Data (Trend Analysis)
    const trendData = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
            {
                label: 'Success Rate Over Time (%)',
                data: [65, 70, 85, chartData.successRate || 90], // Mocked trend data with current success rate
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const trendOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Trend Analysis: Success Rate Over Time' },
        },
    };

    // Benchmark Comparison Data
    const benchmarkData = {
        labels: ['Current Success Rate', 'Benchmark (75%)'],
        datasets: [
            {
                label: 'Comparison',
                data: [chartData.successRate, 75],
                backgroundColor: ['#007bff', '#ffc107'],
                borderColor: ['#0056b3', '#e0a800'],
                borderWidth: 1,
            },
        ],
    };

    const benchmarkOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Success Rate vs Benchmark' },
        },
    };

    return (
        <div className="graphical-representation-page">
            <div className="graphical-container">
                <h1>Feedback, Engagement, and Success Metrics</h1>
                <p className="description">
                    Enter feedback and engagement details to dynamically generate graphs showing insights into user engagement and success rate.
                </p>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="data-entry-form">
                    <div className="form-group">
                        <label htmlFor="users">Number of Users</label>
                        <input
                            type="number"
                            id="users"
                            name="users"
                            value={formData.users}
                            onChange={handleChange}
                            placeholder="Enter number of users"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedbackReceived">Feedback Received</label>
                        <input
                            type="number"
                            id="feedbackReceived"
                            name="feedbackReceived"
                            value={formData.feedbackReceived}
                            onChange={handleChange}
                            placeholder="Enter total feedback received"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="positiveFeedback">Positive Feedback</label>
                        <input
                            type="number"
                            id="positiveFeedback"
                            name="positiveFeedback"
                            value={formData.positiveFeedback}
                            onChange={handleChange}
                            placeholder="Enter positive feedback count"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="engagements">Engagements</label>
                        <input
                            type="number"
                            id="engagements"
                            name="engagements"
                            value={formData.engagements}
                            onChange={handleChange}
                            placeholder="Enter number of engagements"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recommendations">Total Recommendations</label>
                        <input
                            type="number"
                            id="recommendations"
                            name="recommendations"
                            value={formData.recommendations}
                            onChange={handleChange}
                            placeholder="Enter total recommendations"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-submit">
                        Generate Graphs
                    </button>
                </form>

                {/* Feedback and Engagement Metrics */}
                <div className="graph-container">
                    <h2>Feedback, Engagement, and Success Rate Metrics</h2>
                    <Bar data={feedbackAndEngagementData} options={feedbackAndEngagementOptions} />
                </div>

                {/* Trend Analysis */}
                <div className="graph-container">
                    <h2>Trend Analysis</h2>
                    <Line data={trendData} options={trendOptions} />
                </div>

                {/* Benchmark Comparison */}
                <div className="graph-container">
                    <h2>Benchmark Comparison</h2>
                    <Bar data={benchmarkData} options={benchmarkOptions} />
                </div>

                {/* Success Rate Display */}
                <div className="statistics-info">
                    <p><strong>Success Rate:</strong> {chartData.successRate}%</p>
                </div>
            </div>
        </div>
    );
}

export default GraphicalRepresentation;

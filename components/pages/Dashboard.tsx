
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '../common/Card';
import { getDashboardStats } from '../../services/geminiService';
import type { DashboardStats } from '../../types';

const StatCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
    <Card className="text-center">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
    </Card>
);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            const dashboardStats = await getDashboardStats();
            setStats(dashboardStats);
        };
        fetchStats();
    }, []);

    if (!stats) {
        return <div className="text-center p-8">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Profile Views" value={stats.profileViews} />
                <StatCard title="Likes Received" value={stats.likesReceived} />
                <StatCard title="Engagement" value={`${stats.engagementRate}%`} />
                <StatCard title="Followers" value={stats.followers} />
            </div>

            <Card>
                <h3 className="text-xl font-bold mb-4">Weekly Activity</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.activity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-4">Performance Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stats.performance}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default Dashboard;

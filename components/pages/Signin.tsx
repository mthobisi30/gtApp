import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import Icon from '../common/Icon';

const Signin: React.FC = () => {
    const { login, setAuthPage, setToast } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setToast({ message: 'Please fill in all fields.', type: 'error' });
            return;
        }
        setLoading(true);
        await login(email, password);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col items-center mb-6 text-center">
                <div className="bg-red-600 dark:bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon name="qr" className="w-8 h-8 text-white"/>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back!</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Sign in to continue to GetApp.</p>
            </div>
            <Card>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="••••••••"
                        />
                    </div>
                    <Button type="submit" className="w-full !py-2.5" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <button onClick={() => setAuthPage('signup')} className="font-medium text-red-600 hover:underline">
                        Sign Up
                    </button>
                </p>
            </Card>
        </div>
    );
};

export default Signin;
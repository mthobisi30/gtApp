import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import { UserRole } from '../../types';
import Icon from '../common/Icon';

const Signup: React.FC = () => {
    const { signup, setAuthPage, setToast } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('client');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setToast({ message: 'Please fill in all fields.', type: 'error' });
            return;
        }
        setLoading(true);
        await signup(name, email, password, role);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-sm">
            <div className="flex flex-col items-center mb-6 text-center">
                <div className="bg-red-600 dark:bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon name="qr" className="w-8 h-8 text-white"/>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome to GetApp</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Create an account to get started.</p>
            </div>
            <Card>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                            placeholder="Jane Doe"
                        />
                    </div>
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a...</label>
                        <div className="flex gap-4">
                            <label className="flex items-center p-3 border rounded-md cursor-pointer flex-1 justify-center"
                                style={{ borderColor: role === 'client' ? 'rgb(220 38 38)' : '#D1D5DB', backgroundColor: role === 'client' ? 'rgba(220, 38, 38, 0.1)' : 'transparent' }}
                            >
                                <input type="radio" name="role" value="client" checked={role === 'client'} onChange={() => setRole('client')} className="hidden" />
                                <span>Client</span>
                            </label>
                            <label className="flex items-center p-3 border rounded-md cursor-pointer flex-1 justify-center"
                                style={{ borderColor: role === 'provider' ? 'rgb(220 38 38)' : '#D1D5DB', backgroundColor: role === 'provider' ? 'rgba(220, 38, 38, 0.1)' : 'transparent' }}
                            >
                                <input type="radio" name="role" value="provider" checked={role === 'provider'} onChange={() => setRole('provider')} className="hidden" />
                                <span>Provider</span>
                            </label>
                        </div>
                    </div>

                    <Button type="submit" className="w-full !py-2.5" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <button onClick={() => setAuthPage('signin')} className="font-medium text-red-600 hover:underline">
                        Sign In
                    </button>
                </p>
            </Card>
        </div>
    );
};

export default Signup;
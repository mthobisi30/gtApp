import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import type { Transaction, TransactionStatus } from '../../types';
import { useAppContext } from '../../context/AppContext';
import Button from '../common/Button';
import Icon from '../common/Icon';
import JobModal from '../modals/JobModal';
import JobQrModal from '../modals/JobQrModal';
import Modal from '../common/Modal';

const DeliveryRequestModal: React.FC<{ jobId: string }> = ({ jobId }) => {
    const { openModal, requestDelivery, setToast } = useAppContext();
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!address.trim() || !phoneNumber.trim()) {
            setToast({ message: 'Please fill in all fields.', type: 'error' });
            return;
        }
        setLoading(true);
        await requestDelivery(jobId, address, phoneNumber);
        setLoading(false);
    };

    return (
        <Modal onClose={() => openModal(null)} title="Request Delivery">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="123 Main St, Anytown, USA 12345"
                        rows={3}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="(555) 123-4567"
                        required
                    />
                </div>
                <Button type="submit" className="w-full !py-2.5" disabled={loading}>
                    {loading ? 'Submitting...' : 'Confirm Delivery Request'}
                </Button>
            </form>
        </Modal>
    );
};


const StatusIndicator: React.FC<{ status: TransactionStatus }> = ({ status }) => {
    const statusClasses: { [key in TransactionStatus]: string } = {
        'In Progress': 'bg-yellow-500',
        'Ready for Pickup': 'bg-green-500',
        'Completed': 'bg-blue-500',
    };
    return (
        <div className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${statusClasses[status]}`}></span>
            <span className="text-sm font-semibold">{status}</span>
        </div>
    );
};

const CountdownTimer: React.FC<{ readyTimestamp: string; deadlineHours: number }> = ({ readyTimestamp, deadlineHours }) => {
    const calculateTimeLeft = () => {
        const deadline = new Date(readyTimestamp).getTime() + deadlineHours * 60 * 60 * 1000;
        const now = new Date().getTime();
        const difference = deadline - now;

        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return { timeLeft, hasExpired: difference <= 0 };
    };

    const [{ timeLeft, hasExpired }, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (hasExpired) {
        return <span className="text-sm font-bold text-red-500">Pickup deadline passed</span>;
    }
    
    const { days, hours, minutes, seconds } = timeLeft;
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0 || days > 0) parts.push(`${String(hours).padStart(2, '0')}h`);
    parts.push(`${String(minutes).padStart(2, '0')}m`);
    parts.push(`${String(seconds).padStart(2, '0')}s`);

    return (
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {parts.join(' ')} left for pickup
        </span>
    );
};


const TransactionRow: React.FC<{ tx: Transaction }> = ({ tx }) => {
    const { currentUser, openModal } = useAppContext();

    const isProviderView = currentUser?.activeRole === 'provider';
    const isClientView = currentUser?.activeRole === 'client';
    const isReadyForPickup = tx.status === 'Ready for Pickup';
    const hasCountdown = isReadyForPickup && tx.readyTimestamp && typeof tx.pickupDeadline !== 'undefined';
    
    const otherParty = isProviderView ? tx.client : tx.provider;
    const showQrButton = isProviderView && isReadyForPickup;

    return (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-gray-800 dark:text-gray-100">{tx.serviceName}</p>
                <div className="flex items-center space-x-2">
                    <StatusIndicator status={tx.status} />
                    {showQrButton && (
                        <button onClick={() => openModal(<JobQrModal job={tx} />)} className="text-gray-400 hover:text-red-500" aria-label="Show QR Code">
                           <Icon name="qr" className="w-5 h-5"/>
                       </button>
                    )}
                    {isProviderView && (
                        <button onClick={() => openModal(<JobModal jobToEdit={tx} />)} className="text-gray-400 hover:text-red-500" aria-label="Edit Job">
                            <Icon name="pencil" className="w-5 h-5"/>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{isProviderView ? 'Client' : 'Provider'}: {otherParty.name}</span>
                <span>{tx.date}</span>
            </div>

            {hasCountdown && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    {/* Left side: Countdown or Delivery Info */}
                    <div>
                        {isClientView && tx.deliveryRequested && tx.estimatedDeliveryTime ? (
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                Est. Delivery: {tx.estimatedDeliveryTime}
                            </p>
                        ) : (
                            <CountdownTimer readyTimestamp={tx.readyTimestamp!} deadlineHours={tx.pickupDeadline!} />
                        )}
                    </div>
                    
                    {/* Right side: Client Actions */}
                    {isClientView && isReadyForPickup && (
                        <div className="flex-shrink-0">
                            {tx.deliveryRequested ? (
                                <p className="text-sm font-semibold text-green-600 text-right">Delivery Confirmed</p>
                            ) : (
                                <Button onClick={() => openModal(<DeliveryRequestModal jobId={tx.id} />)} className="w-full sm:w-auto !py-1.5 !text-sm">
                                    Request Delivery
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


const Transactions: React.FC = () => {
    const { transactions, loading, currentUser, openModal } = useAppContext();
    const isProvider = currentUser?.activeRole === 'provider';

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="!p-0">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold">{isProvider ? 'My Services' : 'My Jobs'}</h2>
                    {isProvider && (
                        <Button onClick={() => openModal(<JobModal />)}>
                            <Icon name="plus" className="w-5 h-5 mr-2" />
                            Add Job
                        </Button>
                    )}
                </div>

                {loading ? (
                    <div className="text-center p-8 text-gray-500 dark:text-gray-400">Loading jobs...</div>
                ) : (
                    <div>
                        {transactions.map(tx => <TransactionRow key={tx.id} tx={tx} />)}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Transactions;
import React from 'react';
import Card from '../common/Card';
import type { Transaction, TransactionStatus } from '../../types';
import { useAppContext } from '../../context/AppContext';
import Button from '../common/Button';
import Icon from '../common/Icon';
import JobModal from '../modals/JobModal';
import JobQrModal from '../modals/JobQrModal';

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


const TransactionRow: React.FC<{ tx: Transaction }> = ({ tx }) => {
    const { currentUser, openModal } = useAppContext();
    const otherParty = currentUser?.role === 'provider' ? tx.client : tx.provider;
    const showQrButton = currentUser?.role === 'provider' && tx.status === 'Ready for Pickup';

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
                    {currentUser?.role === 'provider' && (
                        <button onClick={() => openModal(<JobModal jobToEdit={tx} />)} className="text-gray-400 hover:text-red-500" aria-label="Edit Job">
                            <Icon name="pencil" className="w-5 h-5"/>
                        </button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{currentUser?.role === 'provider' ? 'Client' : 'Provider'}: {otherParty.name}</span>
                <span>{tx.date}</span>
            </div>
        </div>
    );
};


const Transactions: React.FC = () => {
    const { transactions, loading, currentUser, openModal } = useAppContext();

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="!p-0">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold">My Jobs</h2>
                    {currentUser?.role === 'provider' && (
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
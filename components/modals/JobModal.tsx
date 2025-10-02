import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import { Transaction, TransactionStatus, User } from '../../types';

interface JobModalProps {
    jobToEdit?: Transaction;
}

const JobModal: React.FC<JobModalProps> = ({ jobToEdit }) => {
    const { openModal, addJob, updateJob } = useAppContext();
    const [serviceName, setServiceName] = useState(jobToEdit?.serviceName || '');
    const [client, setClient] = useState<User | undefined>(jobToEdit?.client); // In a real app, this would be a user selector
    const [status, setStatus] = useState<TransactionStatus>(jobToEdit?.status || 'In Progress');
    const [loading, setLoading] = useState(false);
    
    // Mocking client selection
    const mockClient: User = { id: '1', name: 'Jane Doe', email: 'client@test.com', avatarUrl: 'https://picsum.photos/seed/jane/100/100', handle: 'janedoe', role: 'client', reputation: 85 };
    if (!client) setClient(mockClient);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!client) return; // Should not happen with mock
        setLoading(true);
        const jobData = { serviceName, date: new Date().toLocaleDateString('en-CA'), status };
        if (jobToEdit) {
            await updateJob(jobToEdit.id, jobData);
        } else {
            await addJob({ ...jobData, client });
        }
        setLoading(false);
    };

    return (
        <Modal onClose={() => openModal(null)} title={jobToEdit ? 'Edit Job' : 'Create New Job'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Name</label>
                    <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="e.g., PC Repair"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client</label>
                    <div className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                        {client?.name || 'Select a client...'}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                     <select 
                        value={status}
                        onChange={(e) => setStatus(e.target.value as TransactionStatus)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                         <option>In Progress</option>
                         <option>Ready for Pickup</option>
                         <option>Completed</option>
                    </select>
                </div>
                

                <Button type="submit" className="w-full !py-2.5" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Job'}
                </Button>
            </form>
        </Modal>
    );
};

export default JobModal;

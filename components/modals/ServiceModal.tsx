import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import { ServicePost } from '../../types';

interface ServiceModalProps {
    serviceToEdit?: ServicePost;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ serviceToEdit }) => {
    const { openModal, addService, updateService } = useAppContext();
    const [serviceName, setServiceName] = useState(serviceToEdit?.serviceName || '');
    const [description, setDescription] = useState(serviceToEdit?.description || '');
    const [imageUrl, setImageUrl] = useState(serviceToEdit?.imageUrl || '');
    const [category, setCategory] = useState(serviceToEdit?.category || 'Home Services');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const serviceData = { serviceName, description, imageUrl, category };
        if (serviceToEdit) {
            await updateService(serviceToEdit.id, serviceData);
        } else {
            await addService(serviceData);
        }
        setLoading(false);
    };

    return (
        <Modal onClose={() => openModal(null)} title={serviceToEdit ? 'Edit Service' : 'Add New Service'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Name</label>
                    <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="e.g., Custom Bookshelf Crafting"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Describe your service..."
                        rows={3}
                        required
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="e.g., Home Services"
                        required
                    />
                </div>

                <Button type="submit" className="w-full !py-2.5" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Service'}
                </Button>
            </form>
        </Modal>
    );
};

export default ServiceModal;

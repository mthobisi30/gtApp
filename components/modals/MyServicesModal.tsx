import React from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../context/AppContext';
import Button from '../common/Button';
import Icon from '../common/Icon';
import QrModal from './QrModal';
import ServiceModal from './ServiceModal';

const MyServicesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { servicePosts, currentUser, openModal } = useAppContext();
    const myServices = servicePosts.filter(p => p.provider.id === currentUser?.id);

    return (
        <Modal onClose={onClose} title="My Services">
             <div className="space-y-3 max-h-80 overflow-y-auto">
                {myServices.map(service => (
                    <div key={service.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <p className="font-bold">{service.serviceName}</p>
                            <p className="text-sm text-gray-500">{service.category}</p>
                        </div>
                        <div className="flex space-x-2">
                            <Button onClick={() => openModal(<QrModal service={service} />)} className="!p-2 !bg-gray-200 !text-gray-800" aria-label="Generate QR Code">
                                <Icon name="qr" className="w-5 h-5" />
                            </Button>
                            <Button onClick={() => openModal(<ServiceModal serviceToEdit={service} />)} className="!p-2 !bg-gray-200 !text-gray-800" aria-label="Edit Service">
                                <Icon name="pencil" className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ))}
                 {myServices.length === 0 && <p className="text-center text-gray-500 py-4">You haven't added any services yet.</p>}
            </div>
             <Button onClick={() => openModal(<ServiceModal />)} className="w-full mt-4 flex items-center justify-center">
                <Icon name="plus" className="w-5 h-5 mr-2" />
                Add New Service
            </Button>
        </Modal>
    )
}

export default MyServicesModal;
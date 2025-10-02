import React from 'react';
import Modal from '../common/Modal';
import { ServicePost } from '../../types';
import { useAppContext } from '../../context/AppContext';
import QrCode from '../common/QrCode';

interface QrModalProps {
    service: ServicePost;
}

const QrModal: React.FC<QrModalProps> = ({ service }) => {
    const { openModal } = useAppContext();

    return (
        <Modal onClose={() => openModal(null)} title="Service QR Code">
            <div className="text-center">
                <p className="mb-4">Scan this code for service: <span className="font-bold">{service.serviceName}</span></p>
                <div className="flex justify-center items-center my-4">
                    <div className="p-4 bg-white rounded-lg inline-block">
                         <QrCode value={service.id} size={200} />
                    </div>
                </div>
                 <p className="text-sm text-gray-500">Service ID: {service.id}</p>
            </div>
        </Modal>
    );
};

export default QrModal;
import React from 'react';
import Modal from '../common/Modal';
import { Transaction } from '../../types';
import { useAppContext } from '../../context/AppContext';
import QrCode from '../common/QrCode';

interface JobQrModalProps {
    job: Transaction;
}

const JobQrModal: React.FC<JobQrModalProps> = ({ job }) => {
    const { openModal } = useAppContext();

    return (
        <Modal onClose={() => openModal(null)} title="Job QR Code">
            <div className="text-center">
                <p className="mb-1">Service: <span className="font-bold">{job.serviceName}</span></p>
                <p className="mb-4 text-sm text-gray-500">Client: {job.client.name}</p>
                <div className="flex justify-center items-center my-4">
                    <div className="p-4 bg-white rounded-lg inline-block">
                         <QrCode value={job.qrCodeId} size={200} />
                    </div>
                </div>
                 <p className="text-sm text-gray-500">Job ID: {job.id}</p>
            </div>
        </Modal>
    );
};

export default JobQrModal;

import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

interface ComingSoonModalProps {
    onClose: () => void;
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ onClose }) => {
    return (
        <Modal onClose={onClose} title="Under Construction">
            <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    This feature is currently under development and will be available soon. Thank you for your patience!
                </p>
                <Button onClick={onClose}>
                    Got it
                </Button>
            </div>
        </Modal>
    );
};

export default ComingSoonModal;
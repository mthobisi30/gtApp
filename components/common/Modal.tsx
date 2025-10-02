import React from 'react';
import Icon from './Icon';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, title }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button 
                        onClick={onClose} 
                        className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                        aria-label="Close modal"
                    >
                        <Icon name="x" className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;

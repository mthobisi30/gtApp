import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { ToastMessage } from '../../types';

const Toast: React.FC<ToastMessage> = ({ message, type }) => {
    const { setToast } = useAppContext();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => setToast(null), 300); // allow for fade out
        }, 3000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, type]);

    const baseClasses = "fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 z-50";
    const typeClasses = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-gray-700",
    };
    const visibilityClass = visible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4';

    return (
        <div className={`${baseClasses} ${typeClasses[type]} ${visibilityClass}`}>
            {message}
        </div>
    );
};

export default Toast;
import React from 'react';
import Icon from './common/Icon';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';

const Header: React.FC = () => {
    const { setCurrentPage, setToast } = useAppContext();
    return (
        <header className="fixed top-0 left-0 right-0 z-20 bg-white dark:bg-gray-900 shadow-md h-16 flex items-center justify-between px-4">
            <div className="flex items-center space-x-2">
                <div className="bg-red-600 dark:bg-red-500 w-8 h-8 rounded-md flex items-center justify-center">
                    <Icon name="qr" className="w-5 h-5 text-white"/>
                </div>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">GetApp</h1>
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={() => setCurrentPage(Page.Chat)} 
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Messages"
                >
                    <Icon name="message" className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
                 <button 
                    onClick={() => setToast({ message: 'No new notifications', type: 'info' })} 
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    aria-label="Notifications"
                >
                    <Icon name="bell" className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
            </div>
        </header>
    );
};

export default Header;
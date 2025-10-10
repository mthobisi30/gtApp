import React from 'react';
import Icon from './common/Icon';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import MyServicesModal from './modals/MyServicesModal';

interface NavItemProps {
    page: Page;
    iconName: string;
    label: string;
}

const Footer: React.FC = () => {
    const { currentPage, setCurrentPage, currentUser, openModal } = useAppContext();
    const isProvider = currentUser?.activeRole === 'provider';

    const NavItem: React.FC<NavItemProps> = ({ page, iconName, label }) => {
        const isActive = currentPage === page;
        const activeClass = isActive ? 'text-red-600' : 'text-gray-500 dark:text-gray-400';
        return (
            <button
                onClick={() => setCurrentPage(page)}
                className={`flex flex-col items-center justify-center space-y-1 w-full ${activeClass} hover:text-red-500 dark:hover:text-red-400 transition-colors`}
                aria-label={label}
            >
                <Icon name={iconName} className="w-6 h-6" />
                <span className="text-xs font-medium">{label}</span>
            </button>
        );
    };

    const handleCentralButtonClick = () => {
        if (isProvider) {
            openModal(<MyServicesModal onClose={() => openModal(null)} />);
        } else {
            setCurrentPage(Page.Scan);
        }
    }

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-gray-900 shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)] h-20 pt-2">
            <nav className="grid grid-cols-5 items-center h-full max-w-lg mx-auto">
                <NavItem page={Page.Billboard} iconName="home" label="Billboard" />
                <NavItem page={Page.Discovery} iconName="search" label="Discover" />
                <div className="flex justify-center">
                    <button 
                        onClick={handleCentralButtonClick}
                        className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transform -translate-y-6 hover:bg-red-700 transition"
                        aria-label={isProvider ? "My QR Codes" : "Scan QR Code"}
                    >
                        <Icon name={isProvider ? "store" : "qr"} className="w-8 h-8" />
                    </button>
                </div>
                <NavItem page={Page.Transactions} iconName="chart" label={isProvider ? 'Services' : 'Jobs'} />
                <NavItem page={Page.Profile} iconName="user" label="Profile" />
            </nav>
        </footer>
    );
};

export default Footer;
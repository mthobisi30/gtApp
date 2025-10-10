import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import Icon from '../common/Icon';
import MyReviewsModal from '../modals/MyReviewsModal';
import ComingSoonModal from '../modals/ComingSoonModal';
import { Page } from '../../types';

const RoleSwitcher: React.FC = () => {
    const { currentUser, toggleActiveRole } = useAppContext();

    if (!currentUser || currentUser.roles.length < 2) {
        return null;
    }

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold">Viewing As</h3>
                    <p className="text-red-600 font-semibold capitalize">{currentUser.activeRole}</p>
                </div>
                <Button onClick={toggleActiveRole}>
                    Switch to {currentUser.activeRole === 'client' ? 'Provider' : 'Client'}
                </Button>
            </div>
        </Card>
    );
};


const Profile: React.FC = () => {
    const { currentUser, logout, openModal, setCurrentPage } = useAppContext();

    if (!currentUser) {
        return <div className="text-center p-8">Loading profile...</div>;
    }
    
    const reputationColor = currentUser.reputation > 75 ? 'bg-green-500' : currentUser.reputation > 40 ? 'bg-yellow-500' : 'bg-red-500';

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <div className="flex flex-col items-center">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full mb-4 ring-4 ring-red-500 p-1" />
                    <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">@{currentUser.handle}</p>
                    <span className="mt-2 px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full dark:bg-red-900/50 dark:text-red-200 capitalize">
                        {currentUser.activeRole}
                    </span>
                    <div className="mt-4 flex space-x-4">
                        <Button onClick={() => openModal(<ComingSoonModal onClose={() => openModal(null)}/>)}>Edit Profile</Button>
                        <Button onClick={() => openModal(<ComingSoonModal onClose={() => openModal(null)}/>)} className="!bg-gray-200 !text-gray-800 hover:!bg-gray-300">Share</Button>
                    </div>
                </div>
            </Card>
            
            <RoleSwitcher />

            <Card>
                <h3 className="text-xl font-bold mb-2">Reputation</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                    <div className={`${reputationColor} h-4 rounded-full`} style={{ width: `${currentUser.reputation}%` }}></div>
                </div>
                <p className="text-right text-sm font-medium mt-1">{currentUser.reputation}/100</p>
            </Card>

            <Card>
                <h3 className="text-xl font-bold mb-4">My Activity</h3>
                <div className="space-y-2">
                    {currentUser.activeRole === 'provider' && (
                        <button onClick={() => setCurrentPage(Page.Dashboard)} className="w-full text-left p-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                           <Icon name="chart" className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                           <span>Analytics Dashboard</span>
                       </button>
                    )}
                    <button onClick={() => openModal(<MyReviewsModal onClose={() => openModal(null)} />)} className="w-full text-left p-3 flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                            <Icon name="star" className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        <span>My Reviews</span>
                    </button>
                </div>
            </Card>

            <Card>
                 <h3 className="text-xl font-bold mb-4">Settings</h3>
                 <div className="space-y-2">
                    <button onClick={() => openModal(<ComingSoonModal onClose={() => openModal(null)}/>)} className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Account Settings</button>
                    <button onClick={() => openModal(<ComingSoonModal onClose={() => openModal(null)}/>)} className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Privacy Policy</button>
                    <button onClick={logout} className="w-full text-left p-3 text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/50 rounded-lg">Log Out</button>
                </div>
            </Card>
            <p className="text-center text-xs text-gray-400 mt-8 pb-4">
                Powered by Qwezy Digitals PTY LTD
            </p>
        </div>
    );
};

export default Profile;
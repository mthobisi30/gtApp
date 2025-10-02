import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Billboard from './components/pages/Feed';
import Discovery from './components/pages/Discovery';
import Profile from './components/pages/Profile';
import AdCenter from './components/pages/AdCenter';
import Transactions from './components/pages/Transactions';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Chat from './components/pages/Chat';
import Toast from './components/common/Toast';
import { Page } from './types';

const PageRenderer: React.FC = () => {
    const { currentPage } = useAppContext();

    switch (currentPage) {
        case Page.Billboard:
            return <Billboard />;
        case Page.Discovery:
            return <Discovery />;
        case Page.Scan:
            return <AdCenter />;
        case Page.Transactions:
            return <Transactions />;
        case Page.Profile:
            return <Profile />;
        case Page.Chat:
            return <Chat />;
        default:
            return <Billboard />;
    }
};

const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

const AppContent: React.FC = () => {
    const { toast, isAuthenticated, authPage, modalContent } = useAppContext();

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
                 {authPage === 'signin' ? <Signin /> : <Signup />}
                 {toast && <Toast message={toast.message} type={toast.type} />}
            </div>
        )
    }

    return (
         <div className="flex flex-col h-screen font-sans text-gray-800 dark:text-gray-200">
            <Header />
            <main className="flex-1 overflow-y-auto pb-24 pt-16 bg-gray-100 dark:bg-gray-800">
                <div className="p-4">
                     <PageRenderer />
                </div>
            </main>
            <Footer />
            {toast && <Toast message={toast.message} type={toast.type} />}
            {modalContent}
        </div>
    );
}

export default App;
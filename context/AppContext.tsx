import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Page, ToastMessage, User, UserRole, ServicePost, Transaction } from '../types';
import { 
    findUserByCredentials, 
    addUser, 
    getCommunityPosts, 
    getTransactions as fetchTransactions,
    addServicePost,
    updateServicePost as updateServicePostAPI,
    addTransaction as addTransactionAPI,
    updateTransaction as updateTransactionAPI,
    addCommentToPost,
    addReviewToPost,
} from '../services/geminiService';


interface AppContextState {
    currentPage: Page;
    currentUser: User | null;
    toast: ToastMessage | null;
    isAuthenticated: boolean;
    authPage: 'signin' | 'signup';
    servicePosts: ServicePost[];
    transactions: Transaction[];
    loading: boolean;
    modalContent: ReactNode | null;
    activeChatPartner: User | null;
}

interface AppContextValue extends AppContextState {
    setCurrentPage: (page: Page) => void;
    setToast: (toast: ToastMessage | null) => void;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
    setAuthPage: (page: 'signin' | 'signup') => void;
    openModal: (content: ReactNode | null) => void;
    addService: (service: Omit<ServicePost, 'id' | 'provider' | 'reviews' | 'comments' | 'avgRating'>) => Promise<void>;
    updateService: (serviceId: string, serviceData: Omit<ServicePost, 'id' | 'provider' | 'reviews' | 'comments' | 'avgRating'>) => Promise<void>;
    addJob: (job: Omit<Transaction, 'id' | 'provider' | 'qrCodeId'>) => Promise<void>;
    updateJob: (jobId: string, jobData: Omit<Transaction, 'id' | 'provider' | 'client' | 'qrCodeId'>) => Promise<void>;
    addComment: (postId: string, text: string) => void;
    addReview: (postId: string, rating: number, comment: string) => void;
    setActiveChatPartner: (user: User | null) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Billboard);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [toast, setToast] = useState<ToastMessage | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [authPage, setAuthPage] = useState<'signin' | 'signup'>('signin');
    const [servicePosts, setServicePosts] = useState<ServicePost[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalContent, setModalContent] = useState<ReactNode | null>(null);
    const [activeChatPartner, setActiveChatPartner] = useState<User | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                setLoading(true);
                const [posts, trans] = await Promise.all([getCommunityPosts(), fetchTransactions()]);
                setServicePosts(posts);
                setTransactions(trans);
                setLoading(false);
            };
            fetchData();
        }
    }, [isAuthenticated]);

    const login = async (email: string, password: string): Promise<boolean> => {
        const user = await findUserByCredentials(email, password);
        if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            setCurrentPage(Page.Billboard);
            setToast({ message: `Welcome back, ${user.name}!`, type: 'success' });
            return true;
        }
        setToast({ message: 'Invalid email or password.', type: 'error' });
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setToast({ message: 'You have been logged out.', type: 'info' });
    };

    const signup = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
        const newUser = await addUser({ name, email, password, role });
        if (newUser) {
             setCurrentUser(newUser);
             setIsAuthenticated(true);
             setCurrentPage(Page.Billboard);
             setToast({ message: 'Account created successfully!', type: 'success' });
             return true;
        }
        setToast({ message: 'An account with this email already exists.', type: 'error' });
        return false;
    };
    
    const openModal = (content: ReactNode | null) => {
        setModalContent(content);
    }

    const addService = async (serviceData: Omit<ServicePost, 'id' | 'provider' | 'reviews' | 'comments' | 'avgRating'>) => {
        if (!currentUser) return;
        const newPost = await addServicePost(currentUser, serviceData);
        setServicePosts(prev => [newPost, ...prev]);
        openModal(null);
        setToast({ message: 'Service added successfully!', type: 'success' });
    }

    const updateService = async (serviceId: string, serviceData: Omit<ServicePost, 'id' | 'provider' | 'reviews' | 'comments' | 'avgRating'>) => {
        const updatedPost = await updateServicePostAPI(serviceId, serviceData);
        setServicePosts(prev => prev.map(p => p.id === serviceId ? updatedPost : p));
        openModal(null);
        setToast({ message: 'Service updated!', type: 'success' });
    }

    const addJob = async (jobData: Omit<Transaction, 'id' | 'provider' | 'qrCodeId'>) => {
        if (!currentUser) return;
        const newJob = await addTransactionAPI(currentUser, jobData);
        setTransactions(prev => [newJob, ...prev]);
        openModal(null);
        setToast({ message: 'Job created successfully!', type: 'success' });
    }

    const updateJob = async (jobId: string, jobData: Omit<Transaction, 'id' | 'provider' | 'client' | 'qrCodeId'>) => {
        const updatedJob = await updateTransactionAPI(jobId, jobData);
        setTransactions(prev => prev.map(j => j.id === jobId ? updatedJob : j));
        openModal(null);
        if (updatedJob.status === 'Ready for Pickup') {
            setToast({ message: `Client notified: "${updatedJob.serviceName}" is ready.`, type: 'info' });
        } else if (updatedJob.status === 'Completed') {
            setToast({ message: `Job "${updatedJob.serviceName}" marked as completed!`, type: 'success' });
        } else {
            setToast({ message: 'Job updated!', type: 'success' });
        }
    }

    const addComment = async (postId: string, text: string) => {
        if(!currentUser) return;
        const updatedPost = await addCommentToPost(postId, currentUser, text);
        setServicePosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
    }

    const addReview = async (postId: string, rating: number, comment: string) => {
        if(!currentUser) return;
        const updatedPost = await addReviewToPost(postId, currentUser, { rating, comment });
        setServicePosts(prev => prev.map(p => p.id === postId ? updatedPost : p));
        openModal(null);
        setToast({ message: 'Review submitted!', type: 'success' });
    }


    const value: AppContextValue = {
        currentPage,
        currentUser,
        toast,
        isAuthenticated,
        authPage,
        servicePosts,
        transactions,
        loading,
        modalContent,
        activeChatPartner,
        setCurrentPage,
        setToast,
        login,
        logout,
        signup,
        setAuthPage,
        openModal,
        addService,
        updateService,
        addJob,
        updateJob,
        addComment,
        addReview,
        setActiveChatPartner,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
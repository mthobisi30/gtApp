export enum Page {
    Billboard = 'Billboard',
    Discovery = 'Discovery',
    Scan = 'Scan',
    Transactions = 'Transactions',
    Profile = 'Profile',
    Chat = 'Chat',
    Dashboard = 'Dashboard',
}

export type UserRole = 'client' | 'provider';
export type TransactionStatus = 'In Progress' | 'Ready for Pickup' | 'Completed';

export interface User {
    id: string;
    name: string;
    avatarUrl: string;
    handle: string;
    roles: UserRole[];
    activeRole: UserRole;
    reputation: number; // Score out of 100
    email: string;
    password?: string;
}

export interface Comment {
    id: string;
    author: User;
    text: string;
    timestamp: string;
}

export interface Review {
    id: string;
    author: User;
    rating: number; // 1-5
    comment: string;
    timestamp: string;
}

export interface ServicePost {
    id: string;
    provider: User;
    serviceName: string;
    description: string;
    imageUrl: string;
    category: string;
    reviews: Review[];
    comments: Comment[];
    avgRating: number;
}

export interface Transaction {
    id:string;
    serviceName: string;
    provider: User;
    client: User;
    date: string;
    status: TransactionStatus;
    qrCodeId: string;
    pickupDeadline?: number; // In hours
    readyTimestamp?: string; // ISO string
    deliveryRequested?: boolean;
    deliveryAddress?: string;
    deliveryPhoneNumber?: string;
    estimatedDeliveryTime?: string;
}

export interface ServiceCategory {
    id: string;
    name: string;
    icon: string;
}

export interface ToastMessage {
    message: string;
    type: 'success' | 'error' | 'info';
}

export interface ChatMessage {
    id: string;
    text: string;
    timestamp: string;
    senderId: string;
}

export interface ChatThread {
    id: string;
    participant: User;
    lastMessage: {
        text: string;
        timestamp: string;
    };
    messages: ChatMessage[];
}

export interface DashboardStats {
    profileViews: number;
    likesReceived: number;
    engagementRate: number;
    followers: number;
    activity: { name: string; value: number }[];
    performance: { name: string; value: number }[];
}
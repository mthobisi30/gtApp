import { ServicePost, User, Transaction, ServiceCategory, Review, ChatThread, DashboardStats, UserRole, Comment } from '../types';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- MOCK USERS ---
const mockUsers: { [key: string]: User } = {
    '1': { id: '1', name: 'Jane Doe', email: 'client@test.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/jane/100/100', handle: 'janedoe', roles: ['client'], activeRole: 'client', reputation: 85 },
    '2': { id: '2', name: 'John Smith', email: 'provider@test.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/john/100/100', handle: 'johnsmith', roles: ['provider', 'client'], activeRole: 'provider', reputation: 92 },
    '3': { id: '3', name: 'Alice Johnson', email: 'alice@test.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/alice/100/100', handle: 'alicej', roles: ['provider'], activeRole: 'provider', reputation: 78 },
    '4': { id: '4', name: 'Bob Brown', email: 'bob@test.com', password: 'password', avatarUrl: 'https://picsum.photos/seed/bob/100/100', handle: 'bobb', roles: ['client'], activeRole: 'client', reputation: 65 },
};

// --- MOCK REVIEWS ---
let mockReviews: Review[] = [
    { id: 'r1', author: mockUsers['1'], rating: 5, comment: 'Amazing quality and fast service!', timestamp: '2h ago' },
    { id: 'r2', author: mockUsers['4'], rating: 4, comment: 'Very professional, would recommend.', timestamp: '1d ago' },
];

// --- MOCK COMMENTS ---
let mockComments: Comment[] = [
    { id: 'c1', author: mockUsers['4'], text: 'This looks great! Do you do custom sizes?', timestamp: '1h ago' },
    { id: 'c2', author: mockUsers['1'], text: 'What are the material options?', timestamp: '3h ago' },
]

// --- MOCK SERVICE POSTS ---
let mockServicePosts: ServicePost[] = [
    { 
        id: 'sp1', 
        provider: mockUsers['2'], 
        serviceName: 'Custom Bookshelf Crafting', 
        description: 'Hand-crafted, solid wood bookshelves tailored to your space. Multiple finishes available.',
        imageUrl: 'https://picsum.photos/seed/bookshelf/600/400', 
        category: 'Home Services',
        reviews: [mockReviews[0]],
        comments: [mockComments[0]],
        avgRating: 5.0
    },
    { 
        id: 'sp2', 
        provider: mockUsers['3'], 
        serviceName: 'Professional Logo Design', 
        description: 'Get a unique and memorable logo for your brand. Includes 3 revision rounds.',
        imageUrl: 'https://picsum.photos/seed/logo/600/400', 
        category: 'Creative',
        reviews: [mockReviews[1]],
        comments: [mockComments[1]],
        avgRating: 4.0
    },
];

// --- MOCK TRANSACTIONS ---
let mockTransactions: Transaction[] = [
    { id: 't1', serviceName: 'PC Repair', provider: mockUsers['2'], client: mockUsers['1'], date: '2023-10-26', status: 'Ready for Pickup', qrCodeId: 'QR123', pickupDeadline: 48, readyTimestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString() },
    { id: 't2', serviceName: 'Garden Maintenance', provider: mockUsers['3'], client: mockUsers['1'], date: '2023-10-25', status: 'In Progress', qrCodeId: 'QR456' },
    { id: 't3', serviceName: 'Website Consultation', provider: mockUsers['3'], client: mockUsers['4'], date: '2023-10-22', status: 'Completed', qrCodeId: 'QR789' },
    { id: 't4', serviceName: 'Custom Painting', provider: mockUsers['2'], client: mockUsers['4'], date: '2023-10-28', status: 'Ready for Pickup', qrCodeId: 'QR101', pickupDeadline: 2, readyTimestamp: new Date(Date.now() - 1.5 * 3600 * 1000).toISOString(), deliveryRequested: true, deliveryAddress: '123 Main St, Anytown', deliveryPhoneNumber: '555-1234', estimatedDeliveryTime: '2-3 hours' },
];

// --- MOCK SERVICE CATEGORIES ---
const mockServiceCategories: ServiceCategory[] = [
    { id: 'sc1', name: 'Home Services', icon: 'home' },
    { id: 'sc2', name: 'Automotive', icon: 'settings' },
    { id: 'sc3', name: 'Creative & Design', icon: 'user' },
    { id: 'sc4', name: 'Personal Care', icon: 'star' },
    { id: 'sc5', name: 'Tech & Electronics', icon: 'chart' },
    { id: 'sc6', name: 'Events', icon: 'bell' },
];

// --- MOCK CHATS ---
const mockChats: ChatThread[] = [
    {
        id: 'chat1',
        participant: mockUsers['2'],
        lastMessage: {
            text: 'Yes, it will be ready by 5 PM today.',
            timestamp: '15m ago'
        },
        messages: [] // Not needed for the list view
    },
    {
        id: 'chat2',
        participant: mockUsers['3'],
        lastMessage: {
            text: 'Just confirming the details we discussed.',
            timestamp: '1h ago'
        },
        messages: [] // Not needed for the list view
    }
];

// --- MOCK DASHBOARD STATS ---
const mockDashboardStats: DashboardStats = {
    profileViews: 1254,
    likesReceived: 632,
    engagementRate: 12.5,
    followers: 341,
    activity: [
        { name: 'Mon', value: 20 },
        { name: 'Tue', value: 45 },
        { name: 'Wed', value: 30 },
        { name: 'Thu', value: 60 },
        { name: 'Fri', value: 80 },
        { name: 'Sat', value: 70 },
        { name: 'Sun', value: 95 },
    ],
    performance: [
        { name: 'Jan', value: 240 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 200 },
        { name: 'Apr', value: 278 },
        { name: 'May', value: 189 },
        { name: 'Jun', value: 239 },
    ]
};


// --- API FUNCTIONS ---

// --- AUTH FUNCTIONS ---
export const findUserByCredentials = async (email: string, pass: string): Promise<User | null> => {
    await delay(500);
    const user = Object.values(mockUsers).find(u => u.email === email && u.password === pass);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    return null;
}

export const addUser = async (data: {name: string, email: string, password: string, role: UserRole}): Promise<User | null> => {
    await delay(500);
    const emailExists = Object.values(mockUsers).some(u => u.email === data.email);
    if(emailExists) return null;

    const newId = (Object.keys(mockUsers).length + 1).toString();
    const newUser: User = {
        id: newId,
        name: data.name,
        email: data.email,
        password: data.password,
        roles: [data.role],
        activeRole: data.role,
        avatarUrl: `https://picsum.photos/seed/${newId}/100/100`,
        handle: data.name.toLowerCase().replace(/\s/g, ''),
        reputation: Math.floor(Math.random() * 30) + 50, // Random reputation between 50-80
    };
    mockUsers[newId] = newUser;
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
}

// --- DATA FETCHING ---
export const getCommunityPosts = async (): Promise<ServicePost[]> => {
    await delay(500);
    return [...mockServicePosts].sort(() => Math.random() - 0.5); // Randomize for effect
};

export const getTransactions = async (): Promise<Transaction[]> => {
    await delay(600);
    return mockTransactions;
};

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
    await delay(400);
    return mockServiceCategories;
};

export const getChats = async (): Promise<ChatThread[]> => {
    await delay(700);
    return mockChats;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
    await delay(800);
    return mockDashboardStats;
};


// --- DATA MUTATION ---
export const addServicePost = async (provider: User, data: Omit<ServicePost, 'id' | 'provider' | 'reviews' | 'comments' | 'avgRating'>): Promise<ServicePost> => {
    await delay(400);
    const newPost: ServicePost = {
        ...data,
        id: `sp${Date.now()}`,
        provider,
        reviews: [],
        comments: [],
        avgRating: 0,
    };
    mockServicePosts.unshift(newPost);
    return newPost;
}

export const updateServicePost = async (postId: string, data: Omit<ServicePost, 'id' | 'provider' | 'reviews' | 'comments' | 'avgRating'>): Promise<ServicePost> => {
    await delay(400);
    const postIndex = mockServicePosts.findIndex(p => p.id === postId);
    if(postIndex === -1) throw new Error("Post not found");
    mockServicePosts[postIndex] = { ...mockServicePosts[postIndex], ...data };
    return mockServicePosts[postIndex];
}

export const addTransaction = async (provider: User, data: Omit<Transaction, 'id' | 'provider' | 'qrCodeId' | 'readyTimestamp' | 'deliveryRequested'>): Promise<Transaction> => {
    await delay(400);
    const newTransaction: Transaction = {
        ...data,
        id: `t${Date.now()}`,
        provider,
        qrCodeId: `QR${Date.now()}`,
        deliveryRequested: false,
    };

    if (newTransaction.status === 'Ready for Pickup') {
        newTransaction.readyTimestamp = new Date().toISOString();
    }

    mockTransactions.unshift(newTransaction);
    return newTransaction;
}

export const updateTransaction = async (jobId: string, data: Partial<Omit<Transaction, 'id' | 'provider' | 'client' | 'qrCodeId'>>): Promise<Transaction> => {
    await delay(400);
    const jobIndex = mockTransactions.findIndex(j => j.id === jobId);
    if(jobIndex === -1) throw new Error("Job not found");
    
    const originalJob = mockTransactions[jobIndex];
    const updatedJob = { ...originalJob, ...data };

    if (data.status === 'Ready for Pickup' && originalJob?.status !== 'Ready for Pickup') {
        updatedJob.readyTimestamp = new Date().toISOString();
    }

    mockTransactions[jobIndex] = updatedJob;
    return mockTransactions[jobIndex];
}

export const requestDeliveryForTransaction = async (jobId: string, address: string, phoneNumber: string): Promise<Transaction> => {
    await delay(400);
    const jobIndex = mockTransactions.findIndex(j => j.id === jobId);
    if(jobIndex === -1) throw new Error("Job not found");

    const updatedJob = {
        ...mockTransactions[jobIndex],
        deliveryRequested: true,
        deliveryAddress: address,
        deliveryPhoneNumber: phoneNumber,
        estimatedDeliveryTime: `${Math.floor(Math.random() * 2) + 2}-${Math.floor(Math.random() * 3) + 4} hours`
    };

    mockTransactions[jobIndex] = updatedJob;
    return updatedJob;
}

export const addCommentToPost = async (postId: string, author: User, text: string): Promise<ServicePost> => {
    await delay(200);
    const postIndex = mockServicePosts.findIndex(p => p.id === postId);
    if(postIndex === -1) throw new Error("Post not found");

    const newComment: Comment = {
        id: `c${Date.now()}`,
        author,
        text,
        timestamp: 'Just now'
    };
    mockServicePosts[postIndex].comments.push(newComment);
    return mockServicePosts[postIndex];
}

export const addReviewToPost = async (postId: string, author: User, reviewData: { rating: number; comment: string }): Promise<ServicePost> => {
    await delay(300);
    const postIndex = mockServicePosts.findIndex(p => p.id === postId);
    if(postIndex === -1) throw new Error("Post not found");

    const newReview: Review = {
        id: `r${Date.now()}`,
        author,
        rating: reviewData.rating,
        comment: reviewData.comment,
        timestamp: 'Just now'
    };

    const post = mockServicePosts[postIndex];
    post.reviews.push(newReview);
    // Recalculate average rating
    const totalRating = post.reviews.reduce((sum, r) => sum + r.rating, 0);
    post.avgRating = totalRating / post.reviews.length;
    
    return post;
}

import React, { useEffect, useState } from 'react';
import Card from '../common/Card';
import { getChats } from '../../services/geminiService';
import type { ChatThread, User } from '../../types';
import { useAppContext } from '../../context/AppContext';
import Icon from '../common/Icon';
import Button from '../common/Button';

const ChatListItem: React.FC<{ chat: ChatThread; onSelect: (user: User) => void }> = ({ chat, onSelect }) => (
    <div onClick={() => onSelect(chat.participant)} className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
        <img src={chat.participant.avatarUrl} alt={chat.participant.name} className="w-14 h-14 rounded-full mr-4" />
        <div className="flex-1">
            <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800 dark:text-gray-100">{chat.participant.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{chat.lastMessage.timestamp}</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{chat.lastMessage.text}</p>
        </div>
    </div>
);

const ActiveChatView: React.FC<{ partner: User, onBack: () => void }> = ({ partner, onBack }) => {
    const { currentUser } = useAppContext();
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            // Mock sending message
            console.log(`Message to ${partner.name}: ${message}`);
            setMessage('');
        }
    }
    
    return (
        <Card className="flex flex-col h-[70vh]">
            <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-700">
                <button onClick={onBack} className="mr-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Icon name="arrow-left" className="w-6 h-6" />
                </button>
                <img src={partner.avatarUrl} alt={partner.name} className="w-10 h-10 rounded-full mr-3" />
                <h2 className="text-xl font-bold">{partner.name}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {/* Mock chat messages */}
                <p className="text-center text-gray-500 text-sm">This is the beginning of your conversation with {partner.name}.</p>
                <p className="text-center text-gray-500 text-sm my-4 bg-gray-100 dark:bg-gray-700 rounded-full py-1 px-3 w-fit mx-auto">Yesterday</p>
                 <div className="flex justify-end mb-2">
                    <div className="bg-red-500 text-white rounded-lg py-2 px-4 max-w-xs">
                        Hey! Is the custom bookshelf still available?
                    </div>
                </div>
                 <div className="flex justify-start mb-2">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg py-2 px-4 max-w-xs">
                        Yes it is! What kind of dimensions are you looking for?
                    </div>
                </div>
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center">
                 <input 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <Button onClick={handleSend} className="ml-2 !rounded-full !p-3">
                    <Icon name="paper-airplane" className="w-5 h-5" />
                </Button>
            </div>
        </Card>
    )
}


const Chat: React.FC = () => {
    const { activeChatPartner, setActiveChatPartner } = useAppContext();
    const [chats, setChats] = useState<ChatThread[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            const chatThreads = await getChats();
            setChats(chatThreads);
            setLoading(false);
        };
        fetchChats();
    }, []);

    if (activeChatPartner) {
        return <ActiveChatView partner={activeChatPartner} onBack={() => setActiveChatPartner(null)} />;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="!p-2">
                <h2 className="text-2xl font-bold mb-4 p-2">Messages</h2>
                 {loading ? (
                    <div className="text-center p-8">Loading chats...</div>
                ) : (
                    <div>
                        {chats.map(chat => <ChatListItem key={chat.id} chat={chat} onSelect={setActiveChatPartner} />)}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Chat;

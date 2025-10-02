import React, { useEffect, useState } from 'react';
import Card from '../common/Card';
import Icon from '../common/Icon';
import { useAppContext } from '../../context/AppContext';
import type { ServicePost, Comment as CommentType } from '../../types';
// FIX: Import the 'Page' enum to resolve the 'Cannot find name Page' error.
import { Page } from '../../types';
import Button from '../common/Button';
import ReviewModal from '../modals/ReviewModal';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Icon key={i} name="star" className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
        ))}
        <span className="ml-2 text-sm font-bold text-gray-600 dark:text-gray-300">{rating.toFixed(1)}</span>
    </div>
);

const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => (
    <div className="flex items-start space-x-3 py-2 border-t border-gray-100 dark:border-gray-700">
        <img src={comment.author.avatarUrl} alt={comment.author.name} className="w-8 h-8 rounded-full" />
        <div className="flex-1">
            <p className="text-sm">
                <span className="font-bold mr-2">{comment.author.name}</span>
                {comment.text}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{comment.timestamp}</p>
        </div>
    </div>
)

const ServicePostCard: React.FC<{ post: ServicePost }> = ({ post }) => {
    const { currentUser, openModal, addComment, setActiveChatPartner, setCurrentPage } = useAppContext();
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim() && currentUser) {
            addComment(post.id, newComment);
            setNewComment('');
        }
    }
    
    const handleMessage = () => {
        setActiveChatPartner(post.provider);
        setCurrentPage(Page.Chat);
    }

    return (
        <Card className="mb-4 overflow-hidden">
            <div className="flex items-center mb-4">
                <img src={post.provider.avatarUrl} alt={post.provider.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <p className="font-bold text-gray-800 dark:text-gray-100">{post.provider.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@{post.provider.handle}</p>
                </div>
            </div>
            
            <img src={post.imageUrl} alt={post.serviceName} className="w-full h-56 object-cover rounded-lg mb-4" />
            
            <h3 className="text-xl font-bold mb-2">{post.serviceName}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{post.description}</p>
            
            <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3 mb-3">
                <StarRating rating={post.avgRating} />
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.reviews.length} reviews</p>
            </div>

            <div className="flex items-center space-x-2">
                <Button onClick={() => openModal(<ReviewModal postId={post.id} />)} className="flex-1">Review</Button>
                <Button onClick={handleMessage} className="flex-1">Message</Button>
                 <Button onClick={() => setShowComments(!showComments)} className="flex-1">
                    Comments ({post.comments.length})
                </Button>
            </div>

            {showComments && (
                 <div className="mt-4">
                    <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                        {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                    </div>
                    <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2">
                        <img src={currentUser?.avatarUrl} alt="Your avatar" className="w-8 h-8 rounded-full" />
                        <input 
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        <Button type="submit" className="!px-3 !py-2 !rounded-full">Post</Button>
                    </form>
                </div>
            )}
        </Card>
    );
};

const Billboard: React.FC = () => {
    const { servicePosts, loading } = useAppContext();

    if (loading) {
        return <div className="text-center p-8 text-gray-500 dark:text-gray-400">Loading billboard...</div>;
    }

    return (
        <div className="max-w-xl mx-auto">
            {servicePosts.map(post => <ServicePostCard key={post.id} post={post} />)}
        </div>
    );
};

export default Billboard;
import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { useAppContext } from '../../context/AppContext';
import Icon from '../common/Icon';

interface ReviewModalProps {
    postId: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ postId }) => {
    const { openModal, addReview } = useAppContext();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(rating === 0) return;
        setLoading(true);
        await addReview(postId, rating, comment);
        setLoading(false);
    };

    return (
        <Modal onClose={() => openModal(null)} title="Leave a Review">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-center text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
                    <div className="flex justify-center items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onMouseEnter={() => setHoverRating(i + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(i + 1)}
                            >
                                <Icon 
                                    name="star" 
                                    className={`w-8 h-8 cursor-pointer transition-colors ${
                                        (hoverRating || rating) > i ? 'text-yellow-400' : 'text-gray-300'
                                    }`} 
                                />
                            </button>
                        ))}
                    </div>
                </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                        placeholder="Share your experience..."
                        rows={4}
                        required
                    />
                </div>

                <Button type="submit" className="w-full !py-2.5" disabled={loading || rating === 0}>
                    {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
            </form>
        </Modal>
    );
};

export default ReviewModal;

import React from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../context/AppContext';
import Icon from '../common/Icon';
import { Review } from '../../types';

const MyReviewsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { currentUser, servicePosts } = useAppContext();
    
    const myReviews: { review: Review, serviceName: string }[] = [];
    servicePosts.forEach(post => {
        post.reviews.forEach(review => {
            if (review.author.id === currentUser?.id) {
                myReviews.push({ review, serviceName: post.serviceName });
            }
        });
    });

    return (
        <Modal onClose={onClose} title="My Reviews">
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {myReviews.length > 0 ? (
                    myReviews.map(({ review, serviceName }) => (
                        <div key={review.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <p className="text-sm text-gray-500">
                                For: <span className="font-bold text-gray-700 dark:text-gray-200">{serviceName}</span>
                            </p>
                            <div className="flex items-center my-1">
                                {[...Array(5)].map((_, i) => (
                                    <Icon key={i} name="star" className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <p className="italic">"{review.comment}"</p>
                            <p className="text-xs text-right text-gray-400 mt-1">{review.timestamp}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-4">You haven't left any reviews yet.</p>
                )}
            </div>
        </Modal>
    );
};

export default MyReviewsModal;
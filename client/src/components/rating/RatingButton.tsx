// src/components/rating/RatingButton.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../../styles/rating/Rating.css';

interface RatingButtonProps {
    postId: number;
    initialRatings: number[];
}

const RatingButton: React.FC<RatingButtonProps> = ({ postId, initialRatings }) => {
    const [ratings, setRatings] = useState<number[]>(initialRatings);
    const [showRatingPopup, setShowRatingPopup] = useState<boolean>(false);

    const handleRatingClick = () => {
        setShowRatingPopup(true);
    };

    const handleRatingSubmit = async (rating: number) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.post('http://localhost:4200/ratings', { postId, rating }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setRatings([...ratings, rating]);
            setShowRatingPopup(false);
        } catch (error) {
            console.error('Error submitting rating', error);
        }
    };

    const averageRating = ratings.length > 0
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : 'No Ratings';

    return (
        <div>
            <button className="rating-button" onClick={handleRatingClick}>
                <FontAwesomeIcon icon={faStar as IconProp} /> {averageRating}
            </button>
            {showRatingPopup && (
                <div className="rating-popup">
                    <button onClick={() => handleRatingSubmit(1)}>1 Star</button>
                    <button onClick={() => handleRatingSubmit(2)}>2 Stars</button>
                    <button onClick={() => handleRatingSubmit(3)}>3 Stars</button>
                    <button onClick={() => handleRatingSubmit(4)}>4 Stars</button>
                    <button onClick={() => handleRatingSubmit(5)}>5 Stars</button>
                    <button onClick={() => setShowRatingPopup(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default RatingButton;

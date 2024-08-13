import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import '../../styles/rating/Rating.css';

interface RatingButtonProps {
    postId: number;
    initialRatings: number[];
    userRating: number | null;
}

const RatingButton: React.FC<RatingButtonProps> = ({ postId, initialRatings }) => {
    const [ratings, setRatings] = useState<number[]>(initialRatings);
    const [averageRating, setAverageRating] = useState<string>('No Ratings');
    const [showRatingPopup, setShowRatingPopup] = useState<boolean>(false);

    const handleRatingClick = () => {
        setShowRatingPopup(true);
    };

    useEffect(() => {
        //FFunção para buscar a média das avaliações de um post específico
        const fetchRatings = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:4200/ratings/average/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                //Processar a resposta do backend para extrair a média das avaliações (avgRating), covertendo avgRating para Float
                const ratingsData = response.data.msg;
                if (ratingsData && ratingsData.avgRating !== undefined) {
                    const avgRating = parseFloat(ratingsData.avgRating);
                    if (!isNaN(avgRating)) {
                        setAverageRating(avgRating.toFixed(1));
                    } else {
                        setAverageRating('No Ratings');
                    }
                } else {
                    setAverageRating('No Ratings');
                }
            } catch (error) {
                console.log("Error " + error);
            }
        };
        fetchRatings();
    }, [postId]);

    const handleRatingSubmit = async (rating: number) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.post('http://localhost:4200/ratings', { postId, rateCol: rating }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setRatings([...ratings, rating]);
            setShowRatingPopup(false);

            // Recalcular a média após o envio de uma nova avaliação
            const newAverage = (ratings.reduce((a, b) => a + b, 0) + rating) / (ratings.length + 1);
            setAverageRating(newAverage.toFixed(1));

        } catch (error) {
            console.error('Error submitting rating', error);
        }
    };

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

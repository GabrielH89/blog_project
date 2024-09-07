import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { LikeResponse } from '../../utils/types/LikeResponse';

interface LikeButtonProps {
    postId: number;
    initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikes }) => {
    const [likes, setLikes] = useState<number>(initialLikes);
    const [hasLiked, setHasLiked] = useState<boolean>(false);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get<LikeResponse>(`http://localhost:4200/likes/${postId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setLikes(response.data.likes.length);
                setHasLiked(response.data.userLiked);
            } catch (error) {
                console.error('Error fetching likes', error);
            }
        };
        
        fetchLikes();
    }, [postId]);

    const handleLike = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (hasLiked) {
                await axios.delete(`http://localhost:4200/likes/${postId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setLikes(prevLikes => prevLikes - 1);
                setHasLiked(false);
            } else {
                await axios.post('http://localhost:4200/likes', { postId }, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setLikes(prevLikes => prevLikes + 1);
                setHasLiked(true);
            }
        } catch (error) {
            console.error('Error handling like', error);
        }
    };

    return (
        <button className={`like-button ${hasLiked ? 'liked' : ''}`} onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp as IconProp} /> {likes} Likes
        </button>
    );
};

export default LikeButton;

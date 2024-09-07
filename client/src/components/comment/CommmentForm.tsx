import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/comment/CommentForm.css';

interface CommentFormProps {
    postId: number;
    onClose: () => void;
    onCommentAdded: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onClose, onCommentAdded }) => {
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (comment.trim() === '') {
            setError('Comment cannot be empty');
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            await axios.post('http://localhost:4200/comments', {
                commentCol: comment,
                post_id: postId
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            setComment('');
            onCommentAdded();
            onClose();
        } catch (error) {
            console.error("Error submitting comment", error);
            setError("Error submitting comment");
        }
    };

    return (
        <div className="comment-form-overlay">
            <div className="comment-form-container">
                <button className="close-button" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comment"
                        maxLength={400}
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CommentForm;

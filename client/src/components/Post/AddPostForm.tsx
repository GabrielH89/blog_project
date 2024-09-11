import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/post/AddPostForm.css';

interface AddPostFormProps {
    onClose: () => void;
    onPostAdded: () => void;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onClose, onPostAdded }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [titleCharsLeft, setTitleCharsLeft] = useState(100);
    const [bodyCharsLeft, setBodyCharsLeft] = useState(6000);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(Number(storedUserId));
        }
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setTitleCharsLeft(100 - e.target.value.length);
    }

    const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(e.target.value);
        setBodyCharsLeft(6000 - e.target.value.length);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userId === null) {
            setError("User ID not found. Please log in again.");
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            await axios.post('http://localhost:4200/posts', { title, body, user_id: userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            onPostAdded();
            onClose();
        } catch (error) {
            setError("Error adding post");
            console.error(error);
        }
    };

    return (
        <div className="add-post-form-overlay">
            <div className="add-post-form-container">
                <button className="cancel-button" onClick={onClose}>&times;</button> {/* Botão de cancelar com "X" */}
                <h2>Adicionar Post</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={handleTitleChange}
                            maxLength={100}
                            required
                        />
                    </div>
                    <small>{titleCharsLeft} caracteres restantes</small>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={handleBodyChange}
                            maxLength={6000}
                            required
                        ></textarea>
                        <small>{bodyCharsLeft} caracteres restantes</small>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Add Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPostForm;

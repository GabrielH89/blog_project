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

    useEffect(() => {
        // Assumindo que o ID do usuário está armazenado no localStorage
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(Number(storedUserId));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userId === null) {
            setError("User ID not found. Please log in again.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
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
                <h2>Adicionar Post</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Add Post</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPostForm;

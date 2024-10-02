import axios from 'axios';
import { useState, useEffect } from 'react';
import '../../styles/comment/CommentSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Comment {
    comment_id: number;
    commentCol: string;
    user_id: number;
    post_id: number;
    User: { name: string };
}

interface CommentSectionProps {
    id_post: number;
    initialComments: Comment[];
    userId: number | null;
}

const CommentSection: React.FC<CommentSectionProps> = ({ id_post, initialComments, userId }) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [showModal, setShowModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:4200/comments/${id_post}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };
        fetchComments();
    }, [id_post]);

    const openDeleteModal = (comment: Comment) => {
        setSelectedComment(comment);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedComment) return;

        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`http://localhost:4200/comments/${selectedComment.comment_id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setComments(comments.filter(comment => comment.comment_id !== selectedComment.comment_id));
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting comment", error);
        }
    };

    return (
        <div className='comments-section'>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index} style={{ position: 'relative' }}>
                        <p>{comment.commentCol}</p>
                        <small>By: {comment.User ? comment.User.name : "Unknown"}</small>

                        {userId === comment.user_id && (
                            <button className="delete-btn" onClick={() => openDeleteModal(comment)}>
                                <FontAwesomeIcon icon={faTrash as IconProp} />
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Modal de confirmação diretamente aqui no mesmo componente */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Você realmente deseja excluir o seguinte comentário?</p>
                        <div className="modal-buttons">
                            <button className="confirm-btn" onClick={handleConfirmDelete}>Sim</button>
                            <button className="cancel-btn" onClick={() => setShowModal(false)}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentSection;

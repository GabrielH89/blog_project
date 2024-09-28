import axios from 'axios';
import { useState, useEffect } from 'react';
import '../../styles/comment/CommentSection.css';

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

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:4200/comments/${id_post}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log("Comments fetched:", response.data); // Verificando a resposta da API
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments", error);
            }
        };
        fetchComments();
    }, [id_post]);

    // Função para deletar um comentário
    const handleDeleteComment = async (commentId: number) => {
        if (!commentId) {
            console.error("Invalid comment ID");
            return;
        }
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`http://localhost:4200/comments/${commentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Remove o comentário da lista de comentários
            setComments(comments.filter(comment => comment.comment_id !== commentId));
        } catch (error) {
            console.error("Error deleting comment", error);
        }
    };

    return (
        <div className='comments-section'>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.commentCol}</p>
                        <small>By: {comment.User ? comment.User.name : "Unknown"}</small>

                        {/* Mostra o botão de excluir se o comentário for do usuário logado */}
                        {userId === comment.user_id && (
                            <button onClick={() => handleDeleteComment(comment.comment_id)}>
                                Excluir
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentSection;

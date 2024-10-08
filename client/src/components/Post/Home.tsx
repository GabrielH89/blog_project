import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faComment, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import AddPostForm from './AddPostForm';
import LikeButton from '../Like/LikeButton';
import RatingButton from '../rating/RatingButton';
import CommentSection from '../comment/CommentSection';
import CommentForm from '../comment/CommmentForm';
import '../../styles/post/Home.css';
import { useUserData } from '../../utils/useUserData';

interface Post {
    post_id: number;
    title: string;
    body: string;
    comments: string[];
    likes: number;
    ratings: number[];
    user_id: number;
}

const POSTS_PER_PAGE = 4;

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [error, setError] = useState<string | null>(null);
    const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
    const [showAddPostForm, setShowAddPostForm] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState<{ [key: number]: boolean }>({});
    const [userId, setUserId] = useState<number | null>(null);
    const [postToDelete, setPostToDelete] = useState<number | null>(null); // Estado para o pop-up
    const { userName } = useUserData();

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(Number(storedUserId));
        }

        const fetchPosts = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get<Post[]>('http://localhost:4200/posts', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const formattedPosts: Post[] = response.data.map(item => ({
                    post_id: item.post_id,
                    title: item.title,
                    body: item.body,
                    comments: item.comments || [],
                    likes: item.likes || 0,
                    ratings: item.ratings || [],
                    user_id: item.user_id,
                }));

                setPosts(formattedPosts);
                setTotalPages(Math.ceil(formattedPosts.length / POSTS_PER_PAGE));
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    const handleToggleComments = (id_post: number) => {
        setShowComments(prevState => ({
            ...prevState,
            [id_post]: !prevState[id_post]
        }));
    };

    const handleAddPostClick = () => {
        setShowAddPostForm(true);
    };

    const handleCloseAddPostForm = () => {
        setShowAddPostForm(false);
    };

    const handlePostAdded = () => {
        const fetchPosts = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get<Post[]>('http://localhost:4200/posts', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const formattedPosts: Post[] = response.data.map(item => ({
                    post_id: item.post_id,
                    title: item.title,
                    body: item.body,
                    comments: item.comments || [],
                    likes: item.likes || 0,
                    ratings: item.ratings || [],
                    user_id: item.user_id,
                }));

                setPosts(formattedPosts);
                setTotalPages(Math.ceil(formattedPosts.length / POSTS_PER_PAGE));
            } catch (error) {
                setError("Error fetching posts");
                console.error(error);
            }
        };

        fetchPosts();
    };

    const handleDeletePost = async (postId: number) => {
        try {
            const token = sessionStorage.getItem('token');
            await axios.delete(`http://localhost:4200/posts/${postId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setPosts(posts.filter(post => post.post_id !== postId));
            setPostToDelete(null); // Fechar pop-up
        } catch (error) {
            console.error("Error deleting post", error);
        }
    };

    const handleOpenDeleteConfirmation = (postId: number) => {
        setPostToDelete(postId); // Abrir o pop-up
    };

    const handleCancelDelete = () => {
        setPostToDelete(null); // Fechar o pop-up
    };

    const handleToggleCommentForm = (postId: number) => {
        setShowCommentForm(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentPosts = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    return (
        <div className="home-container">
            <header className="header">
                <h1 className="system-name">Blog System</h1>
                <div className="user-icon">
                    <FontAwesomeIcon icon={faUser as IconProp} onClick={() => window.location.href = '/user-info'} />
                </div>
            </header>
            <div className="menu">
                <h1>Bem-vindo(a), {userName}</h1>
                <div className="menu-buttons">
                    <button className="addPost-btn" onClick={handleAddPostClick}>Adicionar Post</button>
                </div>
            </div>
            <div className="body-posts">
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    currentPosts.map(post => (
                        <div key={post.post_id} className="post">
                            <div className="post-header">
                                <h2>{post.title}</h2>
                                <button 
                                    className="delete-button" 
                                    onClick={() => handleOpenDeleteConfirmation(post.post_id)} // Abrir pop-up
                                    disabled={post.user_id !== userId}
                                >
                                    <FontAwesomeIcon icon={faTrash as IconProp} />
                                </button>
                            </div>
                            <p>{post.body}</p>
                            <div className="post-actions">
                                <LikeButton postId={post.post_id} initialLikes={post.likes} />
                                <button 
                                    className="comment-button" 
                                    onClick={() => handleToggleComments(post.post_id)}
                                >
                                    <FontAwesomeIcon icon={faComment as IconProp} /> Comentários
                                </button>
                                
                                <RatingButton postId={post.post_id} initialRatings={post.ratings} userRating={null} />
                            </div>
                            <button 
                                className="add-comment-button" 
                                onClick={() => handleToggleCommentForm(post.post_id)}
                            >
                                <FontAwesomeIcon icon={faPlus as IconProp} /> Adicionar Comentário
                            </button>
                            {showComments[post.post_id] && (
                                <div className="comments-section">
                                    <CommentSection 
                                        id_post={post.post_id} 
                                        initialComments={[]} 
                                        userId={userId}
                                    />
                                </div>
                            )}
                            {showCommentForm[post.post_id] && (
                                <CommentForm 
                                    postId={post.post_id} 
                                    onClose={() => handleToggleCommentForm(post.post_id)} 
                                    onCommentAdded={handlePostAdded}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {showAddPostForm && (
                <AddPostForm onClose={handleCloseAddPostForm} onPostAdded={handlePostAdded} />
            )}

            {postToDelete && (
                <div className="confirmation-popup">
                    <div className="popup-content">
                        <h2>Tem certeza que deseja excluir este post?</h2>
                        <button onClick={() => handleDeletePost(postToDelete)}>Sim</button>
                        <button onClick={handleCancelDelete}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

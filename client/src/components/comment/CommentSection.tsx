import axios from 'axios';
import { useState, useEffect } from 'react'

interface Comment {
    id: number;
    commentCol: string;
    User: {name: string};
}

interface CommentSectionProps {
    id_post: number;
    initialComments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({id_post, initialComments}) => {
    const [comments, setComments] = useState<Comment[]>(initialComments);

    useEffect(() => {
        const fetchComments = async () => {
            try{
                const token = sessionStorage.getItem('token');
                const response = await axios.get(`http://localhost:4200/comments/${id_post}`, {
                    headers: {'Authorization': `Bearer ${token}`}
                });
                console.log(response.data);
                setComments(response.data);
            }catch(error) {
                console.log("Error ", error);
            }
        };
        fetchComments();
    }, [id_post]);

    return (
        <div>
            <form>
                <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        <p>{comment.commentCol}</p> 
                        <small>By: {comment.User ? comment.User.name : "Unknown"}</small>
                    </li>
                ))}
                </ul>
            </form>
        </div>
    )
}

export default CommentSection
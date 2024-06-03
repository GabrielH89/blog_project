import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
    comments: string[];
    likes: number;
    ratings: number[];
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4200/posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.msg && Array.isArray(response.data.msg)) {
                    setPosts(response.data.msg);
                } else {
                    setError("Unexpected response format");
                }
            } catch (error) {
                setError("Error fetching posts");
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

  
    return (
        <div className="home-container">
            <h1>Page posts</h1>
        </div>
    );
}

export default Home;

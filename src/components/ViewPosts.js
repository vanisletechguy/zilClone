import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewPosts() {
    const [posts, setPosts] = useState([]);
    /*
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/viewPosts', {
                    params: { userId: localStorage.getItem('userId') }  // Assuming you're storing the userId in localStorage
                });
                setPosts(response.data);
            } catch (error) {
                alert('Failed to retrieve posts: ' + error.message);
            }
        };
        fetchPosts();
    }, []);
    */
    return (
        <div>
            <h2>View Posts</h2>
        </div>
    );
}

export default ViewPosts;

/*
    return (
        <div>
            <h2>View Posts</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.listing_id}>
                        {post.address} - ${post.price} - {post.propertyType}
                    </li>
                ))}
            </ul>
        </div>
    );
    */

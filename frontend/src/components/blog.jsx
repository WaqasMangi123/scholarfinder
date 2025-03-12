import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/blog');
                setBlogs(response.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="blog-page">
            {/* Background Video */}
            <video autoPlay loop muted playsInline className="background-video">
                <source src="/blog.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="content">
                <h1 className="blog-title">Blog And Events</h1>
                {blogs.map((blog, index) => (
                    <div key={index} className="blog-content">
                        <div className="text-section">
                            <h2>{blog.title}</h2>
                            <p>{blog.content}</p>
                            {blog.url && (
                                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-link">
                                    Read More
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;

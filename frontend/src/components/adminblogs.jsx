import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminblog.css';

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/blog');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    const blogData = { title, content, url };

    try {
      await axios.post('http://localhost:3001/api/blog', blogData);
      setSuccessMessage('Blog post added successfully!');
      setErrorMessage('');
      setTitle('');
      setContent('');
      setUrl('');
      fetchBlogs(); // Refresh blog list after adding
    } catch (error) {
      setErrorMessage('Failed to add blog post. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/blog/${id}`);
      setSuccessMessage('Blog post deleted successfully');
      setErrorMessage('');
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from state
    } catch (error) {
      setErrorMessage('Failed to delete blog post.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="admin-blog-page">
      <h2>Add a New Blog Post</h2>
      <form onSubmit={handleBlogSubmit} className="admin-blog-form">
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>

        <label>
          URL:
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>

        <button type="submit">Add Blog Post</button>
      </form>

      <h2>Existing Blog Posts</h2>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-link">
              Read More
            </a>
            <button onClick={() => handleDelete(blog._id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = ({ onEdit }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/blogs';

    const fetchBlogs = useCallback(async () => {
        try {
            setError('');
            const res = await axios.get(API_URL);
            setBlogs(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching blogs:', err);
            setError('Could not load blogs. Check that the backend server is running.');
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBlogs();
    }, [fetchBlogs]);

    const getExcerpt = (content = '') => {
        if (content.length <= 180) return content;
        return `${content.slice(0, 180).trim()}...`;
    };

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchBlogs();
            } catch (err) {
                console.error('Error deleting blog:', err);
            }
        }
    };

    if (loading) {
        return (
            <section className="blog-list">
                <div className="page-heading">
                    <p className="eyebrow">Library</p>
                    <h2>All Blogs</h2>
                </div>
                <div className="state-card">Loading blogs...</div>
            </section>
        );
    }

    return (
        <section className="blog-list">
            <div className="page-heading">
                <p className="eyebrow">Library</p>
                <h2>All Blogs</h2>
                <p className="section-copy">
                    Review, edit, and manage stories from a focused writing dashboard.
                </p>
            </div>
            {error ? (
                <div className="state-card error-state">{error}</div>
            ) : blogs.length === 0 ? (
                <div className="state-card">
                    <strong>No blogs yet</strong>
                    <span>Add your first post to start building the archive.</span>
                </div>
            ) : (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <article className="blog-card" key={blog._id}>
                            <div className="blog-card-body">
                                <p className="author-pill">By {blog.author}</p>
                                <h3>{blog.title}</h3>
                                <p className="blog-excerpt">{getExcerpt(blog.content)}</p>
                            </div>
                            <div className="card-actions">
                                <button onClick={() => onEdit(blog)}>Edit</button>
                                <button className="btn-delete" onClick={() => deleteBlog(blog._id)}>Delete</button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default BlogList;

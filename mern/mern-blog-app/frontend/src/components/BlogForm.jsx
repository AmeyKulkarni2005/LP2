import { useState } from 'react';
import axios from 'axios';

const emptyBlog = { title: '', author: '', content: '' };

const BlogForm = ({ currentBlog, onSave }) => {
    const [blog, setBlog] = useState(currentBlog || emptyBlog);
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/blogs';

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentBlog) {
                await axios.put(`${API_URL}/${currentBlog._id}`, blog);
            } else {
                await axios.post(API_URL, blog);
            }
            onSave();
        } catch (err) {
            console.error('Error saving blog:', err);
            alert('Error saving blog: ' + err.message);
        }
    };

    return (
        <section className="blog-form">
            <div className="page-heading">
                <p className="eyebrow">{currentBlog ? 'Revise draft' : 'New story'}</p>
                <h2>{currentBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
                <p className="section-copy">
                    Keep the title sharp, credit the author, and write the post body below.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        placeholder="A practical guide to..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        id="author"
                        type="text"
                        name="author"
                        value={blog.author}
                        onChange={handleChange}
                        placeholder="Author name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        placeholder="Write the complete blog post here..."
                        required
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">{currentBlog ? 'Update Blog' : 'Publish Blog'}</button>
                    <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
                </div>
            </form>
        </section>
    );
};

export default BlogForm;

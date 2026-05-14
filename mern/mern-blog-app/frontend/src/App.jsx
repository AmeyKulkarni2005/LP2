import { useState } from 'react';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import './App.css';

function App() {
    const [view, setView] = useState('list');
    const [currentBlog, setCurrentBlog] = useState(null);

    const handleEdit = (blog) => {
        setCurrentBlog(blog);
        setView('add');
    };

    const handleSave = () => {
        setCurrentBlog(null);
        setView('list');
    };

    return (
        <div className="App">
            <Navbar
                activeView={view}
                setView={(v) => { setView(v); setCurrentBlog(null); }}
            />
            <main className="container">
                {view === 'list' ? (
                    <BlogList onEdit={handleEdit} />
                ) : (
                    <BlogForm currentBlog={currentBlog} onSave={handleSave} />
                )}
            </main>
        </div>
    );
}

export default App;

const Navbar = ({ activeView, setView }) => {
    return (
        <nav className="navbar">
            <button className="brand" onClick={() => setView('list')} aria-label="Show blogs">
                <span className="brand-mark">B</span>
                <span>
                    <span className="brand-title">InkDesk</span>
                    <span className="brand-subtitle">Writing workspace</span>
                </span>
            </button>
            <div className="nav-links">
                <button
                    className={activeView === 'list' ? 'active' : ''}
                    onClick={() => setView('list')}
                >
                    View Blogs
                </button>
                <button
                    className={activeView === 'add' ? 'active' : ''}
                    onClick={() => setView('add')}
                >
                    Add Blog
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

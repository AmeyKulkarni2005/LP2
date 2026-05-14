const Navbar = ({ activeView, setView }) => {
    return (
        <nav className="navbar">
            <button className="brand" onClick={() => setView('list')} aria-label="Show tasks">
                <span className="brand-mark">T</span>
                <span>
                    <span className="brand-title">Taskflow</span>
                    <span className="brand-subtitle">Work tracker</span>
                </span>
            </button>
            <div className="nav-links">
                <button className={activeView === 'list' ? 'active' : ''} onClick={() => setView('list')}>
                    Tasks
                </button>
                <button className={activeView === 'add' ? 'active' : ''} onClick={() => setView('add')}>
                    New Task
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

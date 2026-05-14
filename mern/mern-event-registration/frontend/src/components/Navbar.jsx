const Navbar = ({ activeView, setView }) => {
    return (
        <nav className="navbar">
            <button className="brand" onClick={() => setView('list')} aria-label="Show events">
                <span className="brand-mark">E</span>
                <span>
                    <span className="brand-title">EventDesk</span>
                    <span className="brand-subtitle">Program registry</span>
                </span>
            </button>
            <div className="nav-links">
                <button className={activeView === 'list' ? 'active' : ''} onClick={() => setView('list')}>
                    Events
                </button>
                <button className={activeView === 'add' ? 'active' : ''} onClick={() => setView('add')}>
                    Register
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

const Navbar = ({ activeView, setView }) => {
    return (
        <nav className="navbar">
            <button className="brand" onClick={() => setView('list')} aria-label="Show students">
                <span className="brand-mark">C</span>
                <span>
                    <span className="brand-title">CampusLedger</span>
                    <span className="brand-subtitle">Student records</span>
                </span>
            </button>
            <div className="nav-links">
                <button className={activeView === 'list' ? 'active' : ''} onClick={() => setView('list')}>
                    Students
                </button>
                <button className={activeView === 'add' ? 'active' : ''} onClick={() => setView('add')}>
                    Add Student
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

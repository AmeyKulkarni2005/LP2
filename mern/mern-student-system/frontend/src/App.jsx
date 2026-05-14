import { useState } from 'react';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './App.css';

function App() {
    const [view, setView] = useState('list');
    const [currentStudent, setCurrentStudent] = useState(null);

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setView('add');
    };

    const handleSave = () => {
        setCurrentStudent(null);
        setView('list');
    };

    return (
        <div className="App">
            <Navbar
                activeView={view}
                setView={(v) => { setView(v); setCurrentStudent(null); }}
            />
            <main className="container">
                {view === 'list' ? (
                    <StudentList onEdit={handleEdit} />
                ) : (
                    <StudentForm currentStudent={currentStudent} onSave={handleSave} />
                )}
            </main>
        </div>
    );
}

export default App;

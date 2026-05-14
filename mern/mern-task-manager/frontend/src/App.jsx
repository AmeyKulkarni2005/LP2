import { useState } from 'react';
import Navbar from './components/Navbar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
    const [view, setView] = useState('list');
    const [currentTask, setCurrentTask] = useState(null);

    const handleEdit = (task) => {
        setCurrentTask(task);
        setView('add');
    };

    const handleSave = () => {
        setCurrentTask(null);
        setView('list');
    };

    return (
        <div className="App">
            <Navbar
                activeView={view}
                setView={(v) => { setView(v); setCurrentTask(null); }}
            />
            <main className="container">
                {view === 'list' ? (
                    <TaskList onEdit={handleEdit} />
                ) : (
                    <TaskForm currentTask={currentTask} onSave={handleSave} />
                )}
            </main>
        </div>
    );
}

export default App;

import { useState } from 'react';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import './App.css';

function App() {
    const [view, setView] = useState('list');
    const [currentEvent, setCurrentEvent] = useState(null);

    const handleEdit = (event) => {
        setCurrentEvent(event);
        setView('add');
    };

    const handleSave = () => {
        setCurrentEvent(null);
        setView('list');
    };

    return (
        <div className="App">
            <Navbar
                activeView={view}
                setView={(v) => { setView(v); setCurrentEvent(null); }}
            />
            <main className="container">
                {view === 'list' ? (
                    <EventList onEdit={handleEdit} />
                ) : (
                    <EventForm currentEvent={currentEvent} onSave={handleSave} />
                )}
            </main>
        </div>
    );
}

export default App;

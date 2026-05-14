import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const EventList = ({ onEdit }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/events';

    const fetchEvents = useCallback(async () => {
        try {
            setError('');
            const res = await axios.get(API_URL);
            setEvents(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Could not load events. Check that the backend server is running.');
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEvents();
    }, [fetchEvents]);

    const deleteEvent = async (id) => {
        if (window.confirm('Delete this event record?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchEvents();
            } catch (err) {
                console.error('Error deleting event:', err);
            }
        }
    };

    if (loading) {
        return (
            <section className="data-view">
                <div className="page-heading">
                    <p className="eyebrow">Schedule</p>
                    <h2>Registered Events</h2>
                </div>
                <div className="state-card">Loading events...</div>
            </section>
        );
    }

    return (
        <section className="data-view">
            <div className="page-heading">
                <p className="eyebrow">Schedule</p>
                <h2>Registered Events</h2>
                <p className="section-copy">Coordinate upcoming programs with clear ownership, dates, and locations.</p>
            </div>
            {error ? (
                <div className="state-card error-state">{error}</div>
            ) : events.length === 0 ? (
                <div className="state-card">
                    <strong>No events yet</strong>
                    <span>Register the first event to start the schedule.</span>
                </div>
            ) : (
                <div className="table-shell">
                    <table>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Organizer</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event._id}>
                                    <td className="strong-cell">{event.name}</td>
                                    <td>{event.organizer}</td>
                                    <td><span className="pill">{event.date}</span></td>
                                    <td>{event.location}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => onEdit(event)}>Edit</button>
                                        <button className="btn-delete" onClick={() => deleteEvent(event._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default EventList;

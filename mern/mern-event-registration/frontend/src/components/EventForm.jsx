import { useState } from 'react';
import axios from 'axios';

const emptyEvent = { name: '', organizer: '', date: '', location: '', description: '' };

const EventForm = ({ currentEvent, onSave }) => {
    const [event, setEvent] = useState(currentEvent || emptyEvent);
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/events';

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEvent) {
                await axios.put(`${API_URL}/${currentEvent._id}`, event);
            } else {
                await axios.post(API_URL, event);
            }
            onSave();
        } catch (err) {
            console.error('Error saving event:', err);
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <section className="form-view">
            <div className="page-heading">
                <p className="eyebrow">{currentEvent ? 'Event update' : 'New program'}</p>
                <h2>{currentEvent ? 'Edit Event' : 'Register Event'}</h2>
                <p className="section-copy">Capture the essential details before the event enters the schedule.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Event Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={event.name}
                        onChange={handleChange}
                        placeholder="Developer meetup"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer</label>
                    <input
                        id="organizer"
                        type="text"
                        name="organizer"
                        value={event.organizer}
                        onChange={handleChange}
                        placeholder="Computer department"
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Event Date</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={event.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            value={event.location}
                            onChange={handleChange}
                            placeholder="Auditorium"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={event.description}
                        onChange={handleChange}
                        placeholder="Brief event summary..."
                        required
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">{currentEvent ? 'Update Event' : 'Register Event'}</button>
                    <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
                </div>
            </form>
        </section>
    );
};

export default EventForm;

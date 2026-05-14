import { useState } from 'react';
import axios from 'axios';

const emptyTask = { title: '', description: '', priority: 'Medium', status: 'Pending' };

const TaskForm = ({ currentTask, onSave }) => {
    const [task, setTask] = useState(currentTask || emptyTask);
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/tasks';

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentTask) {
                await axios.put(`${API_URL}/${currentTask._id}`, task);
            } else {
                await axios.post(API_URL, task);
            }
            onSave();
        } catch (err) {
            console.error('Error saving task:', err);
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <section className="form-view">
            <div className="page-heading">
                <p className="eyebrow">{currentTask ? 'Task update' : 'New task'}</p>
                <h2>{currentTask ? 'Edit Task' : 'Create Task'}</h2>
                <p className="section-copy">Define the work clearly so the board stays easy to scan.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Task Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        placeholder="Prepare sprint notes"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" name="priority" value={task.priority} onChange={handleChange}>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="What needs to happen?"
                        required
                    ></textarea>
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">{currentTask ? 'Update Task' : 'Save Task'}</button>
                    <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
                </div>
            </form>
        </section>
    );
};

export default TaskForm;

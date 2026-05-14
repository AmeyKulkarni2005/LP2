import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/tasks';

    const fetchTasks = useCallback(async () => {
        try {
            setError('');
            const res = await axios.get(API_URL);
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError('Could not load tasks. Check that the backend server is running.');
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTasks();
    }, [fetchTasks]);

    const toggleStatus = async (task) => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        try {
            await axios.put(`${API_URL}/${task._id}`, { status: newStatus });
            fetchTasks();
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const deleteTask = async (id) => {
        if (window.confirm('Delete this task?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchTasks();
            } catch (err) {
                console.error('Error deleting task:', err);
            }
        }
    };

    if (loading) {
        return (
            <section className="data-view">
                <div className="page-heading">
                    <p className="eyebrow">Queue</p>
                    <h2>Task Board</h2>
                </div>
                <div className="state-card">Loading tasks...</div>
            </section>
        );
    }

    return (
        <section className="data-view">
            <div className="page-heading">
                <p className="eyebrow">Queue</p>
                <h2>Task Board</h2>
                <p className="section-copy">Prioritize work, mark completion, and keep small tasks from disappearing.</p>
            </div>
            {error ? (
                <div className="state-card error-state">{error}</div>
            ) : tasks.length === 0 ? (
                <div className="state-card">
                    <strong>No tasks yet</strong>
                    <span>Create the first task to start the board.</span>
                </div>
            ) : (
                <div className="task-grid">
                    {tasks.map((task) => (
                        <article key={task._id} className={`task-card ${task.status === 'Completed' ? 'task-done' : ''}`}>
                            <div className="task-card-top">
                                <label className="check-row">
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'Completed'}
                                        onChange={() => toggleStatus(task)}
                                    />
                                    <span>{task.status}</span>
                                </label>
                                <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                            </div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <div className="card-actions">
                                <button onClick={() => onEdit(task)}>Edit</button>
                                <button className="btn-delete" onClick={() => deleteTask(task._id)}>Delete</button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TaskList;

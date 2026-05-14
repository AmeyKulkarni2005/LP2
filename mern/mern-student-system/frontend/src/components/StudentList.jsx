import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const StudentList = ({ onEdit }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/students';

    const fetchStudents = useCallback(async () => {
        try {
            setError('');
            const res = await axios.get(API_URL);
            setStudents(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('Could not load student records. Check that the backend server is running.');
            setLoading(false);
        }
    }, [API_URL]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchStudents();
    }, [fetchStudents]);

    const deleteStudent = async (id) => {
        if (window.confirm('Delete this record?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchStudents();
            } catch (err) {
                console.error('Error deleting student:', err);
            }
        }
    };

    if (loading) {
        return (
            <section className="data-view">
                <div className="page-heading">
                    <p className="eyebrow">Registry</p>
                    <h2>Student Records</h2>
                </div>
                <div className="state-card">Loading records...</div>
            </section>
        );
    }

    return (
        <section className="data-view">
            <div className="page-heading">
                <p className="eyebrow">Registry</p>
                <h2>Student Records</h2>
                <p className="section-copy">Maintain roll numbers, departments, and contact details in one readable register.</p>
            </div>
            {error ? (
                <div className="state-card error-state">{error}</div>
            ) : students.length === 0 ? (
                <div className="state-card">
                    <strong>No students yet</strong>
                    <span>Add the first student record to start the register.</span>
                </div>
            ) : (
                <div className="table-shell">
                    <table>
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td><span className="pill">{student.rollNumber}</span></td>
                                    <td className="strong-cell">{student.name}</td>
                                    <td>{student.department}</td>
                                    <td>{student.email}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => onEdit(student)}>Edit</button>
                                        <button className="btn-delete" onClick={() => deleteStudent(student._id)}>Delete</button>
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

export default StudentList;

import { useState } from 'react';
import axios from 'axios';

const emptyStudent = { name: '', rollNumber: '', department: '', email: '' };

const StudentForm = ({ currentStudent, onSave }) => {
    const [student, setStudent] = useState(currentStudent || emptyStudent);
    const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api/students';

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentStudent) {
                await axios.put(`${API_URL}/${currentStudent._id}`, student);
            } else {
                await axios.post(API_URL, student);
            }
            onSave();
        } catch (err) {
            console.error('Error saving student:', err);
            alert('Error: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <section className="form-view">
            <div className="page-heading">
                <p className="eyebrow">{currentStudent ? 'Record update' : 'New record'}</p>
                <h2>{currentStudent ? 'Edit Student' : 'Add Student'}</h2>
                <p className="section-copy">Keep the campus register accurate with clean student details.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="rollNumber">Roll Number</label>
                        <input
                            id="rollNumber"
                            type="text"
                            name="rollNumber"
                            value={student.rollNumber}
                            onChange={handleChange}
                            placeholder="CS-42"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            placeholder="Student name"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                        id="department"
                        type="text"
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                        placeholder="Computer Engineering"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary">{currentStudent ? 'Update Record' : 'Save Record'}</button>
                    <button type="button" className="btn-cancel" onClick={onSave}>Cancel</button>
                </div>
            </form>
        </section>
    );
};

export default StudentForm;

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Event name is required'],
        trim: true
    },
    organizer: {
        type: String,
        required: [true, 'Organizer name is required'],
        trim: true
    },
    date: {
        type: String,
        required: [true, 'Event date is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
 
const mongoose=require('mongoose');

const eventSchema= new mongoose.Schema({
    event_name: {
        type: String,
        trim: true,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    event_category: {
        type: String,
        required: true
    },
    bannerUrl: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }

},{timestamps: true})

module.exports=mongoose.model('Events',eventSchema)
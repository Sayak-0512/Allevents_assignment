const mongoose=require('mongoose');

mongoose.connect(process.env.MONGOURL || 'mongodb://localhost:27017/alleventsDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Database is connected"))
.catch(err => console.log("Err occured: ", err));
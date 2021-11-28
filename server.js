const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config(); // to use environment variables
require('./db/connectDB');
const app=express();
const port=process.env.PORT || 3001;

//import routes
const authRoutes=require('./routes/auth');
const eventsRoutes=require('./routes/home');

app.use(express.json());
app.use(cors())

//middlewares
app.use('/api',authRoutes);
app.use('/eventsapi',eventsRoutes)
if(process.env.NODE_ENV==='production')
{
    app.use(express.static('frontend/my-app/build'))
}
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})
const Events=require('../models/events')
const jwt=require('jsonwebtoken');
exports.addevent=(req,res) => {
    console.log(req.body);
    let userId="";
    jwt.verify(req.body.token, process.env.JWT_SIGNIN_KEY, function(err, decoded) {
            if(decoded){
               userId= decoded._id
            }
           
        }
      );
    const {event_name,date,start_time,end_time,location,description,event_category,bannerUrl}=req.body.eventObj;

    Events.create({
        event_name,
        date,
        start_time,
        end_time,
        location,
        description,
        event_category,
        bannerUrl,
        userId
    },function (err, data){
        if(err)
        res.status(400).json({
            message: "Something went wrong"
        })
        else if(data){
            res.status(200).json({
                message: "Data saved successfully"
            })  
        }
    })
}

exports.getlistofevents=(req,res)=>{
    const {event_category,location,date}=req.query;
    let queryObj={};
    if(event_category && event_category!=='All Events')
    queryObj.event_category=event_category;
    if(location)
    queryObj.location=location;
    if(date)
    queryObj.date=date;
    Events.find(queryObj,(err,data)=>{
        if (!err) { 
            res.status(200).json({
                eventList: data 
            })
        }
        else {
            throw err;
        }
    })
}
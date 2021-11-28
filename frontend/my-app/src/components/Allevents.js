import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Eachevent from './Eachevent';
import axios from 'axios';
function Allevents({eventsArray,seteventsArray}) {
    const URL_DOMAIN=process.env.NODE_ENV==='production'?'https://all-events-assignment.herokuapp.com/':'http://localhost:3001/';
    useEffect(() => {
        axios.get(URL_DOMAIN+'eventsapi/getlistofevents').then(res => {
        seteventsArray(res.data.eventList)
      }).catch(err => {
        console.log(err);
      })
    }, [])
    return (
        <div style={{marginTop: "30px"}}>
            {eventsArray.length===0 ? 
            <h1>No events to show</h1> :
            <Grid container spacing={3}>
                {
                    eventsArray.map((event,index) => 
                    <Grid item xs={12} md={3} key={index}>
                        <Eachevent 
                        event_name={event.event_name} 
                        description={event.description}
                        date={event.date}
                        start_time={event.start_time}
                        end_time={event.end_time}
                        location={event.location}
                        event_category={event.event_category}
                        bannerUrl={event.bannerUrl}
                        />
                    </Grid>
                    )  
                }      
            </Grid>
            }
           
        </div>
    )
}

export default Allevents

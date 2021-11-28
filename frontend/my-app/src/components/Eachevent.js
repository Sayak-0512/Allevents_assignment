import React from 'react'
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { makeStyles} from '@mui/styles';
import Divider from '@mui/material/Divider';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({
    event: {
      letterSpacing: '.2px',
      fontSize: '18px',
      fontWeight: 700,
      minHeight: '50px',
    },
    detailheadergrid: {
      color: '#757575',
      fontWeight: 400,
      marginRight: '4px',
    },
    detailinfogrid: {
      color: '#212121',
      fontWeight: 600,
      fontSize: '14px',
    },
    description: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,
        padding: '20px 0 0 0',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    detail: {
      marginBottom: '10px',
    },
    plusone: {
      display: 'inline-block',
      color: '#fa7328',
      fontWeight: 600,
    },
    tagsection: {
      marginBottom: '27px',
      height: '40px',
    },
    imageWrapper: {
      position: 'relative',
      height: '180px',
      backgroundImage: 'linear-gradient(-180deg,rgba(3,3,3,0),#454545)',
      width: '100%',
    },
    eventStatus: {
      backgroundColor: '#fff',
      color: 'black',
      padding: '7px 13px',
      borderRadius: '2px',
      boxShadow: '0 1px 11px 0 rgb(0 0 0 / 11%)',
      position: 'absolute',
      bottom: '7px',
      right: '7px',
      fontSize: '12px',
      display: 'flex',
    },
  });
function Eachevent({event_name,description,date,start_time,end_time,location,event_category,bannerUrl}) {
    const classes = useStyles();
    return (
        <div>
                <Card style={{height: "500px"}}>
                <CardActionArea>
                    <CardMedia className={classes.imageWrapper}>
                    <img
                        height="180"
                        width="100%"
                        src={bannerUrl}
                        alt={event_name}
                    />
                    </CardMedia>
                    <CardContent>
                    <Typography variant="p" component="h2" className={classes.event}>
                        {event_name}
                    </Typography>
                    <Grid container alignItems="baseline" className={classes.detail}>
                        <Grid item container direction="row" xs={4}>
                        <Grid item xs={12} className={classes.detailheadergrid}>
                            Date
                        </Grid>
                        <Grid item xs={12} className={classes.detailinfogrid}>
                            {date}
                        </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4}>
                        <Grid item xs={12} className={classes.detailheadergrid}>
                            Category
                        </Grid>
                        <Grid item xs={12} className={classes.detailinfogrid}>
                            {event_category}
                        </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={4}>
                        <Grid item xs={12} className={classes.detailheadergrid}>
                            Venue
                        </Grid>
                        <Grid item xs={12} className={classes.detailinfogrid}>
                            {location}
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="baseline" className={classes.detail}>
                        <Grid item container direction="row" xs={4}>
                        <Grid item xs={12} className={classes.detailheadergrid}>
                            Starts at
                        </Grid>
                        <Grid item xs={12} className={classes.detailinfogrid}>
                            {start_time}
                        </Grid>
                        </Grid>
                        <Grid item container direction="row" xs={8}>
                        <Grid item xs={12} className={classes.detailheadergrid}>
                            Ends at
                        </Grid>
                        <Grid item xs={12} className={classes.detailinfogrid}>
                            {end_time}
                        </Grid>
                        </Grid>
                    </Grid>

                    <Divider light />
                    <Grid container direction="column">
                        <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.description}
                        >
                            {description}
                        </Typography>
                        </Grid>
                    </Grid>
                    </CardContent>
                </CardActionArea>
                </Card>
        </div>
    )
}

export default Eachevent

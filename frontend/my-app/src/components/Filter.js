import React,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios"
function Filter({seteventsArray}) {
    const [citiesList, setcitiesList] = React.useState(() => new Set())
    useEffect(() => {
        axios.get('http://localhost:3001/eventsapi/getlistofevents').then(res => {
        res.data.eventList.map(event => 
            setcitiesList(prev => new Set(prev).add(event.location))
        )
      }).catch(err => {
        console.log(err);
      })
    }, [])
    let categories=['All Events','Business events','Sports events','Parties','Festivals','Art events','Dance Events','Exhibitions','Workshops','Cooking Events','Comedy Events','Craft Events','Yoga Events']
    const [categorySearch, setCategorySearch] = React.useState("");

    const handleChangeCategory=(event)=>{
        setCategorySearch(event.target.value);
      }
    const [citySearch, setCitySearch] = React.useState("");
    const handleChangeCity=(event)=>{
        setCitySearch(event.target.value);
    }
    const [dateSearch, setdateSearch] = React.useState("")
    const handleFilterByDate=() =>{
        console.log(dateSearch);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/eventsapi/getlistofevents',{
            params: {
                event_category: categorySearch,
                location: citySearch,
                date: dateSearch
            }
        }).then(res => {
            seteventsArray(res.data.eventList)
        }).catch(err => {
            console.log(err);
        })
        
    }, [dateSearch, citySearch, categorySearch])
  
    return (
        <div style={{margin:"30px",marginTop: "100px"}}>
            <Grid container spacing={1}>
                <Grid item container md={6} xs={12} spacing={2} justifyContent="flex-start" alignItems="center">
                    <Grid item xs={11} md={6}>
                        <TextField
                            onChange={(event)=> setdateSearch(event.target.value)}
                            value={dateSearch}
                            id="date-search"
                            name="date-search"
                            type="date"
                            sx={{m: 1}}
                            helperText="Search by event date"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <SearchIcon fontSize="large" sx={{color: "#1976d2", cursor: "pointer"}} onClick={handleFilterByDate}/>
                    </Grid>  
                </Grid>
                <Grid item container md={6} xs={12} spacing={2} justifyContent="flex-end">
                    <Grid item xs={6}>
                        <TextField
                        onChange={(event)=>{
                            handleChangeCategory(event);
                        }}
                        id="event_category_search"
                        select
                        label="Category"
                        name="event_category_search"
                        value={categorySearch}
                        sx={{m: 1}}
                        helperText="Search by event category"
                        fullWidth
                    >
                        {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        onChange={(event)=>{
                            handleChangeCity(event);
                        }}
                        id="event_city_search"
                        select
                        label="City"
                        name="event_category_city"
                        value={citySearch}
                        sx={{m: 1}}
                        helperText="Search by event city"
                        fullWidth
                    >
                        {Array.from(citiesList).map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Filter

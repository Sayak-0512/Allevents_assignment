import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Allevents from "./Allevents"
import Filter from "./Filter"
import axios from 'axios';

const Home = ({profileName, profileUrl}) => {
  const URL_DOMAIN=process.env.NODE_ENV==='production'?'https://all-events-assignment.herokuapp.com/':'http://localhost:3001/';
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setOpen(true);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const [category, setCategory] = React.useState("");
  const handleChangeCategory=(event)=>{
    setCategory(event.target.value);
  }
  let categories=['Business events','Sports events','Parties','Festivals','Art events','Dance Events','Exhibitions','Workshops','Cooking Events','Comedy Events','Craft Events','Yoga Events']
  const [eventObj, seteventObj] = React.useState({
    event_name: "",
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    description: "",
    event_category: "",
    bannerUrl: ""
  });

  const [eventsArray, seteventsArray] = React.useState([]);

const handleUpload=(event) => {
  event.preventDefault();
  var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  var flag=0;
  for (var key of Object.keys(eventObj)) {
    if(key==="bannerUrl"){
      if (!regexp.test(eventObj[key]))
      {
        flag=1;break;
      }
    }
    if(!eventObj[key])
    {
      flag=1;break;
    }
 }
 if(flag===0)
 {
   axios({
    method: "POST",
    url: URL_DOMAIN+"eventsapi/addevent",
    data: {eventObj: eventObj, token: localStorage.getItem("_allevents_token")}
  }).then(response => {
    console.log(response);
  })
 }
 window.location.reload();
}
const handleChangeInput=(event) => {
  seteventObj({...eventObj,[event.target.name]: event.target.value});
}

const handleLogoutClick=() => {
  setAnchorElNav(null);
  localStorage.removeItem("_allevents_token");
  window.location.reload();
}
  return (
    <div>
        <AppBar position="fixed">
          <Container maxWidth="xl">
              <Toolbar disableGutters>
              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
                  onClick={()=>{window.location.reload()}}
              >
                  <img src="https://allevents.in/img/ae-logo-website.png" alt="logo" width={200} height={48}/>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  >
                  <MenuIcon />
                  </IconButton>
                  <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                      display: { xs: 'block', md: 'none' },
                  }}
                  >
                      <MenuItem key="Add your event" onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Add your event</Typography>
                      </MenuItem>
                  </Menu>
              </Box>
              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
              
              <img src="https://allevents.in/img/ae-logo-website.png" alt="logo" width={200} height={48}/>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>   
                  <Button
                      key="Add your event"
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                      Add your event
                  </Button>   
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title={`Logged in as ${profileName}`}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={profileName} src={profileUrl} />
                  </IconButton>
                  </Tooltip>
                  <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  >
                      <MenuItem key="Logout" onClick={handleLogoutClick}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                  </Menu>
              </Box>
              </Toolbar>
          </Container>
        </AppBar>

        <div>
              <Filter seteventsArray={seteventsArray} />
        </div>
        <div style={{margin: "30px"}}>
          <Allevents eventsArray={eventsArray} seteventsArray={seteventsArray} />
        </div>
        

        <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
          <DialogTitle>Add your event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the required details.
            </DialogContentText>

            <form>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item md={6} xs={12}>
                  <TextField
                    onChange={(event)=>{
                      handleChangeInput(event)
                    }}
                    autoFocus
                    name="event_name"
                    id="event_name"
                    label="Enter event name"
                    type="text"
                    sx={{m: 1}}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    onChange={(event)=>{
                      handleChangeInput(event)
                    }}
                    id="date"
                    name="date"
                    type="date"
                    sx={{m: 1}}
                    helperText="Select event date"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    onChange={(event)=>{
                      handleChangeInput(event)
                    }}
                    id="start_time"
                    name="start_time"
                    type="time"
                    sx={{m: 1}}
                    helperText="Select event start time"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    onChange={(event)=>{
                      handleChangeInput(event)
                    }}
                                id="end_time"
                    name="end_time"
                    type="time"
                    sx={{m: 1}}
                    helperText="Select event end time"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    onChange={(event)=>{
                      handleChangeInput(event)
                    }}
                                id="location"
                    name="location"
                    label="Location"
                    type="location"
                    sx={{m: 1}}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    onChange={(event)=>{
                      handleChangeInput(event)
                    }} 
                    name="description"
                    id="description"
                    label="Description"
                    type="text"
                    sx={{m: 1}}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                  onChange={(event)=>{
                      handleChangeInput(event);
                      handleChangeCategory(event);
                    }}
                  id="event_category"
                  select
                  label="Category"
                  name="event_category"
                  value={category}
                  sx={{m: 1}}
                  helperText="Please select event category"
                  required
                  fullWidth
                  >
                    {categories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                  onChange={(event)=>{
                        handleChangeInput(event)
                      }}
                      id="bannerUrl"
                      name="bannerUrl"
                      label="Enter event banner url"
                      type="url"
                      sx={{m: 1}}
                      required
                      fullWidth
                    />
                </Grid>
              </Grid>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" onClick={handleUpload}>Upload</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
    </div>
  );
};
export default Home;

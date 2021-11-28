import React from 'react'
import GoogleLogin from 'react-google-login';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import axios from "axios"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import "./Login.css"
// google-client-id= 367170922771-sb5lb6r4d8tmsejf8v24gka1t8i88016.apps.googleusercontent.com
// google-client-secret= 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
function Login({setloggedIn,setprofileName,setprofileUrl}) {
    const URL_DOMAIN=process.env.NODE_ENV==='production'?'https://all-events-assignment.herokuapp.com/':'http://localhost:3001/';
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const responseFailureGoogle= (response) =>{
        console.log(response);
      }
      const responseSuccessGoogle= (response) =>{
        console.log(response);
        setprofileName(response.profileObj.name)
        setprofileUrl(response.profileObj.imageUrl)
        axios({
          method: "POST",
          url: URL_DOMAIN+"api/googlelogin",
          data: {tokenId: response.tokenId}
        }).then(response => {
          localStorage.setItem("_allevents_token", response.data.token);
          setloggedIn(true);
          console.log("Google login success",response);
        })
      }

     
    
    return (
        <div className="home">
              <AppBar position="fixed">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        
                    >
                        <img src="https://allevents.in/img/ae-logo-website.png" alt="logo" width={200} height={48}/>
                    </Typography>
                    </Toolbar>
                </Container>
              </AppBar>

              <Box component="span" sx={{p:2,height:500, width: isSmall?300:500}} className="wrapper-box">
                <Grid container spacing={4}  alignItems="center" justifyContent="center"  direction="column">
                    <Grid item xs={12}>
                      <div className="login-heading"> Welcome to AllEvents</div>
                    </Grid>
                    <Grid item xs={12}>
                    <img src="https://allevents.in/img/ae-logo-website.png" alt="logo" width={isSmall?200:400} height={isSmall?48:96}/>
                    </Grid>
                    <Grid item xs={12}>
                      <GoogleLogin
                        className="g-login" 
                        clientId="367170922771-sb5lb6r4d8tmsejf8v24gka1t8i88016.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseFailureGoogle}
                        cookiePolicy={'single_host_origin'}
                        />
                    </Grid>
                  </Grid>
              </Box>
             
        </div>
    )
}

export default Login

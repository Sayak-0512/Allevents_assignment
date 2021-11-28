import './App.css';
import axios from "axios"
import React, {useEffect, useState} from "react";
import Login from "./components/Login";
import Home from "./components/Home"
function App() {
  const [profileUrl, setprofileUrl]=useState("");
  const [profileName, setprofileName]=useState("");
  const [loggedIn, setloggedIn] = useState(false);
  
  useEffect(() => {
   const token=localStorage.getItem("_allevents_token");
   axios.post('http://localhost:3001/api/verifytoken', {
    token: token
    })
    .then(function (response) {
      if(response.status===200)
      setloggedIn(true);
      axios.get('http://localhost:3001/api/getpicture',{
        params: {
          id: response.data.response._id
        }
      }).then(res => {
        setprofileUrl(res.data.picture)
        setprofileName(res.data.name)
        // console.log(res);
      }).catch(err => {
        console.log(err);
      })
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  return (
    <div>
    {
      loggedIn? <Home profileName={profileName} profileUrl={profileUrl}/> : <Login setloggedIn={setloggedIn} setprofileName={setprofileName} setprofileUrl={setprofileUrl}/>
    }
    </div>
  );
}

export default App;

import logo from '../logo.svg';
import React, { useState } from 'react'
import liff from '@line/liff';

function Home() {

  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdtoken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const logout = () => {

  }

  initLine = () => {
    liff.init({ liffId: '1655250022-AVJylL18' }, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  runApp = () => {
    const idToken = liff.getIDToken();
    setIdtoken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  return (
    <div style={{textAlign: "center"}}>
      <h1>React with LINE Login</h1>
      <hr />
      <img src={pictureUrl} width="300px" height="300px"/>
      <p style={{textAlign: "left", marginLeft: "20%", marginRight: "20%" }}><b>id token: </b> { idToken }</p>
      <p style={{textAlign: "left", marginLeft: "20%", marginRight: "20%" }}><b>display name: </b> { displayName }</p>
      <p style={{textAlign: "left", marginLeft: "20%", marginRight: "20%" }}><b>status message: </b> { statusMessage }</p>
      <p style={{textAlign: "left", marginLeft: "20%", marginRight: "20%" }}><b>user id: </b> { userId }</p>
      <button onClick={() => logout()} style={{width: "100%", height: 30}}>Logout</button>
    </div>
  )
}

export default Home
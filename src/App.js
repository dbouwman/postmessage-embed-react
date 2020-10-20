import React, {useEffect, useState} from 'react';
import './App.css';
import {UserSession} from '@esri/arcgis-rest-auth';


function App() {
  const [session, setSession] = useState();

  useEffect(()=> {
    if (!session) {
      console.info(`Embed: Session does not exist. Requesting from parent... `);
      let params = new URLSearchParams(document.location.search.substring(1));
      const arcgisAuthOrigin = params.get('arcgis-auth-origin'); 
      if (arcgisAuthOrigin) {
        UserSession.fromParent(arcgisAuthOrigin)
        .then((session) => {
          console.info(`Embed: Got session from parent... `);
          setSession(session);
        })
        .catch((ex) => {
          console.log(`Embed: Exception: ${ex}`);
        })
      }
    } else {
      console.log(`Embed: Session exists`);
    }
  })

  if (session) {
    return ( 
      <div className="App">
        <header className="App-header">
          <h3>postmessage-embed-react</h3>
          <p>Username: {session.username}</p>
          <p>Portal: {session.portal}</p>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h3>postmessage-embed-react</h3>
          <p>Session not set</p>
        </header>
      </div>
    );
  }

  
}

export default App;

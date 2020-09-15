import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import InfoPanel from './Components/InfoPanel';
import FooterNav from './Components/FooterNav';
//import GoogleMaps from './Components/googleMaps';


function App() {

const screenConfig = useState(0);

  return (
    <div className="App">
      <Navbar />
      <InfoPanel currentScreen={ screenConfig[0]}/>
      <FooterNav  screenConfig={screenConfig}/>
    
    </div>
  );
}  

export default App;

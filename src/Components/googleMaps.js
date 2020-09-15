import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';


export default function Googlemap() {
    const [globaldata, setGlobaldata] = useState([]);
    
    useEffect(() => {
        async function fetchapi() {
            await fetch('https://disease.sh/v3/covid-19/countries')
            .then(res=>res.json())
            .then(result=> {
                console.log(result)
                setGlobaldata(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        fetchapi();
    })

    const countriesLocation = globaldata.map((data,ind)=>{
        return (
            <div 
                lat={data.countryInfo.lat}
                lng={data.countryInfo.long}
                style={{
                    color:'black',
                    backgroundColor:'#fff',
                    height:'25px',
                    width:'35px'
                }}
            >
                <img width="25px" src={data.countryInfo.flag} alt="flag"/>{data.cases}
            </div>
        )
    })    

    return (
     <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAhzwca7_2SwRWugyF7ZrWaWqQTziryZgE' }}
          defaultCenter={{lat: 30,lng: 70}}
          defaultZoom={5}
        >
        {countriesLocation} 
        </GoogleMapReact>
      </div>
    );
}

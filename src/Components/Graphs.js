import React, { useEffect,useState } from 'react';
import {Pie} from 'react-chartjs-2';

export default function Graph(){
    const [globaldata, setGlobaldata] = useState([]);
    useEffect(() => {
        async function fetchapi() {
            await fetch('https://disease.sh/v3/covid-19/all')
            .then(res=>res.json())
            .then(result=> {
                setGlobaldata(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        fetchapi();
    })
    
    const data = {
        labels: [
            'Cases',
            'Recovered',
            'Deaths'
        ],
        datasets: [{
            data: [globaldata.cases, globaldata.recovered, globaldata.deaths],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
    };


    return (
      <div style={{width:'100%'}}>
        <h2 style={{textAlign:'center',color:'#123faf'}}>Global Data</h2>
        <Pie data={data} />
      </div>
    );
  }

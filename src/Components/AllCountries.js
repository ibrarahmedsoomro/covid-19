import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      margin:  'auto',
      
    },
    table:{
        minWidth:650
    }
  }));


export default function Countries() {
    const classes = useStyles();
    const [globaldata, setGlobaldata] = useState([{}])
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        async function fetchapi() {
            const api = await fetch('https://disease.sh/v3/covid-19/countries')
            const data = await api.json()
            console.log(data)
            setGlobaldata(data)
            setLoading()
        }
        fetchapi()
    }, [globaldata])
    return (
        <TableContainer component={Paper}>
            {loading ? 
            <div className={classes.root}>
                <CircularProgress color="secondary" />
            </div> : 
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell component="th" scope="row">Country</TableCell>
                        <TableCell component="th" scope="row">Active</TableCell>
                        <TableCell component="th" scope="row">Deaths</TableCell>
                        <TableCell component="th" scope="row">Recovered</TableCell>
                        <TableCell component="th" scope="row">Case today</TableCell>
                        <TableCell component="th" scope="row">Death today</TableCell>
                        <TableCell component="th" scope="row">Recovered today</TableCell>   
                    </TableRow>
                </TableHead>
                <TableBody>
                
                    {globaldata.map((key, ind) => (
                        <TableRow key={ind}>
                            <TableCell><img width="25" src={key.countryInfo.flag} alt="flag"/> {key.country}</TableCell>
                            <TableCell>{key.active}</TableCell>
                            <TableCell>{key.deaths}</TableCell>
                            <TableCell>{key.recovered}</TableCell>
                            <TableCell>{key.todayCases}</TableCell>
                            <TableCell>{key.todayDeaths}</TableCell>
                            <TableCell>{key.todayRecovered}</TableCell>
                        </TableRow>
                    ))}
                    
                </TableBody>
            </Table>}
        </TableContainer>
    );
}

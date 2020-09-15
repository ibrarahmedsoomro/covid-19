import React,{useState,useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [search,setSearch] = useState('pakistan');
  const [countrydata,setCountrydata]=useState([])
  
  try {
    useEffect(()=>{
      async function fetchapi(){
       await fetch(`https://disease.sh/v3/covid-19/countries/${search}`)
      .then(response=>response.json())
      .then(result=>{
        setCountrydata(result)
      })
      }
      fetchapi() 
    })
  } catch (error) {
    console.log(error)
  }
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Covid-19 Tracker
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={e=>setSearch(e.target.value)}
            />
            
          </div>
        </Toolbar>
      </AppBar>
      
      <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="simple table">
         <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
             <TableCell>Active Cases</TableCell>
             <TableCell>Total Cases</TableCell>
             <TableCell>Deaths</TableCell>
             <TableCell>Recovered</TableCell>
             <TableCell>Case today</TableCell>
             <TableCell>Deaths today</TableCell>
             <TableCell>Recovered today</TableCell>
             <TableCell>Critical</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           
         <TableRow align="center">
             <TableCell>{countrydata.country}</TableCell>
             <TableCell>{countrydata.active}</TableCell>
             <TableCell>{countrydata.cases}</TableCell>
             <TableCell>{countrydata.deaths}</TableCell>
             <TableCell>{countrydata.recovered}</TableCell>
             <TableCell>{countrydata.todayCases}</TableCell>
             <TableCell>{countrydata.todayDeaths}</TableCell>
             <TableCell>{countrydata.todayRecovered}</TableCell>
            <TableCell>{countrydata.critical}</TableCell>
             </TableRow>
         </TableBody>
       </Table>
     </TableContainer>       
    </div>
  );
}

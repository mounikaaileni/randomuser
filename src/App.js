import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import { Grid, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import get from "lodash/get";
import { fetchUsers, setSelectedCountry } from './userReducer';

const useStyles = makeStyles(
  {
    root: {
      margin: 24,
    },
    userDetails: {
      paddingBottom: 10,
    },
    countrySelector: {
      paddingBottom: 16,
    },
    select: {
      minWidth: 150,
    }
  },
  { name: 'App' }
);

const App = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const { countries, countryUsers, selectedCountry } = useSelector(state => { 
    return state.user;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    selectedCountry && dispatch(fetchUsers(selectedCountry));
  }, [selectedCountry]);

  useEffect(() => {
    selectedCountry && countryUsers.length > 0 && setUsers(get(countryUsers.find(cu => cu.country === selectedCountry), 'users', []));
  }, [countryUsers]);

  return (
    <div className={classes.root}>
      <div className={classes.countrySelector}>
        <Typography variant="h6">Select Country</Typography>
        <Select
          variant="outlined"
          classes={{root: classes.select}}
          value={selectedCountry}
          onChange={(e) => dispatch(setSelectedCountry(e.target.value))}
        >
          {countries.map(country => (
          <MenuItem value={country}>{country}</MenuItem>
          ))}
        </Select>
        </div>
        {users.length > 0 && (
          <>
            <Typography variant="h6">User Details</Typography>
            {users.map(user => (
              <Grid container className={classes.userDetails}>
                <Grid item md={3}>{user.name}</Grid>
                <Grid item md={3}>{user.gender}</Grid>
                <Grid item md={3}>{user.email}</Grid>
              </Grid>
            ))}
          </>
        )}
    </div>
  );
}

export default App;

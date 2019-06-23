import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UserReg from './UserReg';
import ResturantReg from './ResturantReg';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function TabsWrappedLabel(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root} style={{height: '100%', width: '100%'}}>
        <Tabs style={{backgroundColor: '#1313139c'}} variant="fullWidth" centered value={value} onChange={handleChange}>
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="one" label="User Registration" />
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="two" label="Resturant Registration" />
        </Tabs>
        {/* {console.log(props)} */}
      {value === 'one' && <TabContainer><UserReg rout={props} /></TabContainer>}
      {value === 'two' && <TabContainer><ResturantReg rout={props}  /></TabContainer>}
    </div>
  );
}
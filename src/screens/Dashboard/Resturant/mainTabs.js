import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// import UserReg from './UserReg';
// import ResturantReg from './ResturantReg';
import Timeline from './Timeline';
import OnlineOrders from './OnlineOrders';
import AddPost from './AddPost';

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

export default function MainTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('two');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root} style={{height: '100%', width: '100%'}}>
        <Tabs style={{backgroundColor: '#1313139c'}} variant="fullWidth" centered value={value} onChange={handleChange}>
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="one" label="TimeLine" />
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="two" label="Add New Post" />
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="three" label="Check Orders" />
        </Tabs>
        {/* {console.log(props)} */}
      {value === 'one' && <TabContainer><Timeline rout={props} /></TabContainer>}
      {value === 'two' && <TabContainer><AddPost rout={props}  /></TabContainer>}
      {value === 'three' && <TabContainer><OnlineOrders rout={props}  /></TabContainer>}
    </div>
  );
}
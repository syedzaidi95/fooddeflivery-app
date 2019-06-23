import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PendingOrders from './PendindOrders';
import InProgressOrders from './InProcessOrders';
import DeliveredOrders from './DeliveredOrders';


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

export default function OrdersTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root} style={{height: '100%', width: '100%'}}>
        <Tabs style={{backgroundColor: '#1313139c'}} variant="fullWidth" centered value={value} onChange={handleChange}>
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="one" label="Pending" />
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="two" label="In Process" />
          <Tab style={{color: 'orange', fontSize: '15px', fontWeight: 'bolder'}} value="three" label="Delivered" />
        </Tabs>
        {/* {console.log(props)} */}
      {value === 'one' && <TabContainer><PendingOrders rout={props} /></TabContainer>}
      {value === 'two' && <TabContainer><InProgressOrders rout={props}  /></TabContainer>}
      {value === 'three' && <TabContainer><DeliveredOrders rout={props}  /></TabContainer>}
    </div>
  );
}
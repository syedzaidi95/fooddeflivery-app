import React, {Component} from "react";
import { BrowserRouter as Router, Route,
  // Link
} from "react-router-dom";
import Login from '../../screens/Login';
import TabsWrappedLabel from '../../screens/Registration/registrationTab';
import Homepage from '../../screens/homePage';
import { connect } from 'react-redux';
import ResturantDashboard from '../../screens/Dashboard/Resturant/ResturantDashboard'
import UserDashBoard from '../../screens/Dashboard/User/UserDashBoard'

class AppRouter extends Component {
constructor(){
  super();
  this.state = {
    user: null
  }
}
  static getDerivedStateFromProps(nextProps){
          return{user: nextProps.user}
  }

  dashboard(){
    if(this.state.user.accountType === 'resturant'){
      return(<Route path="/dashboard" component={ResturantDashboard} />)
    }else{
      return(<Route path="/dashboard" component={UserDashBoard} />)      
    }
    
  }
  render(){
    // console.log('state from Router ' ,this.state.user)
    return (
      <Router>
        <div>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={TabsWrappedLabel} />
          {this.state.user !== null && this.dashboard()}
        </div>
      </Router>
    );
  }
}
  const mapStateToProps = (state) => {
    return {
        user: state.reducer.user
    }
}
export default connect(mapStateToProps)(AppRouter)

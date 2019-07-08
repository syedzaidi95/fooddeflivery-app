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
// import ResturantPageVeiw from '../../screens/Dashboard/User/resturantPageVeiw';
// import CatogeryPage from '../../screens/Dashboard/User/catogeryPageVeiw'
import Resturant from '../../screens/Dashboard/User/ResturantPage'
import OrderStatuseTabs from '../../screens/Dashboard/Resturant/OrderStatuseTabs'

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
    if(this.state.user && this.state.user.accountType === 'resturant'){
      return(<Route path="/dashboard" component={ResturantDashboard} />)
    }else{
      return(<Route path="/dashboard" component={UserDashBoard} />)      
    }
  }

render(){
    return (
      <Router>
        <div>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={TabsWrappedLabel} />
          {/* <Route path="/resturantpage" component={ResturantPageVeiw} /> */}
          {/* <Route path="/catogerypage" component={CatogeryPage} /> */}
          <Route path="/resturantPage" component={Resturant} />
          <Route path="/OrderStatuseTabs" component={OrderStatuseTabs} />
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

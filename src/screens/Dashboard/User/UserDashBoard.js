import React, { Component } from 'react';
import UserHeader from '../../../components/Header'
import Footer from '../../../components/Footer'
import {connect} from 'react-redux'
import {removeUser} from '../../../Redux/actions/authAction'
import './UserDashBoard.css'
import Foods from './Foods'
import centerImage from '../../../Images/centerImage.png'
import Restaurants from './Resturants'

class UserDashBoard extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    render(){
        // console.log(this.props)
        return(
            <div style={{backgroundColor: 'white'}}>
            <header>
            <UserHeader props={this.props}  />
            </header>
            <br />
            <div>
                <Foods props={this.props} />
            </div>
            <div>
                <img src={centerImage} alt='centerImage' style={{width: '100%'}} />
            </div>
            <div>
                <Restaurants props={this.props} />
            </div>
            <Footer />
            </div>
    )
}
}



const mapStateToProps = (state) => {
    return {
        user: state.reducer.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeUser: () => dispatch(removeUser())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashBoard)

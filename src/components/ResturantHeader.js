import React, { Component } from 'react';
import logo from '../Images/logo.png'
import './Header.css';
import {removeUser } from '../Redux/actions/authAction'
import { connect } from 'react-redux'
// import firebase from '../config/firebae'

class ResturantHeader extends Component {
    logOut(){
        this.props.removeUser()
        this.props.props.history.push('/')
    }
    render() {
        return (
            <div>
            <div className='mainDivHeader'>
                <div>
                    <img alt='logo' src={logo} className='logoHeader' />
                </div>
                <div>
                 <button onClick={()=>{this.props.props.history.push('/OrderStatuseTabs')}} className="btn">
                        CHeck Orders
                 </button>
                    <button className="btn" 
                    onClick={()=>{this.logOut()}}
                    style={{
                        border: '2px dashed white',
                        color: '#748796',
                        borderRadius: 3
                    }}>
                        Log Out
                </button>
                </div>
            </div >
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



export default connect(mapStateToProps,mapDispatchToProps)(ResturantHeader)
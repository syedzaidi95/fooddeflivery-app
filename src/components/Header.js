import React, { Component } from 'react';
import logo from '../Images/logo.png'
import './Header.css';
import { GiAbstract039 } from 'react-icons/gi'
import Map from './map';
import { updateuser, removeUser } from '../Redux/actions/authAction'
import { connect } from 'react-redux'
import steps from '../Images/steps.png';
import firebase from '../config/firebae'

class UserHeader extends Component {
    constructor(){
        super();
        this.state = {
            location: {lat: '', lng: ''},
            map: false,
            orders: false,
            myOrders : null
        }
        this.getMapLocation = this.getMapLocation.bind(this)
    }
    logOut(){
        this.props.removeUser()
        this.props.props.history.push('/')
    }
    // shouldComponentUpdate(nextProps, nextState){
    //     const {location} = this.state;
    //     // console.log(lng, lat)
    //     // this.props.func(lat, lng)
    //     return(
    //         nextState.lng !== location.lng && nextState.lat !== location.lat
    //         )
    // }
    getMapLocation(location){
        // if(location.lat !== this.state.location.lat && location.lng !== this.state.location.lng){
            let user = this.props.user
            user.location = location
            this.props.updateuser(user)
            // this.setState({location})
        // }
    }
    showMap(){
        this.state.map ? this.setState({map: false}) : this.setState({map: true}) 
    }
    componentDidMount(){
        this.getOrders()
    }
    getOrders(){
        firebase.database().ref(`order/forUser/${this.props.user.uid}`).on('value', (e)=>{
            let orders = e.val()
            let myOrders = []
            if(orders !== null)
            for(var key in orders){
                for(var key2 in orders[key]){
                    myOrders.push(orders[key][key2])
                }
            }
            this.setState({myOrders})
        })
    }
    getOrdersFromState(){
        const {myOrders} = this.state
        console.log(myOrders)
    }
    render() {
        const {map, myOrders} = this.state
        // console.log(this.props.user)
        let btn
        let div
        map ? btn = {height: 400} : btn = {height: 0}
        map ? div = {height: 350, width: 350, display: 'block'} : div = {height: 350, width: 350, display: 'none'} 
        return (
            <div>
                
            <div className='mainDivHeader'>
                <div>
                    <img alt='logo' src={logo} className='logoHeader' />
                </div>
                <div style={btn}>
                <div style={div}> <Map style={{height: 350, width: 350}} func={this.getMapLocation} /> </div>
                <button style={{backgroundColor: '#121924'}} onClick={() => this.showMap()} className='btn'>
                Select Your Location <GiAbstract039 size='1.2em' />
                <br />
                </button>
                
                </div>
                <div>
                 <button onClick={()=>{this.setState({orders: !this.state.orders})}} className="btn">
                        CHeck Orders
                 </button>
                 {this.state.orders && <div style={{height: 500, width: 350,backgroundColor: 'white', color: 'black', position: 'absolute', overflow: 'auto'}}>
                        {/* {this.getOrdersFromState()} */}
                        {myOrders !== null && myOrders.map((e, i)=>{
                            return(
                                <div key={i}>
                                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                                    <h3>
                                        {e.productName}
                                    </h3>
                                    <h3>
                                        {e.status}
                                    </h3>
                                </div>
                                <hr />
                                </div>
                            )
                        })}
                 </div>}
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
            <div>
                <div className='background'>
                <div className='innerDiv'>
                <h1>Order Delivery & Take-Out</h1>
                <p>Find restaurants, specials, and coupons for free</p>
                <br />
                <img src={steps} alt='steps' />
                </div>
                </div>
            </div>
                    </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log('mapstatetoprops ===> ', state.reducer.user)
    return {
        user: state.reducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateuser: (user) => dispatch(updateuser(user)),
        removeUser: () => dispatch(removeUser())

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(UserHeader)
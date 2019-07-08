import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../../config/firebae';



class Pending extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
    changeStatus(e) {
        const { orders } = this.state
        let userId = e.target.id;
        let orderPostKey = e.target.className;
        let myId = this.props.user.uid
        for (var key in orders) {
            if (orders[key].key === orderPostKey) {
                orders[key].order.status = 'inprogress'
                firebase.database().ref(`order/forRestaurant/${myId}/${userId}/${orderPostKey}`).set(orders[key].order).then(() => {
                    firebase.database().ref(`order/forUser/${userId}/${myId}/${orderPostKey}`).set(orders[key].order).then(() => {
                        alert('Order In Progress')
                    })
                })
            }
        }
    }
    getOredersData() {
        let uid = this.props.user.uid
        firebase.database().ref(`order/forRestaurant/${uid}`).on('value', (e) => {
            let orders = []
            let order = e.val()
            for (var key in order) {
                for (var key2 in order[key]) {
                    if (order[key][key2].status === 'pending') {
                        orders.push(
                            { key: key2, order: order[key][key2] }
                        )
                    }
                }
            }
            this.setState({ orders: orders })
        })
    }
    componentWillMount() {
        this.getOredersData()
    }

    render() {
        const { orders } = this.state
        return (
            <div>
                <h1>Pending Orders</h1>
                <ul style={{listStyleType: 'none'}}>
                    {orders.length && orders.map((e) => {
                        return (<li style={{margin: '5px auto' , width: 500, height: 50,borderRadius: 50, border: '2px dashed white'}} key={e.key}>{<div style={{display: 'flex', justifyContent:'space-around'}}><h3>{e.order.productName}</h3><h3>Status: {e.order.status}</h3><button style={{height: 40, marginTop: 5,border: 'none', background: 'none', borderRadius: 50, boxShadow: 'inset 0px 0px 2px green'}} onClick={(e) => { this.changeStatus(e) }} id={e.order.userId} className={e.key}>Progress</button></div>}</li>)                        
                    })}
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.reducer.user
    }
}
export default connect(mapStateToProps)(Pending)

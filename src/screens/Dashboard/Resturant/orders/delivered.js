import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../../config/firebae';



class Delivered extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
  
    getOredersData() {
        let uid = this.props.user.uid
        firebase.database().ref(`order/forRestaurant/${uid}`).on('value', (e) => {
            let orders = []
            let order = e.val()
            for (var key in order) {
                for (var key2 in order[key]) {
                    if (order[key][key2].status === 'delivered') {
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
                <h1>Delivered</h1>
                <ul style={{listStyleType: 'none'}}>
                    {orders.length && orders.map((e) => {
                        return (<li style={{margin: '5px auto' , width: 500, height: 50,borderRadius: 50, border: '2px dashed white'}} key={e.key}>{<div style={{display: 'flex', justifyContent:'space-around'}}><h3>{e.order.productName}</h3><h3>Status: {e.order.status}</h3></div>}</li>)
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
export default connect(mapStateToProps)(Delivered)

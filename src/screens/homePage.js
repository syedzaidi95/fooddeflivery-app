import React, { Component } from 'react';
import { NormalBtn } from '../helpers/Buttons'
// import logoImg from '../Images/logo.png'

class Homepage extends Component{


    render() {
        return (
            <div style={{marginTop: '150px'}}>
            <h1 style={{color: 'white'}}>Food Now</h1>
            <br />
            <NormalBtn func={()=>{this.props.history.push('/login')}} color='default' style={{width: '300px', color: 'orange'}} text='Login' />
            <br />
            <br />
            <NormalBtn func={()=>{this.props.history.push('/registration')}} style={{backgroundColor: '#1b1b1b', color: 'orange', width: '300px'}} text='SignUp' />
            </div>
        )
    }
}


export default Homepage
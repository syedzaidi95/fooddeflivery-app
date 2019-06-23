import React from 'react';
import Logo from '../../../Images/logo.png'
import { NormalBtn } from '../../../helpers/Buttons'
import firebase from '../../../config/firebae'


export default function ResturantHeader(props) {
    function logOut() {
        firebase.auth().signOut().then(() => {
            props.props.removeUser()
        }).then(() => {
            props.props.history.push('/')
        })
            .catch(() => {
                props.props.removeUser()
                props.props.history.push('/')
            })
    }
    return (
        <header style={{zIndex: 10 ,paddingTop: 5, boxShadow: '0px 8px 6px -6px', position: 'fixed', width: '100%', height: 55, top: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <img src={Logo} alt='logo' style={{ height: 50, width: 75 }} />
            <h3>
                {props.props.user.resturantName}
            </h3>
            <NormalBtn text='LogOut' style={{ backgroundColor: '#ca4100db' }} func={logOut} />
        </header>
    )
}
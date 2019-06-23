import React, { Component } from 'react';
import Input from '@material-ui/core/Input'
import { NormalBtn } from '../helpers/Buttons'
import { login } from '../API/firebaseApi'
import { updateuser, removeUser } from '../Redux/actions/authAction'
import { connect } from 'react-redux'

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            email: '',
            password: ''
        }
        this.userLogin = this.userLogin.bind(this)
    }

    async userLogin() {
        const { email, password } = this.state
        try {
            const result = await await login(email, password);
            // console.log(result);
            this.props.updateuser(result)
            this.props.history.push('/dashboard')
        } catch (e) {
            console.log(e)
        }
    }
    static getDerivedStateFromProps(nextProps){
        return{user: nextProps.user}
    }
    render() {
        const {email, password } = this.state
            return (
                <div style={{ marginTop: '200px' }}>
                <NormalBtn func={() => { this.props.history.push('/') }} style={{ marginLeft: '250px', backgroundColor: 'red' }} text='X' />
                <h1>SignIn</h1>
                <Input style={{ width: '300px' }} value={email} onChange={e => this.setState({ email: e.target.value })} placeholder='Email' type='email' />
                <br />
                <br />
                <Input style={{ width: '300px' }} value={password} onChange={e => this.setState({ password: e.target.value })} placeholder='Password' type='password' />
                <br />
                <br />
                <NormalBtn text='SignIn' func={this.userLogin} />
                <button onClick={()=>{this.props.removeUser()}}>LOG out</button>
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



export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
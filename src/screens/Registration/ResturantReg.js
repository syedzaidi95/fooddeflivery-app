import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { NormalBtn } from '../../helpers/Buttons';
import { resturantReg, checkResturantName } from '../../API/firebaseApi';
import { RegLoader } from '../../helpers/Loaders';
// import MapForResturantReg from './MapForResturantReg';
import Map from '../../components/map'

class ResturantReg extends Component {
    constructor() {
        super();
        this.state = {
            location: '',
            accountType: 'resturant', resturantName: '', fullName: '', email: '', country: '', city: '', password: '', confirmPassword: '',
            formErrors: { fullName: '', email: '', resturantName: '', country: '', city: '', password: '', confirmPassword: '' },
            fullNameValid: false, emailValid: false, resturantNameValid: false, countryValid: false, cityValid: false, passwordValid: false, confirmPasswordValid: false,
            formValid: false,
            loading: false,
        }
        this.restReg = this.restReg.bind(this)
        this.checkname = this.checkname.bind(this)
        this.getLocationOfMap = this.getLocationOfMap.bind(this)
    }
    getLocationOfMap(location){
        this.setState({location})
    }
    async checkname() {
        const { resturantName } = this.state
        const { formErrors } = this.state
        try {
            this.setState({ loading: true })
            const result = await checkResturantName(resturantName);
            if (result) {
                this.restReg()
            } else {
                formErrors.resturantName = 'This Name is allready exist';
                this.setState({ resturantNameValid: false, formValid: false, formErrors, loading: false })
            }
        } catch (e) {
            console.log(e)
            this.setState({ loading: false })
        }
    }

    async restReg() {
        const {location ,formErrors, accountType, resturantName, fullName, email, country, city, password } = this.state
        let obj = {location, accountType: accountType.toLowerCase(), resturantName: resturantName.toLowerCase(), fullName: fullName.toLowerCase(), email, country: country.toLowerCase(), city: city.toLowerCase() }
        try {
            const result = await resturantReg(obj, password);
            if(result){
                alert('RegestrationSuccesfull');
                this.props.rout.history.push('/')
            }else{
                this.setState({ loading: false })
            }
        } catch (e) {
            if (e.code === "auth/email-already-in-use" || e.code === "auth/invalid-email") {
                formErrors.email = e.message;
                this.setState({ emailValid: false, formValid: false, formErrors, loading: false })
            } else {
                console.log(e)
                this.setState({ loading: false })
            }
        }
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let { fullNameValid, emailValid, resturantNameValid, countryValid, cityValid, passwordValid, confirmPasswordValid } = this.state;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
                break;
            case 'confirmPassword':
                this.state.password === value ? confirmPasswordValid = true : confirmPasswordValid = false;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '' : 'Password is not matched'
                break;
            case 'fullName':
                fullNameValid = value.match(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/g);
                fieldValidationErrors.fullName = fullNameValid ? '' : 'Its contain only single space & Alphabet'
                break;
            case 'resturantName':
                resturantNameValid = value.match(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/g);
                fieldValidationErrors.resturantName = resturantNameValid ? '' : 'Its contain only single space & Alphabet'
                break;
            case 'country':
                countryValid = value.match(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/g);
                fieldValidationErrors.country = countryValid ? '' : 'Its contain only single space & Alphabet'
                break;
            case 'city':
                cityValid = value.match(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/g);
                fieldValidationErrors.city = cityValid ? '' : 'Its contain only single space & Alphabet'
                break;
            default:
                break;

        }
        this.setState({
            formErrors: fieldValidationErrors, emailValid: emailValid, passwordValid: passwordValid, countryValid: countryValid, cityValid: cityValid,
            confirmPasswordValid: confirmPasswordValid, fullNameValid: fullNameValid, resturantNameValid: resturantNameValid
        }, this.validateForm);
    }

    validateForm() { this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid && this.state.fullNameValid && this.state.resturantNameValid && this.state.countryValid && this.state.cityValid }) }
    render() {
        const { location,resturantName, fullName, email, country, city, password, confirmPassword, formErrors, resturantNameValid, fullNameValid, emailValid, countryValid, cityValid, passwordValid, confirmPasswordValid } = this.state
        const errorStyle = { width: '300px', height: '50px',boxShadow: '0px 8px 6px -6px red'}
        const normalStyle = { width: '300px', height: '50px' }
        console.log(location)
        return (
            <div>{this.state.loading ? <RegLoader /> :<div style={{display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-around'}}> <div><Map style={{height: 350, width: 350}} func={this.getLocationOfMap} /></div> <div style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={resturantName}
                    style={resturantNameValid ? normalStyle : errorStyle}
                    label="Resturant Name"
                    type='text'
                    margin="normal"
                    name='resturantName'
                />
                {!resturantNameValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.resturantName}</p>}
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={fullName}
                    style={fullNameValid ? normalStyle : errorStyle}
                    label="Full Name of owner"
                    type="text"
                    margin="normal"
                    name='fullName'
                />
                {!fullNameValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.fullName}</p>}
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={email}
                    style={emailValid ? normalStyle : errorStyle}
                    label="Email"
                    type="email"
                    margin="normal"
                    name='email'
                />
                {!emailValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.email}</p>}
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={country}
                    style={countryValid ? normalStyle : errorStyle}
                    label="Countery"
                    type="text"
                    margin="normal"
                    name='country'
                />
                {!countryValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.country}</p>}
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={city}
                    style={cityValid ? normalStyle : errorStyle}
                    label="City"
                    type="text"
                    margin="normal"
                    name='city'
                />
                {!cityValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.city}</p>}
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={password}
                    style={passwordValid ? normalStyle : errorStyle}
                    label="Password"
                    type="password"
                    margin="normal"
                    name='password'
                />
                {!passwordValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.password}</p>}
                <TextField
                    onChange={(event) => this.handleUserInput(event)}
                    value={confirmPassword}
                    style={confirmPasswordValid ? normalStyle : errorStyle}
                    label="Confirm Password"
                    type="password"
                    margin="normal"
                    name='confirmPassword'
                />
                {!confirmPasswordValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.confirmPassword}</p>}
                <NormalBtn text='SignUp' disabled={!this.state.formValid} func={this.checkname} />
                <NormalBtn text='Cancle' func={()=>{this.props.rout.history.push('/')}} />
            </div> </div>}
            </div>
        )
    }
}

export default ResturantReg
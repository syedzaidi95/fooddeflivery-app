import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { NormalBtn } from '../../helpers/Buttons';
import { userReg } from '../../API/firebaseApi';
import { RegLoader } from '../../helpers/Loaders';
// import { border } from '@material-ui/system';

export default class UserReg extends Component {
    constructor() {
        super();
        this.state = {
            accountType: 'user', fullName: '', email: '', dateOfBirth: '', country: '', city: '', password: '', confirmPassword: '',
            formErrors: { fullName: '', email: '', dateOfBirth: '', country: '', city: '', password: '', confirmPassword: '' },
            fullNameValid: false, emailValid: false, dateOfBirthValid: false, countryValid: false, cityValid: false, passwordValid: false, confirmPasswordValid: false,
            formValid: false,
            loading: false,
        }
        this.userReg = this.userReg.bind(this)
    }

    async userReg() {
        const { formErrors, accountType, fullName, email, dateOfBirth, country, city, password } = this.state
        let obj = { accountType: accountType.toLowerCase(), fullName: fullName.toLowerCase(), email, dateOfBirth, country: country.toLowerCase(), city: city.toLowerCase() }
        this.setState({ loading: true })
        try {
            const result = await userReg(obj, password);
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
        let { fullNameValid, emailValid, dateOfBirthValid, countryValid, cityValid, passwordValid, confirmPasswordValid } = this.state;

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
            case 'dateOfBirth':
                value === '' ? dateOfBirthValid = false : dateOfBirthValid = true;
                fieldValidationErrors.dateOfBirth = dateOfBirthValid ? '' : 'Pleas Select Date of birth'
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
            confirmPasswordValid: confirmPasswordValid, fullNameValid: fullNameValid, dateOfBirthValid: dateOfBirthValid
        }, this.validateForm);
    }
    validateForm() { this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.confirmPasswordValid && this.state.fullNameValid && this.state.dateOfBirthValid && this.state.countryValid && this.state.cityValid }) }
    render() {
        const errorStyle = {width: '300px', height: '50px',boxShadow: '0px 8px 6px -6px red'}
        const normalStyle = {width: '300px', height: '50px' }
        const { formErrors, fullName, email, dateOfBirth, country, city, password, confirmPassword, fullNameValid, emailValid, dateOfBirthValid, countryValid, cityValid, passwordValid, confirmPasswordValid } = this.state
        // const {fullNameValid, emailValid, dateOfBirthValid, countryValid, cityValid,passwordValid, confirmPasswordValid} = this.state
        // const {formErrors} = this.state
        return (
            <div>
                {this.state.loading ? <RegLoader /> : <div>
                    {/* <h1>UserReg</h1> */}
                    <TextField
                        onChange={(event) => this.handleUserInput(event)}
                        value={fullName}
                        style={fullNameValid ? normalStyle : errorStyle}
                        label="Full Name"
                        margin="normal"
                        name='fullName'
                    />
                    <br />
                    {!fullNameValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.fullName}</p>}
                    <TextField
                        onChange={(event) => this.handleUserInput(event)}
                        style={emailValid ? normalStyle : errorStyle}
                        value={email}
                        label="Email"
                        type="email"
                        margin="normal"
                        name='email'
                    />
                    <br />
                    {!emailValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.email}</p>}
                    <TextField
                        onChange={(event) => this.handleUserInput(event)}
                        onClick={(e) => e.target.type = 'date'}
                        onBlur={(e) => e.target.type = 'text'}
                        style={dateOfBirthValid ? normalStyle : errorStyle}
                        value={dateOfBirth}
                        label="Date Of Birth"
                        type='text'
                        margin="normal"
                        name='dateOfBirth'
                    />
                    <br />
                    {!dateOfBirthValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.dateOfBirth}</p>}
                    <TextField
                        onChange={(event) => this.handleUserInput(event)}
                        style={countryValid ? normalStyle : errorStyle}
                        value={country}
                        label="Countery"
                        type="text"
                        margin="normal"
                        name='country'
                    />
                    <br />
                    {!countryValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.country}</p>}
                    <TextField
                        onChange={(event) => this.handleUserInput(event)}
                        style={cityValid ? normalStyle : errorStyle}
                        value={city}
                        label="City"
                        type="text"
                        margin="normal"
                        name='city'
                    />
                    <br />
                    {!cityValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.city}</p>}
                    <TextField
                        onChange={(event) => this.handleUserInput(event)}
                        style={passwordValid ? normalStyle : errorStyle}
                        value={password}
                        label="Password"
                        type="password"
                        margin="normal"
                        name='password'
                    />
                    <br />
                    {!passwordValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.password}</p>}
                    <TextField
                        onChange={(event) => this.handleUserInput(event)}
                        style={confirmPasswordValid ? normalStyle : errorStyle}
                        value={confirmPassword}
                        label="Confirm Password"
                        type="password"
                        margin="normal"
                        name='confirmPassword'
                    />
                    <br />
                    {!confirmPasswordValid && <p style={{ color: 'red', margin: '0px', padding: '0px' }}>{formErrors.confirmPassword}</p>}
                    <br />
                    {/* {console.log(this.props.rout)} */}
                    <NormalBtn text='SignUp' disabled={!this.state.formValid} func={this.userReg} />
                    <NormalBtn text='Cancle' func={()=>{this.props.rout.history.push('/')}} />
                </div>}
            </div>
        )
    }
}
import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            register: {
                error: false,
                message: ''
            }
        };

        this.onChangeFirst = this.onChangeFirst.bind(this);
        this.onChangeLast = this.onChangeLast.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitHandle = this.onSubmitHandle.bind(this);   
    }

    onChangeFirst(e){
        this.setState({ 
            firstName: e.target.value 
        })
    }

    onChangeLast(e){
        this.setState({ 
            lastName: e.target.value 
        })
    }

    onChangeEmail(e){
        this.setState({ 
            email: e.target.value 
        })
    }

    onChangeUsername(e){
        this.setState({ 
            username: e.target.value 
        })
    }

    onChangePassword(e){
        this.setState({ 
            password: e.target.value 
        })
    }
    
    onSubmitHandle(e) {
        e.preventDefault();

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        };

        axios.post('http://localhost:5000/register', user)
            .then(response => {
                console.log(response.data);
                if(response.data.username) {
                    this.setState({ register: { error: false }});
                    window.location = '/';
                } else {
                    this.setState({ register: { error: true, message: response.data }});
                }
            })
            .catch(e => {
                console.log(e);
            });

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
        });
    }
    
    render(){
        return(
            <form id='register-form' className='auth-form' onSubmit={this.onSubmitHandle}>
                <h4>Register here!</h4>
                { this.state.register.error && 
                    <div className='error-box'>
                        <span>{this.state.register.message}</span>
                    </div> }
                <br />
                <label htmlFor='first-name'>First name:</label>
                <input id='first-name' name='first-name' type='text' value={this.state.firstName} onChange={this.onChangeFirst} required/>
                <label htmlFor='last-name'>Last name:</label>
                <input id='last-name' name='last-name'type='text' value={this.state.lastName} onChange={this.onChangeLast} required/>
                <label htmlFor='email'>(Optional) Your email:</label>
                <input type='email' name='email' id='email' value={this.state.email} onChange={this.onChangeEmail}/>
                <label htmlFor='register-username'>Select your username:</label>
                <input id='register-username' name='username' type='text' 
                    minLength='8'
                    maxLength='16'
                    title='8 to 16 characters: letters, numbers, hyphen or undescore'
                    pattern='^[A-Za-z0-9_-]{8,16}'
                    placeholder='Username'
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    required/>
                <label htmlFor='register-password'>Define your password:</label>
                <input id='register-password' type='password' name='password' 
                    minLength='8'
                    pattern='^[A-Za-z0-9_-]{8,}'
                    title='8 or more characters: letters, numbers, hyphen and underscore.'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required/>
                <button type='submit'>Register me</button>
            </form>
        )
    }
}

export default Register;
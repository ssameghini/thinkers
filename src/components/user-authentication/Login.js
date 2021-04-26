import { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);

        this.onSubmitHandle = this.onSubmitHandle.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '',
            password: '',
            logInError: false,
            errorMessage: ''
        }
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
            username: this.state.username,
            password: this.state.password
        };

        axios.post('http://localhost:5000/login', user)
            .then(res => {
                if(res.data.username) {
                    this.setState({ logInError: false });
                    this.props.onLogIn(res.data);
                    this.setState({ username: '', password: ''})
                } else {
                    this.setState({ logInError: true, errorMessage: res.data.message });
                }
            })
            .catch(e => {
                console.error(e);
            });
    }
    
    render(){
        return(
            <form id='login-form' className='auth-form' onSubmit={this.onSubmitHandle}>
                <h5>Or if you have an account...</h5>
                <h4>Log in!</h4>

                { this.state.logInError &&
                    <div className='error-box'>
                        <span>Ups! Try again, your data may be mispelled or you haven't 
                        registered yet.</span>
                        <br/>
                        <span>Problem: <em>{this.state.errorMessage}</em></span>
                    </div> }
                
                <label for='login-username'>Username:</label>
                <input 
                    type='text'
                    id='login-username'
                    name='username'
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    required/>
                <label for='login-password'>Enter your password:</label>
                <input 
                    type='password' 
                    id='login-password' 
                    name='password' 
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    required/>
                <button type='submit'>Login!</button>
            </form>
        )
    }
}

export default Login;
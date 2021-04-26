import Register from './Register';
import Login from './Login';

export default function Auth(props) {
    return (
        <main className='mainpage'>
            <h2>Welcome to Thinkers!</h2>
            <h3>Your troubled and despaired social web 
                for sharing your thougths</h3>

            <div className='auth-flex'>
                <Register onRegistered={props.onLogIn}/>
                <Login onLogIn={props.onLogIn}/>
            </div>
        </main>
    )
}
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const submitForm = (e) => {
        //if your computer is slower this may take a while becauase of the profile picture
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/login",{email: email,password: password}, {withCredentials: true})
            .then(res => {
                navigate('/profilePage')})
            .catch(err => { 
                setEmailError((err.response.data.email === undefined ? null : err.response.data.email));
                setPasswordError((err.response.data.password === undefined ? null : err.response.data.password));
            });
    }
    const errStyles = {
        color: "red"
    }

    return (
        <>
            <header>
                <h1>Sports Club</h1>
            </header>
            <main>
                <form onSubmit={submitForm}>
                    <p style={errStyles}>{emailError}</p>
                    <label>Email:</label>
                    <input type='text'  value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <p style={errStyles}>{passwordError}</p>
                    <label>Password:</label>
                    <input type='password'  value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <p></p>
                    <button>Login</button>
                </form>
            </main>

            <footer>
                <p>Don't Have an account?</p>
                <p><a href='/'>Create an account here</a></p>
            </footer>
        </>
    );
}

export default Login;
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/login",{email: email,password: password}, {withCredentials: true})
            .then(res => {
                console.log(res);
                navigate('/profilePage')})
            .catch(err => console.log(err));
    }

    return (
        <>
            <header>
                <h1>Sports Club</h1>
            </header>
            <main>

                <form onSubmit={submitForm}>

                    <p></p>
                    <label>Email:</label>
                    <input type='text'  value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <p></p>
                    <label>Password:</label>
                    <input type='password'  value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <p></p>
                    <button>Login</button>
                </form>

                <p><a href='/resetPassword'>Forgot your Passowrd?</a></p>

            </main>

            <footer>
                <p>Don't Have an account?</p>
                <p><a href='/'>Create an account here</a></p>
            </footer>
        </>
    );
}

export default Login;
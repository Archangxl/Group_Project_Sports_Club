import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate("");

    const submitForm = (e) => {
        e.preventDefault();
        console.log({email: email,password: password, confirmPassword: confirmPassword});
        navigate('/login');
    }

    return (
        <>
            <header>
                <h1>Reset Your Password</h1>
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
                    <label>Confirm Password:</label>
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <p></p>
                    <button>Submit</button>
                </form>
            </main>
        </>
    );
}
export default ResetPassword;
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [sport, setSport] = useState("");
    const [sportTeam, setSportTeam] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/register', {
            fullName: fullName, email: email,password: password, confirmPassword: confirmPassword
            ,bio: bio, city: city, state: state ,sport: sport, sportTeam: sportTeam, birthDate: birthday, gender: gender},
            {withCredentials: true})
            .then(res => {
                navigate('/profilePage');
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <header>
                <h1>Sports Club</h1>
            </header>

            <main>
                <form onSubmit={submitForm}>

                    <p></p>
                    <label>Full Name:</label>
                    <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
                    <p></p>
                    <label>Bio: </label>
                    <input type="text" onChange={(e) => setBio(e.target.value)}></input>
                    <p></p>
                    <label>Current City: </label>
                    <input type="text" onChange={(e) => setCity(e.target.value)}></input>
                    <p></p>
                    <label>Current State: </label>
                    <input type="text" onChange={(e) => setState(e.target.value)}></input>
                    <p></p>
                    <label>Sport: </label>
                    <input type="text" onChange={(e) => setSport(e.target.value)}></input>
                    <p></p>
                    <label>Favorite Sports Team: </label>
                    <input type="text" onChange={(e) => setSportTeam(e.target.value)}></input>
                    <p></p>
                    <label>Birthday: </label>
                    <input type="input" onChange={(e) => setBirthday(e.target.value)}></input>
                    <p></p>
                    <label>Gender:</label>
                    <select onChange={(e) => setGender(e.target.value)}>
                        <option default></option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>other</option>
                    </select>
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
                    <button>Sign Up!</button>

                </form>
                <p><a href="/login">Already have an account? Login here.</a></p>
            </main>
        </>
    );

}
export default Register;
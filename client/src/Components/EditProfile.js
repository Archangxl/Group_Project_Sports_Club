import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const EditProfile = () => {

    const navigate = useNavigate();

    const [bio, setBio] = useState("");
    const [currentCityAndState, setCurrentCityAndState] = useState("");
    const [sport, setSport] = useState("");
    const [currentTeam, setCurrentTeam] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");

    const logOutButton = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const submitMethod = (e) => {
        e.preventDefault();
        console.log({bio: bio, currentCityAndState: currentCityAndState, sport: sport, currentTeam: currentTeam, birthday: birthday, gender: gender})
    }

    return (
        <>
            <header>
                <h2>Edit Your Profile</h2>
                <button onClick={logOutButton}>Logout</button>
                <button onClick={(e) => navigate('/profilePage')}>Profile Page</button>
                <button onClick={(e) => navigate('/feed')}>Feed</button>
            </header>
            <main>
                <form onSubmit={submitMethod}>
                    <label>Bio: </label>
                    <input type="text" onChange={(e) => setBio(e.target.value)}></input>
                    <p></p>
                    <label>Current City and State: </label>
                    <input type="text" onChange={(e) => setCurrentCityAndState(e.target.value)}></input>
                    <p></p>
                    <label>Sport: </label>
                    <input type="text" onChange={(e) => setSport(e.target.value)}></input>
                    <p></p>
                    <label>Current Team: </label>
                    <input type="text" onChange={(e) => setCurrentTeam(e.target.value)}></input>
                    <p></p>
                    <label>Birthday: </label>
                    <input type="date" onChange={(e) => setBirthday(e.target.value)}></input>
                    <p></p>
                    <label>Gender:</label>
                    <select onChange={(e) => setGender(e.target.value)}>
                        <option default></option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>other</option>
                    </select>
                </form>
            </main>
        </>
    );
}
export default EditProfile; 
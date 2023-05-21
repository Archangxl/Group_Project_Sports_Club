import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [fullNameError, setFullNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [bio, setBio] = useState("");
    const [bioError, setBioError] = useState("");
    const [city, setCity] = useState("");
    const [cityError, setCityError] = useState("");
    const [state, setState] = useState("");
    const [stateError, setStateError] = useState("");
    const [sport, setSport] = useState("");
    const [sportError, setSportError] = useState("");
    const [sportTeam, setSportTeam] = useState("");
    const [sportTeamError, setSportTeamError] = useState("");
    const [birthday, setBirthday] = useState("");
    const [birthdayError, setBirthdayError] = useState("");
    const [gender, setGender] = useState("");
    const [genderError, setGenderError] = useState("");
    const [photoError, setPhotoError] = useState("");
    const [base64string, setBase64String] = useState(undefined);

    const logOutButton = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/user/logout', {withCredentials: true})
            .then(res => navigate('/'))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        //if your computer is slower this may take a while becauase of the profile picture
        axios.get('http://localhost:8000/api/user/getlogged', {withCredentials: true})
            .then(res => { 
                setFullName(res.data.fullName);
                setBio(res.data.bio);
                setCity(res.data.city);
                setState(res.data.state);
                setSport(res.data.sport);
                setSportTeam(res.data.sportTeam);
                setBirthday(res.data.birthDate);
                setGender(res.data.gender);
                setBase64String(res.data.photo);
                setEmail(res.data.email);
            })
            .catch(err => { 
                console.log(err)
            });
    }, [])

    const submitMethod = (e) => {
        console.log("submit");
        e.preventDefault();
        axios.put('http://localhost:8000/api/user/update', {
            fullName: fullName, email: email,
            bio: bio, city: city, state: state ,sport: sport, 
            sportTeam: sportTeam, birthDate: birthday, gender: gender,
            photo: base64string
        }, {withCredentials: true})
            .then(res => { 
                console.log(res);
                navigate('/profilePage');
            })
            .catch(err => {
                console.log(err);
                const er = err.response.data.err.errors;
                setFullNameError((er.fullName === undefined ? null : er.fullName.message));
                setBioError((er.bio === undefined ? null : er.bio.message));
                setCityError((er.city === undefined ? null : er.city.message));
                setStateError((er.state === undefined ? null : er.state.message));
                setSportError((er.sport === undefined ? null : er.sport.message));
                setSportTeamError((er.sportTeam === undefined ? null : er.sportTeam.message));
                setBirthdayError((er.birthDate === undefined ? null : er.birthDate.message));
                setGenderError((gender !== "" ? null : "Please provide your gender"));
                setPhotoError((base64string !== undefined ? null : er.photo.message));
                setEmailError((er.email === undefined ? null : er.email.message));
            });
    }

    const photoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64String(reader.result.toString());
        }
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    const errStyles = {
        color: "red"
    }

    return (
        <>
            <header>
                <h2>Edit Your Profile</h2>
                <button onClick={logOutButton}>Logout</button>
                <button onClick={(e) => navigate('/profilePage')}>Profile Page</button>
                <button onClick={(e) => navigate('/feed')}>Feed</button>
            </header>
            <p></p>
            <main>
                <form onSubmit={submitMethod}>

                    <p style={errStyles}>{fullNameError}</p>
                    <label>Full Name:</label>
                    <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
                    <p style={errStyles}>{bioError}</p>
                    <label>Bio: </label>
                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)}></input>
                    <p style={errStyles}>{cityError}</p>
                    <label>Current City: </label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
                    <p style={errStyles}>{stateError}</p>
                    <label>Current State: </label>
                    <input type="text" value={state} onChange={(e) => setState(e.target.value)}></input>
                    <p style={errStyles}>{sportError}</p>
                    <label>Sport: </label>
                    <input type="text" value={sport} onChange={(e) => setSport(e.target.value)}></input>
                    <p style={errStyles}>{sportTeamError}</p>
                    <label>Favorite Sports Team: </label>
                    <input type="text" value={sportTeam} onChange={(e) => setSportTeam(e.target.value)}></input>
                    <p style={errStyles}>{birthdayError}</p>
                    <label>Birthday: </label>
                    <input type="input" value={birthday} onChange={(e) => setBirthday(e.target.value)}></input>
                    <p style={errStyles}>{genderError}</p>
                    <label>Gender:</label>
                    <select onChange={(e) => setGender(e.target.value)}>
                        { gender === "Male" ? <option selected>Male</option> : <option>Male</option>}
                        { gender === "Female" ? <option selected>Female</option> : <option>Female</option>}
                        { gender === "other" ? <option selected>other</option> : <option>other</option>}
                    </select>
                    <p style={errStyles}>{photoError}</p>
                    <label>Profile picture: </label>
                    <input type='file' onChange={photoHandler}></input>
                    <p style={errStyles}>{emailError}</p>
                    <label>Email:</label>
                    <input type='text'  value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <p></p>
                    <button>Update</button>

                </form>
            </main>
        </>
    );
}
export default EditProfile; 
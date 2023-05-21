import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ProfilePage = (props) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [base64string, setBase64String] = useState("");
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [sport, setSport] = useState("");
    const [sportTeam, setSportTeam] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/getlogged', {withCredentials: true})
            .then(res => { 
                setFullName(res.data.fullName);
                setBio(res.data.bio);
                setCity(res.data.city);
                setState(res.data.state);
                setSport(res.data.sport);
                setSportTeam(res.data.sportTeam);
                setBirthday(res.data.sportTeam);
                setGender(res.data.gender);
                let date = res.data.createdAt;
                let formatedDate = "";
                for (let i = 0; i < date.length; i++) {
                    if (date[i] === "T") {
                        break;
                    }
                    formatedDate += date[i];
                }
                setCreatedAt(formatedDate);
            })
            .catch(err => console.log(err));
    }, [])

    const logOutButton = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/user/logout', {withCredentials: true})
            .then(res => navigate('/'))
            .catch(err => console.log(err));
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

    const photoFormSubmit = (e) => {
        e.preventDefault();
        setPhoto(base64string);
        setBase64String("");
        navigate('/profilePage');
    }

    return (
        <>
            <header>
                <img src={photo} style={{
                    height: "100px",
                    width: "150px", 
                    borderRadius: "5px"}}></img>
                <h2>Logged In {fullName}</h2>
                <button onClick={logOutButton}>Logout</button>
                <button onClick={(e) => navigate('/editProfile')}>Edit your Information</button>
                <button onClick={(e) => navigate('/photos')}>Photos</button>
                <button onClick={(e) => navigate('/feed')}>Feed</button>
            </header>
            <main>
                <div className="Information">
                    <h4>Information: </h4>
                    <p>Bio: {bio}</p>
                    <p>Lives in {city},{state}</p>
                    <p>Favorite sport is {sport}</p>
                    <p>Favorite sports team is {sportTeam}</p>
                    <p>Birthday: {birthday}</p>
                    <p>Gender: {gender}</p>
                    <p>Joined on: {createdAt}</p>
                </div>
                <div className="What's-New--Add-Photo">
                    <form>
                        <label>Whats New</label>
                        <textarea></textarea>
                    </form>
                    <form onSubmit={photoFormSubmit}>
                        <label>Add photo</label>
                        <input type='file' onChange={photoHandler}></input>
                        <button>Add Photo</button>
                    </form>
                </div>
                <div className="Posts">
                    <p><b>User Name</b></p>
                    <p>post</p>
                    <p><button>Like</button> number of likes</p>
                    <p><button>Comment</button></p>
                    <button>Delete</button>
                </div>
            </main>
        </>
    );
}
export default ProfilePage;
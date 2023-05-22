import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ProfilePage = (props) => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
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
                setPhoto(res.data.photo);
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
            .catch(err => { 
                console.log(err)
            });
    }, [])

    const logOutButton = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/user/logout', {withCredentials: true})
            .then(res => navigate('/'))
            .catch(err => console.log(err));
    }

    const [postMessage, setPostMessage] = useState("");
    const [postError, sePostError] = useState("");
    const [count, setCount] = useState(0);
    const postFormSubmition = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/createPost', {postMessage, fullName}, {withCredentials: true})
            .then(res => {
                setPostMessage("");
                setCount(count => count + 1);
            })
            .catch(err => console.log(err));
    }
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/grabPostsForLoggedUser', {withCredentials: true})
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }, [count])
    const deletePost = (e, postId) => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/deletePost/' +postId, {withCredentials: true} )
            .then(res =>{ 
                setCount(count => count + 1);
            })
            .catch(err => console.log(err));
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
                <div className="What's-New">
                    <form onSubmit={postFormSubmition}>
                        <label>Whats New</label>
                        <textarea value={postMessage} onChange={(e) => setPostMessage(e.target.value)}></textarea>
                        <button>Submit</button>
                    </form>
                </div>
                <div className="Posts">
                {
                        posts.map((post, index) => {
                            return (
                                <div key={index} style={{border: "1px solid black"}}>
                                    <p>{post.post.userPostingName}</p>
                                    <p>{post.post.message}</p>
                                    <p>Likes {post.numberOfLikes}</p>
                                    <button
                                        onClick={(e) => {
                                            deletePost(e, post.post._id);
                                        }}
                                    >Delete</button>
                                </div>
                            );
                        })
                    }
                </div>
            </main>
        </>
    );
}
export default ProfilePage;
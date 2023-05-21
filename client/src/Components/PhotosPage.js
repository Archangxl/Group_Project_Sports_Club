import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const PhotosPage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const logOutButton = (e) => {
        e.preventDefault();
        navigate('/');
    }


    return (
        <>
            <header>
            <h2>Logged In User Name</h2>
                <button onClick={logOutButton}>Logout</button>
                <button>Edit your Information</button>
                <button onClick={(e) => navigate('/profilePage')}>ViewProfile</button>
                <button>Feed</button>
            </header>
            <main>
                <p>photos</p>
            </main>
        </>
    );

}
export default PhotosPage;
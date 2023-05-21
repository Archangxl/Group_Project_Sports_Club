import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Feed = () => {

    const navigate = useNavigate();
    const [baseball, setBaseball] = useState([]);

    const logOutButton = (e) => {
        e.preventDefault();
        navigate('/');
    }

    useEffect(() => {
        //baseball
            axios.get(
                /*"https://v1.baseball.api-sports.io/games?date=2023-05-19&league=1&season=2023"*/
                ""
                ,
            {headers: {
                'x-rapidapi-key': '7292529224de8554a6bd9f9ba3831d88',
                'x-rapidapi-host': ""
                /*'v1.baseball.api-sports.io'*/
            }})
            .then(res => {
                setBaseball(res.data.response);

            })
            .catch(function (error) {
                console.log(error);
            });
    })

    return(
        <>
            <header>
                <h2>Sports Club</h2>
                <button onClick={logOutButton}>Logout</button>
                <button onClick={(e) => navigate('/profilePage')}>Profile Page</button>
            </header>
            
            <main>
                <h4>Your Sports Feed</h4>
                <div className='Whats-New'>
                    <form>
                        <label>Whats New</label>
                        <textarea placeholder='Type Something'></textarea>
                    </form>
                </div>
                <div className='Posts'>
                    <p><b>User Name</b></p>
                    <p>post</p>
                    <p><button>Like</button> number of likes</p>
                    <p><button>Comment</button></p>
                    <button>Delete</button>
                </div>
                <div className='Live-Scores'>
                    <p><b>Live Scores</b></p>
                    {
                        baseball.map((baseball, index) => {
                            return (
                                <div key={index}>
                                    <h1>{}{baseball.scores.home.total}</h1>
                                    <h1>{baseball.scores.away.total}</h1>
                                </div>
                            );
                        })
                    }
                </div>
            </main>
        </>
    );
}
export default Feed;
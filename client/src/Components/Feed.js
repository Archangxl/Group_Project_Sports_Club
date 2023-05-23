import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Feed = () => {

    const navigate = useNavigate();
    const [baseball, setBaseball] = useState([]);
    const [count, setCount] = useState(0);
    const [fullName, setFullName] = useState("");

    const logOutButton = (e) => {
        e.preventDefault();
        navigate('/');
    }
    useEffect(() => {
        //if your computer is slower this may take a while becauase of the profile picture
        axios.get('http://localhost:8000/api/user/getlogged', {withCredentials: true})
            .then(res => { 
                setFullName(res.data.fullName);
            })
            .catch(err => { 
                console.log(err)
            });
    }, [])

    const [userRequestForLiveScores, setUserRequestForLiveScores] = useState("");

    const grabSport = (e) => {
        e.preventDefault();

        

        //baseball
            axios.get(
                "https://v1.baseball.api-sports.io/games?date=2023-05-19&league=1&season=2023"
                ,
            {headers: {
                'x-rapidapi-key': '7292529224de8554a6bd9f9ba3831d88',
                'x-rapidapi-host': 'v1.baseball.api-sports.io'
            }})
            .then(res => {
                setBaseball(res.data.response);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8000/api/grabAllPosts', {withCredentials: true})
            .then(res => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }, [count])

    const [commentMessage, setCommentMessage] = useState("");
    const [commentFormPopulate, setCommentFormPopulate] = useState(false);
    const [commentIndexForCommentFormPopulate, setCommentIndexForCommentFormPopulate] = useState(null);

    return(
        <>
            <header>
                <h2>Sports Club</h2>
                <button onClick={logOutButton}>Logout</button>
                <button onClick={(e) => navigate('/profilePage')}>Profile Page</button>
            </header>
            
            <main>
                <h4>Your Sports Feed</h4>
                <div className='Posts'> 
                    {
                        posts.map((post, index) => {
                            return (
                            <div key={index} style={{border: "1px solid black"}}>
                                {index === commentIndexForCommentFormPopulate 
                                    ? 
                                    <>
                                            <p>{post.post.userPostingName}</p>
                                            <p>{post.post.message}</p>
                                            <p>Likes {post.numberOfLikes} | Comments {post.numberOfComments}</p>
                                            {post.userLoggedInIdAlreadyLikedPost === true ? 
                                            <button onClick={(e) => {
                                                axios.delete('http://localhost:8000/api/unlikePost/' + post.likes,
                                                {withCredentials: true})
                                                    .then(res => {
                                                        console.log(res);
                                                        setCount(count => count + 1);
                                                    })
                                                    .catch(err => console.log(err));
                                            }}>Unlike Post</button>
                                            :
                                            <button onClick={(e) => {
                                                axios.post('http://localhost:8000/api/likePost/' + post.post._id, 
                                                {fullName}, {withCredentials: true})
                                                    .then(res => {
                                                        console.log(res);
                                                        setCount(count => count + 1);
                                                    })
                                                    .catch(err => console.log(err));
                                            }}>Like Post</button>
                                        }
                                            <button onClick={(e) => {
                                                if (commentFormPopulate === false) {
                                                    setCommentFormPopulate(true);
                                                    setCommentIndexForCommentFormPopulate(index);
                                                } else {
                                                    setCommentFormPopulate(false);
                                                    setCommentMessage("");
                                                    setCommentIndexForCommentFormPopulate(null);
                                                }
                                            }}>Comment</button>

                                            <form onSubmit={(e) => {
                                                e.preventDefault();
                                                axios.post('http://localhost:8000/api/createPost/' + post.post._id,
                                                {commentMessage: commentMessage, fullName: fullName},
                                                {withCredentials: true},
                                                )
                                                    .then(res => {
                                                        console.log(res);
                                                        setCommentMessage("");
                                                        setCount(count => count+1);
                                                    })
                                                    
                                                    .catch(err => console.log(err));
                                            }}>
                                                <label>Make a comment</label>
                                                <textarea onChange={(e) =>  setCommentMessage(e.target.value)} value={commentMessage}></textarea>
                                                <button>Submit Comment</button>
                                            </form>
                                            <div className='Comment-section'>
                                                {
                                                    post.comments.map((comment, index) => {
                                                        return (
                                                            <div key={index} style={{border: "1px solid black", margin: "10px"}}>
                                                                {comment.userLoggedInPostedThisComment === true ? 
                                                                <>
                                                                    <p>{comment.userWhoPostedComment}</p>
                                                                    <p>{comment.commentMessage}</p>
                                                                    <button onClick={(e) => {
                                                                        e.preventDefault();
                                                                        axios.delete("http://localhost:8000/api/deleteComment/" + comment.commentId, {withCredentials: true})
                                                                            .then(res => {
                                                                                setCount(count => count+ 1);
                                                                            })
                                                                            .catch(err => console.log(err));
                                                                    }}>Delete</button>
                                                                </>
                                                                
                                                                : 
                                                                
                                                                <>
                                                                    <p>{comment.userWhoPostedComment}</p>
                                                                    <p>{comment.commentMessage}</p>
                                                                </>
                                                                }
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </>
                                        :
                                        <>
                                            <p>{post.post.userPostingName}</p>
                                            <p>{post.post.message}</p>
                                            <p>Likes {post.numberOfLikes} | Comments {post.numberOfComments}</p>

                                            {post.userLoggedInIdAlreadyLikedPost === true ? 
                                            <button onClick={(e) => {
                                                axios.delete('http://localhost:8000/api/unlikePost/' + post.likes,
                                                {withCredentials: true})
                                                    .then(res => {
                                                        console.log(res);
                                                        setCount(count => count + 1);
                                                    })
                                                    .catch(err => console.log(err));
                                            }}>Unlike Post</button>
                                            :
                                            <button onClick={(e) => {
                                                axios.post('http://localhost:8000/api/likePost/' + post.post._id, 
                                                {fullName}, {withCredentials: true})
                                                    .then(res => {
                                                        console.log(res);
                                                        setCount(count => count + 1);
                                                    })
                                                    .catch(err => console.log(err));
                                            }}>Like Post</button>
                                        }

                                            <button onClick={(e) => {
                                                if (commentFormPopulate === false) {
                                                    setCommentFormPopulate(true);
                                                    setCommentIndexForCommentFormPopulate(index);
                                                } else {
                                                    setCommentFormPopulate(false);
                                                    setCommentIndexForCommentFormPopulate(null);
                                                }
                                            }}>Comment</button>
                                        </>
                                }
                                </div>
                            )
                        })
                    }
                </div>
                <div className='Live-Scores'>
                    <p><b>Live Scores</b></p>
                    {
                        baseball.map((baseball, index) => {
                            
                            return (
                                <div key={index}>
                                    <h1>{baseball.scores.home.total}</h1>
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
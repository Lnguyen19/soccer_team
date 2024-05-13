import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./recentGames.css";

const RecentGames = () => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [recent, setRecent] = useState([]);
    const [currentIndex, setCurrentIndex] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.post('https://soccerteam-953874d541a4.herokuapp.com/currentSession', {}, { withCredentials: true })
            .then((response) => {
                setEmail(response.data.email);
            })
            .catch(error => console.log(error));
        axios.get(`https://soccerteam-953874d541a4.herokuapp.com/checkAdmin/${email}`, { withCredentials: true })
            .then((response) => {
                setUser(response.data);
            })
            .catch(error => console.log(error));
    }, [email]);

    useEffect(() => {
        axios.get('https://soccerteam-953874d541a4.herokuapp.com/getRecent', { withCredentials: true })
            .then(response => {
                if (response.data) {
                    setRecent(response.data);
                    setCurrentIndex(
                        Object.fromEntries(
                            response.data.map((_, index) => [index, 0])
                        )
                    );
                } else {
                    console.log("No recent pictures available");
                }
            })
            .catch(error => console.log(error));
    }, []);

    const next = (entryIndex, length) => {
        setCurrentIndex(prevState => ({
            ...prevState,
            [entryIndex]: (prevState[entryIndex] + 1) % length
        }));
    };

    const prev = (entryIndex, length) => {
        setCurrentIndex(prevState => ({
            ...prevState,
            [entryIndex]: (prevState[entryIndex] - 1 + length) % length
        }));
    };

    const goTo = (entryIndex, index) => {
        setCurrentIndex(prevState => ({
            ...prevState,
            [entryIndex]: index
        }));
    };

    const checkUser = (user) => {
        return user === true;
    };

    return (
         <>
            {checkUser(user.admin) === true ? (
                <div className='deter'><button onClick={() => navigate('/recentGames')}>Add a Recent Game</button></div>
            ) : (
                <div className='deter'>Stay Tune for Upcoming Games</div>
            )}

            <h1 className='recentSection'>Recent Games</h1>

            {recent.length === 0 ? (
                <div>No recent pictures available</div>
            ) : (
                <div>
                    {recent.map((entry, entryIndex) => (
                        <div key={entryIndex}>
                            <div className="card cardColor">
                                <div className='title_'>
                                    <label>{entry.title}</label>
                                </div>
                                <div>
                                    <div className="left-arrow" onClick={() => prev(entryIndex, entry.media.length)}>
                                        <i className="bi bi-arrow-left-circle"></i>
                                    </div>
                                    <div className="right-arrow" onClick={() => next(entryIndex, entry.media.length)}>
                                        <i className="bi bi-arrow-right-circle"></i>
                                    </div>
                                </div>

                                {entry.media[currentIndex[entryIndex]].type==='picture'?(<div className="slider" style={{ backgroundImage: `url(${entry.media[currentIndex[entryIndex]].url})` }}></div>):(
                                <div id = "vid_demo">
    <iframe
       
        src={`https://www.youtube.com/embed/${entry.media[currentIndex[entryIndex]].url}?autoplay=1`}
       
      class = 'vids'></iframe>
</div>

                                    )}
                                <div className="dots">
                                    {entry.media.map((_, index) => (
                                        <div className='dot-container' key={index}>
                                            <i className={`bi bi-circle-fill${index === currentIndex[entryIndex] ? ' active' : ''}`} onClick={() => goTo(entryIndex, index)}></i>
                                        </div>
                                    ))}
                                </div>
                                <div className="description">
                                    <p>{entry.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
      
    );
};

export default RecentGames
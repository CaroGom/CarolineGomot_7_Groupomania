import React, { useContext } from 'react';
import NewPostForm from '../components/Posts/NewPostForm';
import Thread from '../components/Thread';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';

const Home = () => {

    const userId=JSON.parse(localStorage.getItem('userdata'));
    console.log(userId.user);

    if (!userId) {
        window.location

    }

    const uid = useContext(UidContext)
    console.log(uid);


    return (
        <div className='home'>
            <div className='main'>
                <div className = "home-header">
                    
                    
                    { userId.user ? <p>Hello</p> : <p>Pas coucou</p>
                }

                { userId.user ? <NewPostForm/> : <Log signin={true} signup={false}/>
                }
                </div>
                    
                {userId.user ? <Thread/> : <h2>Hello ! <a href="/connexion"  rel="noopener noreferrer"> Connectez-vous </a></h2>}
 
            </div>
            
        </div>
    );
};

export default Home;

//
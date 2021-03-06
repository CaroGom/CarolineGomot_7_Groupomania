import React, { useContext } from 'react';
import Log from '../components/Log'
import { UidContext } from '../components/AppContext';

const Connexion = () => {
    const uid= useContext(UidContext);
    return (
        <div className='profil-page'>
            { uid ? ( 
            <h1>Page update</h1>
            ) : ( <div className='log-container'>
            <Log signin={true} signup={false} />
            <div className='img-container'>
                <img src='./img/icon.svg' alt='img log'/>
            </div>
        </div> )
         }
            
        </div>
    );
};

export default Connexion;
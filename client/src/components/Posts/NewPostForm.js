import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {isEmpty} from '../../utils/Utils';

const NewPostForm = () => {
    //const [isLoading, setIsLoading]= useState(true)
    const [message, setMessage] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer)
    console.log(userData)
    //const userData= JSON.parse(localStorage.getItem('userdata'))

    const handlePost = () => {
        if (message || postImage) {
            const data = new FormData();
            data.append('posterId', userData._id)
            data.append('message', userData.message)
        }else {
            alert('Veuillez saisir un message')
        }

    }

    const handlePicture = (e) => {
        setPostImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target[0])
    };



    
    const cancelPost = () => {
        setMessage('');
        setPostImage('');
        setFile('');

    }


    return(
    <div className='post-container'>
        <div className="data">
           <div>
            <div className='user-info'>
                <p>Composez un post</p>
            </div>
            <div className='post-form'>
            <textarea
                name="message"
                id="message"
                placeholder="Hello !"
                onChange={(e) => setMessage(e.target.value)}
                value= {message}
            />
           
           
            <div className='footer-form'>
                <div className='icon'>
                    <img src='./img/icons/picture.svg' alt="add image"/>
                    <input 
                    type="file" 
                    id="file-upload" 
                    name="file" 
                    accept=".jpg, .jpeg, .png" 
                    onChange={(e) => handlePicture(e)}/>


                </div>
                <div className='btn-send'>
                    {message || postImage ? (
                        <button className='cancel'  onClick={cancelPost}>Annuler le post</button>
                    ) : null}
                    
                    <button className='send' onClick={handlePost}>Envoyer</button>
                </div>

            </div>

            </div>
            
            </div>

        </div>
      
    </div>

    )
 

}

export default NewPostForm;

 /*{message || postImage ? (
                <li className='card-container'>
                    <div className='card-right'>
                        <div className='content'>
                            <p>{message}</p>
                            <img src={postImage} alt="illustration du post"/>
            
                        </div>
                    </div>
                </li>
            ) : null }*/
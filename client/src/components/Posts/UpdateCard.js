import React, { useContext } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { UserContext } from '../AppContext';


const UpdateCard = ({ postInfos }) => {

    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(postInfos.message);
    const token = JSON.parse(localStorage.getItem('userdata'));
    const image = postInfos.image;
    const user = useContext(UserContext);
    console.log(textUpdate)

    const updateItem = () => {

        const data = {
            message: textUpdate,

        }
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postInfos._id}`,
            data: { data },
            headers: {
                Authorization: `Bearer ${token.token}`,
                
            },

        })
            .then((res) => console.log(data))
            .catch((err) => console.log('erreur front'))
    }




    //const updatePost = (postId, message) => {




    return (

        <div>
            
            {isUpdated === true && (
                <div>
                    <div> {postInfos.image ? (
                        <img src={postInfos.image}
                            alt="card-pic"
                            className="card-pic" />
                    ) : null}</div>

                    <div className="update-post">
                        <textarea
                            defaultValue={postInfos.message}
                            onChange={(e) => setTextUpdate(e.target.value)} />
                        <div className="button-container">
                            <button className="btn" onClick={updateItem}>Valider modification</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                </div>

            </div>
            </div>
    )
            
}


            export default UpdateCard;

/*<div onClick={() => setIsUpdated(!isUpdated)}>
                                <img src="./img/icons/edit.svg" alt="edit"/>
                            </div>
    { user.admin === true ? (
      <div className="button-container">
      <div onClick={() => setIsUpdated(!isUpdated)}>
          <img src="./img/icons/edit.svg" alt="edit"/>
      </div>
      
 </div>
    ): token.userId === postInfos.posterId  && (
       <div className="button-container">
            <div onClick={() => setIsUpdated(!isUpdated)}>
                <img src="./img/icons/edit.svg" alt="edit"/>
            </div>
            
       </div>
        ) 

      }*/
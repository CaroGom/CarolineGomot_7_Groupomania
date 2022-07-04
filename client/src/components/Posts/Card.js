import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import moment from 'moment';
import 'moment/locale/fr';
import LikeButton from "./LikeButton";
moment.locale('fr');

/*function Card  ({ item })  {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch= useDispatch();
//console.log(usersData);
//console.log(userData);
console.log(item);
useEffect(() => {
    !isEmpty(userData[0]) && setIsLoading(false);
}, [userData])*/

export default function Card(props) {
    const dispatch = useDispatch();
    const [isUpdated, setIsUpdated]=useState(false);
    const [textUpdate, setTextUpdate]=useState(null);
    //const userId=(localStorage.getItem('userId'));
    //const [toggleCmt, setToggleCmt] = useState(false);
    const token = JSON.parse(localStorage.getItem('userdata'));
    // const id = JSON.parse(localStorage.getItem('token')).user;
     console.log(token.user);

 
    const [post, setPost] = useState({
       
      _id: props._id,
      message: props.message,
      image: props.image,
    });
    console.log('props', props);
    console.log('propsID', props.id);

    
  const { commentArray, postArray, userInfo } = useSelector((state) => ({
    //...state.commentReducer,
    ...state.postReducer,
    ...state.userReducer,
  }));

  console.log(token.user, props.posterId);

  const updateItem = async () => {};
 
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, {
        headers: { Authorization: `Bearer  ${token.token}` },
      })
      .then((response) => {
        setPost(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token.token]);

    return (
        <li className="card-container" key={props._id}>
            
                <div className="card-right">
                    <div className="card-header">
                        <div className="pseudo">
                            
                                <h3>
                                {props.posterEmail}
                                </h3>
                            
                        </div>
                            <span>{moment(props.createdAt).format('LLL')}</span>
                    </div>
                    {isUpdated ===false && <p>{props.message}</p>}
                    {isUpdated ==true && (
                       <div className="update-post">
                       <textarea
                      defaultValue={post.message}
                      onChange={(e) => setTextUpdate(e.target.value)}/>
                      <div className="button-container">
                          <button className="btn" onClick={updateItem}>Valider modification</button>
                      </div>
                      </div>)}
                   
                    { props.image ? (
                    <img src={props.image} 
                    alt="card-pic" 
                    className="card-pic" />
                    ): null}
                    
                    { token.user == props.posterId && (
                       <div className="button-container">
                            <div onClick={() => setIsUpdated(!isUpdated)}>
                                <img src="./img/icons/edit.svg" alt="edit"/>
                            </div>
                       </div>
                        )

                      }
                    <div className="card-footer">
                      <LikeButton props = {props}/>
                      
                      </div>
                </div>
            
        </li>
    )
}


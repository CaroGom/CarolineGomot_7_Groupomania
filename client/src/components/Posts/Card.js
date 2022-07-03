import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import dateParser, { isEmpty } from '../../utils/Utils';

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
    //const [toggleCmt, setToggleCmt] = useState(false);
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

  const token = JSON.parse(localStorage.getItem('userdata'));
 // const id = JSON.parse(localStorage.getItem('token')).user;
  console.log(token.user);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, {
        headers: { Authorization: `Bearer ${token.token}` },
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
                                {props.posterId}
                                </h3>
                            
                        </div>

                    </div>

                </div>
            
        </li>
    )
}


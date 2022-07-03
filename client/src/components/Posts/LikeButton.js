import React, {useEffect, useState } from 'react';
import axios from 'axios';

function Like(props) {
    const [likes, setLikes] =useState(0);
    const [likedAction, setLikedAction]= useState(false);
    const token = JSON.parse(localStorage.getItam('userdata'));
    const id = JSON.parse(localStorage.getItem('userdata')).user;

    const getLikes = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}api/auth/` + id, 
        { postId: props.postId },
        
            {headers: {
                'Authorization': `Bearer `+ token.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}
            ,)
    
        }
    };


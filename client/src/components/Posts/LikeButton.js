import React, {useEffect, useState, useContext } from 'react';
//import axios from 'axios';
import { useDispatch } from 'react-redux';
//import { UidContext } from '../AppContext';
import { likePost, unlikePost } from'../../actions/post.actions';

function LikeButton(props) {
    const [liked, setLiked] =useState(false);
    //const [likedAction, setLikedAction]= useState(false);
    const dispatch = useDispatch();
    const userId= localStorage.getItem('userId');

    console.log(props)
    console.log(userId)
    console.log('propsID', props.props.id);

    const like = () => {
        dispatch(likePost(props.props.id, userId))
        setLiked(true)
    }

    const unlike = () => {
        dispatch(unlikePost(props.props.id, userId))
        setLiked(false)
    }

    useEffect(() => {
        if(props.props.likers.includes(userId)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [userId, props.props.likers, liked])

   // console.log(uid)

    return(
        <div className='Like-container'>
            {userId && liked === false && (
                <img src="./img/icons/heart.svg" onClick={like} alt="like" />
            )}
            {userId && liked && (
                <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike"/>
            )}
            <span>{props.props.likers.length}</span>
        </div>
    )
}

export default LikeButton;
   /* const token = JSON.parse(localStorage.getItam('userdata'));
    const id = JSON.parse(localStorage.getItem('userdata')).user;
*/



    /*

    const getLikes = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API_URL}api/auth/` + id, 
        { postPostId: props.postPostId },
        
            {headers: {
                'Authorization': `Bearer `+ token.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }}
            ,);
        setLikes(data.likers.length);
        data.likers.map((like) => {
            if (likers.userId === id && likers.postPostId === props.postPostId) {
                set likedAction(true);
            }
        })
    
        }

    useEffect(() =>{
        getLikes();
    }, []);

    const likePost = (postId) => {
        axios 
        .post
    }
        
    }*/


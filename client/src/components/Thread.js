import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../actions/post.actions';

const Thread = () => {

    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [loadPost])
    return (
        <div></div>
    )
}

export default Thread;
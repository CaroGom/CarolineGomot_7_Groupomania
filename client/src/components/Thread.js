import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import { isEmpty } from '../utils/Utils';
import Card from '../components/Posts/Card'


const Thread = () => {
    const { postArray,  } = useSelector((state) => ({
        ...state.postReducer,}))

    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);
    

    console.log(posts.postArray);

    useEffect(() => {
        async function allPosts() {
            const result = await getPosts;
            if (!result) {
                console.log('erreur');
            } else {
                dispatch(getPosts())
            }
        }
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false)
        }
    }, [])
    return (
        <div className='thread-container'>
                  {posts.postArray.length > 0 ? (
            <ul >
              {postArray.map((item) => {
              
                return<Card item={item} key={item._id}/>;
               
})}
            </ul>
          ) : (
            <section id="publications" className="no feed">
              <p className="4">Aucune publication</p>
            </section>
          )}
        </div>
    )
}
export default Thread;

/*    return (
        <div className='thread-container'>
                  {postArray.length > 0 ? (
            <ul >
              {postArray.map((item) => (
                
                <Card>
             
                  key={'id' + item._id}

                  createdAt={item.createdAt}

                  imagePost={item.image}
                  description={item.message}
                  likes={item.likes}
                  
                  </Card>
              ))}
            </ul>
          ) : (
            <section id="publications" className="no feed">
              <p className="4">Aucune publication</p>
            </section>
          )}
        </div>
    )
}*/ 
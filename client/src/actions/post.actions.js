import axios from "axios";

const token = localStorage.getItem('token');

//posts 
export const GET_POSTS = "GET_POSTS";

export const getPosts = () => {
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/post/`,
            
            {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type': 'application/json'
                    },
            })
            .then((res) => {
                dispatch ({ type: GET_POSTS, payload: res.data })
            })
            .catch ((err) => console.log(err))

        
    }
}


//comments
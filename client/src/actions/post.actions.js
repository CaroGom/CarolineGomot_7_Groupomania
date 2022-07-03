import axios from "axios";

const accessToken = JSON.parse(localStorage.getItem('userdata'));

//posts 
export const GET_POSTS = "GET_POSTS";

export const getPosts = () => {
    return (dispatch) => {
        return axios 
            .get(`${process.env.REACT_APP_API_URL}api/post/`,
            
            {
                headers: {
                    'Authorization' : `Bearer` + accessToken.token ,
                    
                    },
            })
            .then((res) => {
                dispatch ({ type: GET_POSTS, payload: res.data })
                console.log(res.data)
            })
            .catch ((err) => console.log(err))

        
    }
}


//comments
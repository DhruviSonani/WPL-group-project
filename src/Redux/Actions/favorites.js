import { FAVORITE, ADDFAVORITE, DELETEFAVORITE, GETALLFAVORITE } from "../../Common/endPoints";
import { APP_ADDED, TUTOR_DATA, SET_FAV_CLICKED, FAV_DATA } from '../../Redux/type'
import axios from "../../Common/axiosInstance";

// add favorites
export const addFavorite = (props) =>{
    return (dispatch) => {
        axios({
            method: "post",
            url: FAVORITE + ADDFAVORITE,
            data: props.data,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: APP_ADDED, payload: data.status });
        })
            .catch(console.log)
    };
}

export const removeFavorites = ({id}) =>{
    return (dispatch) => {
        axios({
            method: "delete",
            url: FAVORITE + DELETEFAVORITE + id ,
            
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: APP_ADDED, payload: data.status });
        })
            .catch(console.log)
    };
}

// Get fav prof
export const getFavoriteProfessors  = ({id}) =>{
    return (dispatch)=>{
        axios({
            method:'post',
            url: FAVORITE + GETALLFAVORITE,
            data:{
                'id':id 
            }
        }).then(data=>{
            dispatch({ type: FAV_DATA, payload: data.data });
        }).catch(err=>{
            console.error(err);
        })
    }
 }


//  Set fav true
export const enableFavFlag = ({val})=>{
    return (dispatch)=>{
        dispatch({type: SET_FAV_CLICKED, payload: val})
    }
}
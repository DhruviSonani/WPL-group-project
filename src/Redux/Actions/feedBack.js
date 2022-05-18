import {FEEDBACK, ADDFEEDBACK } from "../../Common/endPoints";
import { APP_ADDED } from '../../Redux/type'
import axios from "../../Common/axiosInstance";

// add favorites
export const addFeedback = (props) =>{
    return (dispatch) => {
        axios({
            method: "put",
            url: FEEDBACK + ADDFEEDBACK +props.id ,
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
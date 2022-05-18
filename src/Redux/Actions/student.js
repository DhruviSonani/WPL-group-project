import { STUDENTS, GETALLSTUDENTS, GETALLFAVORITE } from "../../Common/endPoints";
import {STUDENT_DATA} from '../type'

import axios from "../../Common/axiosInstance";

export const getStudentdetails=({id})=>{
    return (dispatch) => {
        axios({
            method: 'get',
            url: STUDENTS + GETALLSTUDENTS +"/" +id,
            
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            console.log(data);
            dispatch({ type: STUDENT_DATA, payload: data.data[0] });
        })
            .catch(console.log)
    };
}

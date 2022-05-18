import { APPOINTMENTS, DELETEAPPOINTMENT, BOOKAPPOINTMENT } from "../../Common/endPoints";
import { APP_ADDED } from '../../Redux/type'
import axios from "../../Common/axiosInstance";

// add or update appointmetn
export const addUpdateAppointment = (props) => {
    return (dispatch) => {
        axios({
            method: props.method,
            url: APPOINTMENTS + props.endPoint,
            data: props.data,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: APP_ADDED, payload: data.data._id });
        })
            .catch(console.log)
    };
}

// delete appointment
export const deleteAppointment = ({ id }) => {
    return (dispatch) => {
        axios({
            method: 'delete',
            url: APPOINTMENTS + DELETEAPPOINTMENT + "/" + id,

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: APP_ADDED, payload: id });

        })
            .catch(console.log)
    };
}


// Book appointment
export const bookAppointment = ( data) =>{
    return (dispatch) => {
        axios({
            method: "put",
            url: APPOINTMENTS + BOOKAPPOINTMENT + data.id,
            data: data.body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            console.log( "abc : ",data.status);
            dispatch({ type: APP_ADDED, payload: data.status });
        })
            .catch(console.log)
    };
}
import axios from '../../Common/axiosInstance'
import { AUTH, LOGIN } from "../../Common/endPoints";
import { AUTHENTICATION } from "../type";

export const loginHandler = (val) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: AUTH + LOGIN,
            data: {
                "email": val.email,
                "pwd": val.pwd
            }
        }).then(resp => {
            dispatch({ type: AUTHENTICATION, payload: resp.data })
        }).catch(err => {
            console.log(err);
        })
    }
}
import axios from '../../Common/axiosInstance'
import { AUTH, LOGIN, REGISTER } from "../../Common/endPoints";
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
            dispatch({ type: AUTHENTICATION, payload: resp.data[0] })
        }).catch(err => {
            console.log(err);
        })
    }
}

export const registerHandler = ({ data }) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: AUTH + REGISTER + "/" + data.email,
            data: {
                "pwd": data.pwd
            }
        }).then(resp => {
            dispatch({ type: AUTHENTICATION, payload: resp.data[0] })
        }).catch(err => {
            console.log(err);
        })
    }
}
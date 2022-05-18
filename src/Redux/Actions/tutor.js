import { TUTOR_DATA, PROF_DETAIL, FILTERED_DATA, SEARCH_BAR, APP_ADDED, COURSE_DATA, APPOINTMENT_DATA, TUTORING_DATA } from "../type";

import _ from 'lodash'
import axios from '../../Common/axiosInstance'
import { GETALLTUTOR, TUTOR, GETALLCOURSES, COURSES, ADDTUTOR, DELETETUTOR, APPOINTMENTS, GETALLAPPOINTMENTS, GETTUTORINGDATA } from "../../Common/endPoints";

export const fetchTutorData = (data) => {
   
    const url = data?.id ? TUTOR + GETALLTUTOR + data?.id : TUTOR + GETALLTUTOR
    return (dispatch) => {
        axios({
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: TUTOR_DATA, payload: data.data });
        })
            .catch(console.log)
    };
}

export const addUpdateTutor = (props) => {
    return (dispatch) => {
        axios({
            method: props.method,
            url: TUTOR + props.endPoint,
            data: props.data,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: PROF_DETAIL, payload: "success" });
        })
            .catch(console.log)
    };
}

export const findProf = ({ searchVal, profVal }) => {
    return async (dispatch) => {

        if (searchVal.trim() == "") {
            dispatch({ type: FILTERED_DATA, payload: profVal });
        }
        else {

            let filteredData = profVal.filter(value => {
                const lower = value.courses.map(element => {
                    return element.label.toLowerCase();
                });
                return (value.fname.toLowerCase().includes(searchVal.toLowerCase()) ||
                    value.lname.toLowerCase().includes(searchVal.toLowerCase()) ||
                    value.about.toLowerCase().includes(searchVal.toLowerCase()) ||
                    value.email.toLowerCase().includes(searchVal.toLowerCase()) ||
                    lower.some(item=>item.includes(searchVal.toLowerCase()))
                )
            });
            console.log(filteredData)
            dispatch({ type: FILTERED_DATA, payload: filteredData });

        }
    }
}

export const deleteTutor = ({ id }) => {
    return (dispatch) => {
        axios({
            method: 'delete',
            url: TUTOR + DELETETUTOR + "/" + id,

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: PROF_DETAIL, payload: id });
        })
            .catch(console.log)
    };
}

export const searchToggleHanler = (val) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_BAR, payload: val });
    }
}

export const toggleProfDetails = (val) => {
    return async (dispatch) => {
        dispatch({ type: PROF_DETAIL, payload: val })
        dispatch({type : APP_ADDED, payload: false})
    }
}

export const showAllTutor = (val) => {
    return async (dispatch) => {
        dispatch({ type: TUTOR_DATA, payload: val });
    }
}

export const getAllCourses = (val) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: COURSES + GETALLCOURSES,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: COURSE_DATA, payload: data.data });
        })
            .catch(console.log)
    };
}

export const getAllAppointments = (val) => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: APPOINTMENTS + GETALLAPPOINTMENTS + val.id,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: APPOINTMENT_DATA, payload: data.data });
        })
            .catch(console.log)
    };
}

export const  getTutoringData = ({id}) =>{
    return (dispatch) => {
        axios({
            method: 'post',
            url: TUTOR + GETTUTORINGDATA ,
            data: {
                "id" : id 
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((data) => {
            dispatch({ type: TUTORING_DATA, payload: data.data[0] });
        })
            .catch(console.log)
    };
}

// const debouncedSearch = _.debounce(async function ({ searchVal, profVal }) {
//     return async (dispatch) => {
//         dispatch(findProf({ searchVal: searchVal, profVal: profVal }))
//     }
// }, 1000);

// export const onChangeSearchInput = ({ evt, profVal }) => {
//     return async (dispatch) => {
//         const searchVal = evt.target.value
//         debouncedSearch({ searchVal, profVal })
//     }
// }
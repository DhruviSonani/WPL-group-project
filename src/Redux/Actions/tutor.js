import { TUTOR_DATA, PROF_DETAIL, FILTERED_DATA, SEARCH_BAR } from "../type";

import _ from 'lodash'
import axios from '../../Common/axiosInstance'
import { GETALLTUTOR, TUTOR } from "../../Common/endPoints";

export const fetchTutorData = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: TUTOR + GETALLTUTOR,
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

export const findProf = ({ searchVal, profVal }) => {
    return async (dispatch) => {
        if (searchVal.trim() == "") {
            dispatch({ type: FILTERED_DATA, payload: profVal });
        }
        else {

            let filteredData = profVal.filter(value => {
                const lower = value.expertise.map(element => {
                    return element.toLowerCase();
                });
                return (value.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                    value.about.toLowerCase().includes(searchVal.toLowerCase()) ||
                    value.email.toLowerCase().includes(searchVal.toLowerCase()) ||
                    lower.includes(searchVal.toLowerCase())
                )
            });
            dispatch({ type: FILTERED_DATA, payload: filteredData });

        }
    }
}

export const searchToggleHanler = (val) => {
    return async (dispatch) => {
        dispatch({ type: SEARCH_BAR, payload: val });
    }
}

export const toggleProfDetails = (val) => {
    return async (dispatch) => {
        dispatch({ type: PROF_DETAIL, payload: val })
    }
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
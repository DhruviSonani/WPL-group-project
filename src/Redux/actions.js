import { TUTOR_DATA, PROF_DETAIL, FILTERED_DATA, SEARCH_BAR } from "./type";

import _ from 'lodash'
export const fetchTutorData = () => {
    return (dispatch) => {
        fetch('JSON/tutors.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                dispatch({ type: TUTOR_DATA, payload: data });
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
                return (value.name.toLowerCase().includes(searchVal.toLowerCase()) ||
                    value.about.toLowerCase().includes(searchVal.toLowerCase()) ||
                    value.email.toLowerCase().includes(searchVal.toLowerCase())
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
    console.log("Val : ", val)
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
import { TUTOR_DATA, FILTERED_DATA, SEARCH_BAR, PROF_DETAIL } from "./type";

const initialValues = {
    tutorData: "",
    filteredData: "",
    searchBar: false
};

const reducer = (state = initialValues, action) => {
    switch (action.type) {
        case TUTOR_DATA:
            return {
                ...state,
                tutorData: action.payload,
                filteredData: action.payload
            };
        case FILTERED_DATA:
            return {
                ...state,
                filteredData: action.payload,
            }
        case SEARCH_BAR:
            return {
                ...state,
                searchBar: action.payload
            }
        case PROF_DETAIL:
            return {
                ...state,
                profDetail: action.payload
            }

        default:
            return state;
    }
};

export default reducer;
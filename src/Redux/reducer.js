import { FAV_DATA, SET_FAV_CLICKED, TUTOR_DATA, STUDENT_DATA, FILTERED_DATA, APPOINTMENT_DATA, SEARCH_BAR, PROF_DETAIL, COURSE_DATA, AUTHENTICATION, APP_ADDED, TUTORING_DATA } from "./type";

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

        case COURSE_DATA:
            return {
                ...state,
                courseData: action.payload
            }
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

        case APPOINTMENT_DATA:
            return {
                ...state,
                appointmentData: action.payload
            }

        case AUTHENTICATION:
            return {
                ...state,
                loginS: action.payload
            }

        case APP_ADDED:
            return {
                ...state,
                appointment_op: action.payload
            }

        case STUDENT_DATA :return {
            ...state,
            particular_student : action.payload
        }

        case SET_FAV_CLICKED : return{
            ...state,
            showFavorite : action.payload
        }
        case FAV_DATA: return {
            ...state,
            favData : action.payload
        }
        case TUTORING_DATA: return {
            ...state,
            tutoring_data : action.payload
        }
        default:
            return state;
    }
};

export default reducer;
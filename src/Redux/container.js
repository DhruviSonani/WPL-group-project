import { connect } from "react-redux";
import { showAllTutor, fetchTutorData, findProf, searchToggleHanler, toggleProfDetails, getAllCourses, addUpdateTutor, deleteTutor, getAllAppointments, getTutoringData } from "./Actions/tutor";
import { addUpdateAppointment, deleteAppointment,bookAppointment } from './Actions/appointment'
import { getStudentdetails } from './Actions/student'
import {addFeedback} from './Actions/feedBack'
import {addFavorite, removeFavorites, getFavoriteProfessors, enableFavFlag } from './Actions/favorites'
import { loginHandler, registerHandler } from './Actions/auth';

import {header, desktop, searchModal, mobile, professor, features, professor_modal, add_Update_Professor_modal, dashboard, login, register, delete_prof, adminDashboard, tutorDashboard, add_update_appointment, book_appointment, favoritesScreen, rate_dialog } from '../Components'
import app from '../App'
const MapStateToProps = (state) => ({
    tutorData: state.tutorData,
    filteredData: state.filteredData,
    searchBar: state.searchBar,
    profDetail: state.profDetail,
    courseData: state.courseData,
    loginS: state.loginS,
    appointmentData: state.appointmentData,
    appointment_op: state.appointment_op,
    particular_student : state.particular_student,
    showFavorite : state.showFavorite,
    favData : state.favData,
    tutoring_data: state.tutoring_data
});

const dispatcher = {
    fetchTutorData,
    findProf,
    searchToggleHanler,
    toggleProfDetails,
    loginHandler,
    getAllCourses,
    addUpdateTutor,
    deleteTutor,
    showAllTutor,
    getAllAppointments,
    addUpdateAppointment,
    deleteAppointment,
    getStudentdetails,
    bookAppointment,
    addFavorite,
    removeFavorites,
    getFavoriteProfessors,
    enableFavFlag,
    addFeedback,
    getTutoringData,
    registerHandler
};

const WrapComponent = connect(MapStateToProps, dispatcher);
export const App = WrapComponent(app)
export const Login = WrapComponent(login)
export const Register = WrapComponent(register)
export const Desktop = WrapComponent(desktop)
export const Mobile = WrapComponent(mobile)
export const Dashboard = WrapComponent(dashboard)
export const SearchModal = WrapComponent(searchModal)
export const Professor = WrapComponent(professor)
export const Features = WrapComponent(features)
export const AdminDashboard = WrapComponent(adminDashboard)
export const Professor_modal = WrapComponent(professor_modal)
export const Add_Update_Professor_modal = WrapComponent(add_Update_Professor_modal)
export const Delete_prof = WrapComponent(delete_prof)
export const TutorDashboard = WrapComponent(tutorDashboard)
export const Add_update_appointment_Modal = WrapComponent(add_update_appointment)
export const Book_appointment = WrapComponent(book_appointment)
export const Header = WrapComponent(header)
export const Rate_dialog = WrapComponent(rate_dialog)
export const FavoritesScreen = WrapComponent(favoritesScreen)
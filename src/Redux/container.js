import { connect } from "react-redux";
import { fetchTutorData, findProf, searchToggleHanler, toggleProfDetails } from "./Actions/tutor";
import { loginHandler } from './Actions/auth';
import { desktop, searchModal, mobile, professor, features, professor_modal, add_Update_Professor_modal, dashboard, login, register } from '../Components'
import app from '../App'
const MapStateToProps = (state) => ({
    tutorData: state.tutorData,
    filteredData: state.filteredData,
    searchBar: state.searchBar,
    profDetail: state.profDetail
});

const dispatcher = {
    fetchTutorData,
    findProf,
    searchToggleHanler,
    toggleProfDetails,
    loginHandler
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
export const Professor_modal = WrapComponent(professor_modal)
export const Add_Update_Professor_modal = WrapComponent(add_Update_Professor_modal)
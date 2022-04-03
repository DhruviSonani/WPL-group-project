import { connect } from "react-redux";
import { fetchTutorData, findProf, searchToggleHanler, toggleProfDetails } from "./actions";
import app from "../App";
import { desktop, searchModal, mobile, professor, features, professor_modal } from '../Components'

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
    toggleProfDetails
};

const WrapComponent = connect(MapStateToProps, dispatcher);
export const App = WrapComponent(app);
export const Desktop = WrapComponent(desktop)
export const Mobile = WrapComponent(mobile)
export const SearchModal = WrapComponent(searchModal)
export const Professor = WrapComponent(professor)
export const Features = WrapComponent(features)
export const Professor_modal = WrapComponent(professor_modal)
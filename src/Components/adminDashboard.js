import React, { useEffect } from 'react'
import { Edit, Trash, Filled, Empty, Rate } from '../Images'
import { getLoginDetails } from '../Common/utils'
import {
    Add_Update_Professor_modal,
    Delete_prof,
    FavoritesScreen,
    Professor_modal,
    Rate_dialog,
} from "../Redux/container";

function Professor(props) {

    useEffect(() => {
        if (props.appointment_op == 200) {
            props.toggleProfDetails(false)
            props.fetchTutorData()
        }
    }, [props.appointment_op])

    return (

        props.showFavorite ?
            <FavoritesScreen />
            :

            <>
                <div className="vc_row-full-width vc_clearfix">
                    <h2 style={{ textAlign: 'center' }}>Professors</h2>
                </div>
                <div className="blog_layout_grid sidebar_position_none">
                    <div className="row professor-card">
                        {(props.filteredData || props.tutorData) && (props.filteredData || props.tutorData).map(tutor => {
                            return <div key={tutor._id} className="col-md-3 col-sm-4 col-xs-6 teacher-col prof-card"
                                onClick={(e) => {
                                    props.toggleProfDetails({ type: "details", id: tutor._id })
                                }
                                }
                            >
                                <div className="teacher_content">
                                    <div className="teacher_img">
                                        {getLoginDetails().role == 0 ?
                                            <div className='edit-prof d-grid'>
                                                <img src={Edit} alt="Edit prof" onClick={(e) => {
                                                    e.stopPropagation()
                                                    props.toggleProfDetails({ type: "edit", id: tutor._id })
                                                }} />

                                                <img src={Trash} alt="trash prof" onClick={(e) => {
                                                    props.toggleProfDetails({
                                                        type: "trash",
                                                        id: tutor._id,
                                                        msg: "Are you sure to delete this professor?",
                                                        onDelete: () => {
                                                            props.deleteTutor({ id: tutor._id })
                                                        }
                                                    })
                                                    e.stopPropagation()
                                                }} />
                                            </div>
                                            :
                                            // Favorites
                                            <>
                                                <div className='edit-prof d-grid'>
                                                    {
                                                        tutor.favorites.length > 0
                                                            ?
                                                            tutor.favorites.map(fav => {
                                                                if (fav.studentId == getLoginDetails()._id) {
                                                                    return <img src={Filled} alt="filled" onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        props.removeFavorites({ id: "/" + fav._id })
                                                                    }} />
                                                                }
                                                            })
                                                            :

                                                            <img src={Empty} alt="empty" onClick={(e) => {
                                                                e.stopPropagation()
                                                                const data = {
                                                                    tutorId: tutor.userId,
                                                                    studentId: getLoginDetails()._id
                                                                }
                                                                props.addFavorite({ data: data })
                                                                // props.toggleProfDetails({ type: "edit", id: tutor._id })
                                                            }} />
                                                    }

                                                    {tutor.feedBack.length == 0 &&
                                                        <img src={Rate} alt="rate prof" onClick={(e) => {
                                                            e.stopPropagation()
                                                            props.toggleProfDetails({ type: "rate", id: tutor._id, "name": tutor.name })
                                                        }} />
                                                    }
                                                </div>
                                            </>
                                        }
                                        <img width={270} height={180} src={tutor.image} alt={tutor.name} />
                                    </div>
                                    <a href="#" title="Watch teacher page">
                                        <h4 className="title">{tutor.fname} {tutor.lname}</h4>
                                    </a>

                                    <div className="content">
                                        {tutor.courses.map((item, index) => {
                                            return <span>
                                                {item.label} {index == tutor.courses.length - 1 ? "" : ","}  </span>
                                        })}
                                    </div>
                                </div>
                                <div className="multiseparator" />
                            </div>
                        })}
                    </div>
                </div>

                <button type="button" class="btn btn-primary" onClick={(e) => {
                    e.stopPropagation()
                    props.showAllTutor(props.tutorData)
                }}>Show All Tutors</button>

                {getLoginDetails().role == 0 &&

                    <button type="button" class="btn btn-primary ml-15" onClick={(e) => {
                        e.stopPropagation()
                        props.toggleProfDetails({ type: "add", id: null })
                    }}>Add New Professor</button>

                }
                {props.profDetail && props.profDetail.type == "details" && <Professor_modal />}
                {props.profDetail && props.profDetail.type == "edit" && <Add_Update_Professor_modal />}
                {props.profDetail && props.profDetail.type == "add" && <Add_Update_Professor_modal />}
                {props.profDetail && props.profDetail.type == "trash" && <Delete_prof />}
                {
                    props.profDetail && props.profDetail.type == "rate" && <Rate_dialog />
                }
            </>

    )
}


export default Professor
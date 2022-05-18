import React, { useEffect } from 'react'
import { getLoginDetails } from '../Common/utils'
import { Add_update_appointment_Modal, Delete_prof } from '../Redux/container'
import { Edit, Trash } from '../Images'
import Button from 'react-bootstrap/Button';
import moment from 'moment'

export const  convertHMS = (value) => {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    return hours + ':' + minutes; // Return is HH : MM : SS
}

function AppointmentListing(props1) {
    const { id, props, available, item } = props1


    return <>


        {
            props.appointmentData.map((item1, index) => {
                if (String(item1.courseId) == String(item) && "/" + String(item1.tutorId) == String(id) && item1.isAvailable == available) {

                    return <div className='d-flex appointment-time'>
                        <p id={index} onClick={() => {
                            props.toggleProfDetails({ type: "appointments", data: item1 })
                        }}>{moment(String(item1.date)).format("MMM DD")} [
                            {convertHMS(item1.startTime)}
                            -  {convertHMS(item1.endTime)}]
                        </p>

                        {!available && <a className='Meeting-link' href="https://google.com" target="_blank" rel="noopener noreferrer">Start Meeting</a>
                }
                        <img className='edit-appt' src={Edit} onClick={(e) => {
                            e.stopPropagation()
                            props.toggleProfDetails({ type: "appointments", data: item1 })
                        }} />

                        <img src={Trash} className="trash-appt" alt="trash prof" onClick={(e) => {
                            props.toggleProfDetails({
                                type: "trash",
                                initiated: "appt",
                                id: item1._id,
                                msg: "Are you sure on deleting this appointment?",
                                onDelete: () => props.deleteAppointment({ id: item1._id })
                            })
                            e.stopPropagation()
                        }} />


                    </div>
                }
            })
        }

    </>
}

function TutorDashboard(props) {
    const id = "/" + getLoginDetails()._id //userId

    useEffect(async () => {
        await props.getAllCourses()
        await props.getAllAppointments({ "id": id })
        await props.fetchTutorData({ "id": id })

        // if(props.appointment_op ){
        props.toggleProfDetails(false)
        // }
    }, [props.appointment_op])

    useEffect(()=>{
        props.getTutoringData({id : getLoginDetails()._id})
    },[])

    return (
        <>
            <div className="vc_row-full-width vc_clearfix">
                <h2 style={{ textAlign: 'center' }}>My Courses</h2>
                <p>My Average Rating - {props.tutoring_data?.avgRating}</p>
            </div>
            <div className='d-flex'>
                {props.tutorData[0]?.courses?.map((item, index) => {
                    console.log(props.courseData, item)
                    return <div key={index} className="col-md-3 col-sm-4 col-xs-6 teacher-col prof-card">
                        <div className="blog_layout_grid sidebar_position_none">
                            <div className="row professor-card">
                                <a href="#" title="Watch teacher page">
                                    <h4 className="title">{props.courseData[item]?.label}</h4>

                                    <Button variant="primary" onClick={() => {
                                        props.toggleProfDetails({
                                            type: "appointments", data: {
                                                courseId: item,
                                                tutorId: getLoginDetails()._id //initially it was userId
                                            }
                                        })
                                    }}>Add New Appointment</Button>

                                </a>

                                <div className="multiseparator" />
                                <p className='up_app'>Upcoming appointments</p>
                                {/* Upcoming */}
                                <AppointmentListing props={props} id={id} available={false} item={item} />

                                {/* All */}
                                <p className='up_app'>All appointments</p>
                                <AppointmentListing props={props} id={id} available={true} item={item} />
                            </div>
                        </div>
                    </div>
                })
                }
            </div>


            {props.profDetail && props.profDetail?.type == "appointments" && <Add_update_appointment_Modal />}
            {props.profDetail && props.profDetail.type == "trash" && <Delete_prof />}
        </>
    )
}


export default TutorDashboard
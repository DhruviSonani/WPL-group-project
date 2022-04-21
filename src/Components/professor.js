import React from 'react'
import { Edit, Trash } from '../Images'

function professor(props) {
    return (
        <>
            <div className="vc_row-full-width vc_clearfix">
                <h2 style={{ textAlign: 'center' }}>Our Professors</h2>
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
                                    <div className='edit-prof d-grid'>
                                        <img src={Edit} alt="Edit prof" onClick={(e) => {
                                            e.stopPropagation()
                                            props.toggleProfDetails({ type: "edit", id: tutor._id })
                                        }} />

                                        <img src={Trash} alt="trash prof" onClick={(e) => {
                                            e.stopPropagation()
                                            props.toggleProfDetails({ type: "trash", id: tutor._id })
                                        }} />
                                    </div>
                                    <img width={270} height={180} src={tutor.image} alt={tutor.name} />
                                </div>
                                <a href="#" title="Watch teacher page">
                                    <h4 className="title">{tutor.name}</h4>
                                </a>

                                <div className="content">
                                    {tutor.courses.map((item, index) => {
                                        return <span>
                                            {item.description} {index == tutor.courses.length - 1 ? "" : ","}  </span>
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
                props.toggleProfDetails({ type: "add", id: null })
            }}>Add New Professor</button>
        </>
    )
}


export default professor
import React from 'react'

function professor(props) {
    return (
        <>
            <div className="vc_row-full-width vc_clearfix">
                <h2 style={{ textAlign: 'center' }}>Our Professors</h2>
            </div>
            <div className="blog_layout_grid sidebar_position_none">
                <div className="row">
                    {(props.filteredData || props.tutorData) && (props.filteredData || props.tutorData).map(tutor => {
                        return <div key={tutor._id} className="col-md-3 col-sm-4 col-xs-6 teacher-col prof-card"
                            onClick={() => {
                                console.log(tutor._id);
                                props.toggleProfDetails(tutor._id)
                            }
                            }
                        >
                            <div className="teacher_content">
                                <div className="teacher_img">
                                    <img width={270} height={180} src={tutor.image} alt={tutor.name} />
                                </div>
                                <a href="#" title="Watch teacher page">
                                    <h4 className="title">{tutor.name}</h4>
                                </a>
                                <div className="content">
                                    <p>{tutor.expertise}</p>
                                </div>
                            </div>
                            <div className="multiseparator" />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}


export default professor
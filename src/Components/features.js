import React from 'react'

function features(props) {
    return (
        <>
            <div className="wpb_column vc_column_container vc_col-sm-3">
                <div className="vc_column-inner vc_custom_1434610589736">
                    <div className="wpb_wrapper">
                        <div className="icon_box vc_custom_1612467728429 standart clearfix" style={{ background: props.bg, color: '#ffffff' }}>
                            <div className="icon_alignment_center">
                                <div className="icon_text">
                                    <h3 style={{ color: '#ffffff' }}>{props.title}</h3>
                                    <p>{props.desc}</p>
                                </div>
                            </div> {/* align icons */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default features
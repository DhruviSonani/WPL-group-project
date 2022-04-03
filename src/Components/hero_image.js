import React from 'react'
import {
    hero_image,
} from '../Images'

function Hero_image() {
    return (
        <>
            <div data-vc-full-width="true" data-vc-full-width-init="true" data-vc-stretch-content="true" className="vc_row wpb_row vc_row-fluid vc_row-no-padding" style={{ position: 'relative', left: '-159.6px', boxSizing: 'border-box', width: '1519px' }}>
                <div className="wpb_column vc_column_container vc_col-sm-12">
                    <div className="vc_column-inner ">
                        <div className="wpb_wrapper">
                            <div className="wpb_single_image wpb_content_element vc_align_center">
                                <figure className="wpb_wrapper vc_figure">
                                    <div className="vc_single_image-wrapper   vc_box_border_grey">
                                        <img width={1800} height={787} src={hero_image} className="vc_single_image-img attachment-full" alt="" sizes="(max-width: 1800px) 100vw, 1800px" />
                                    </div>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Hero_image
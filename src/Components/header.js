import React from 'react'
import {
    Edura_b,
    transdperantLogo
} from '../Images'

function header() {
    return (
        <>

            <div className="col-md-3 col-sm-12 col-xs-12">
                <div className="logo-unit">
                    <a href="#">
                        <img className="img-responsive logo_transparent_static visible" src={transdperantLogo} style={{ width: '150px' }} alt="Tutorpedia" />
                        <img className="img-responsive logo_colored_fixed hidden" src={Edura_b} style={{ width: '100px' }} alt="Tutorpedia" />
                    </a>
                </div>
                {/* Navbar toggle MOBILE */}
                <button type="button" className="navbar-toggle collapsed hidden-lg hidden-md" data-toggle="collapse" data-target="#header_menu_toggler">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
            </div> {/* md-3 */}
            {/* MObile menu */}


        </>
    )
}


export default header
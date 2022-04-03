import React from 'react'
import {
    transdperantLogo
} from '../Images'
function footer() {
    return (
        <footer id="footer">
            <div className="footer_wrapper">
                <div id="footer_copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-sm-8">
                                <div className="clearfix">
                                    <div className="pull-left">
                                        <img className="footer_logo" src={transdperantLogo} width="50px" alt="Footer logo" />
                                    </div>
                                    <div className="copyright_text">Copyright © 2021 Edura, Inc. | <a target="_blank" href="#">Terms of Use</a> | <a target="_blank" href="#">Privacy Policy</a></div>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-4">
                                <div className="clearfix">
                                    <div className="pull-right xs-pull-left">
                                        {/* Header top bar Socials */}
                                        <div className="pull-right">
                                            <div className="copyright_socials">
                                                <ul className="clearfix">
                                                    <li><a href="https://www.facebook.com/utdallas/" target="_blank"><i className="fa fa-facebook" /></a></li>
                                                    <li><a href="https://twitter.com/UT_Dallas" target="_blank"><i className="fa fa-twitter" /></a></li>
                                                    <li><a href="https://www.linkedin.com/school/university-of-texas-at-dallas/mycompany/" target="_blank"><i className="fa fa-linkedin" /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pull-right xs-pull-left hidden-sm hidden-xs">
                                        <ul className="footer_menu heading_font clearfix">
                                            <li id="menu-item-1513" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-1513">
                                                <a href="#home">Home</a>
                                            </li>
                                            <li id="menu-item-1827" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1827">
                                                <a href="#about-us">About Us</a>
                                            </li>
                                            <li id="menu-item-1828" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1828">
                                                <a href="#contact-us">Contact Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default footer
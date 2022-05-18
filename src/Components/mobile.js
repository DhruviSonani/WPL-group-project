import React from 'react'
import { getLoginDetails } from '../Common/utils'

function Mobile(props) {
    return (
        <div className="col-xs-12 col-sm-12 visible-xs visible-sm">
            <div className="collapse navbar-collapse header-menu-mobile" id="header_menu_toggler">
                <ul className="header-menu clearfix">
                    <li id="menu-item-1510" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-1510">
                        <a href="#">Home</a>
                        <div className="magic_line" style={{ maxWidth: '0px' }} />
                    </li>
                    {
                        getLoginDetails().role == 2 &&
                        <li id="menu-item-2008" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2008">
                            <a href="#" onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                console.log("Click");
                                props.enableFavFlag({val: true})
                                props.getFavoriteProfessors({ id: getLoginDetails()._id })
                            }}>Favorites</a>
                            <div className="magic_line" style={{ maxWidth: '0px' }} />
                        </li>
                    }

                    <li id="menu-item-1665" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1665">
                        <a href="#">Logout</a>
                        <div className="magic_line" style={{ maxWidth: '0px' }} />
                    </li>
                    {getLoginDetails().role !== 1 &&
                        <li>
                            <form role="search" >
                                <div className="search-wrapper">
                                    <input placeholder="Search professor" type="text" className="form-control search-input"
                                        onChange={(e) =>
                                            this.props.onChangeSearchInput(e)
                                        }
                                    />
                                    <button className="search-submit" onClick={async (e) => {
                                        e.preventDefault()
                                        props.searchToggleHanler(!props.searchBar)
                                    }}><i className="fa fa-search" /></button>
                                </div>
                            </form>
                            {/* <div className="magic_line" style={{ maxWidth: '0px' }} /> */}
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}


export default Mobile
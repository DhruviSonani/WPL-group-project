import React from 'react'

function desktop(props) {
    return (
        <div className="col-md-8 col-md-offset-1 col-sm-9 col-sm-offset-0 hidden-xs hidden-sm">
            <div className="header_main_menu_wrapper clearfix" style={{ marginTop: '5px' }}>
                <div className="pull-right hidden-xs">
                    <div className="search-toggler-unit">
                        <div className="search-toggler" onClick={(e) => {
                            e.preventDefault()
                            props.searchToggleHanler(!props.searchBar)
                        }} ><i className="fa fa-search" /></div>
                    </div>
                </div>
                <div className="collapse navbar-collapse pull-right">
                    <ul className="header-menu clearfix">
                        <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-1510">
                            <a href="#">Home</a>
                            <div className="magic_line line_visible" style={{ maxWidth: '46px' }} />
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2008">
                            <a href="#">Favorites</a>
                            <div className="magic_line" style={{ maxWidth: '78px' }} />
                        </li>
                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1665">
                            <a href="#">Logout</a>
                            <div className="magic_line" style={{ maxWidth: '97px' }} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default desktop
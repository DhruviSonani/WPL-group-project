import React, { useState } from "react";
import { Edura_b, transdperantLogo } from "../Images";
import { getLoginDetails, removeLoginDetails } from '../Common/utils'

function Header(props) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <>
      <div className="col-md-3 col-sm-12 col-xs-12">
        <div className="logo-unit">
          <a href="#">
            <img
              className="img-responsive logo_transparent_static visible"
              src={transdperantLogo}
              style={{ width: "150px" }}
              alt="Tutorpedia"
            />
            <img
              className="img-responsive logo_colored_fixed hidden"
              src={Edura_b}
              style={{ width: "100px" }}
              alt="Tutorpedia"
            />
          </a>
        </div>
        {/* Navbar toggle MOBILE */}
        <button
          type="button"
          className="navbar-toggle hidden-lg hidden-md"
          data-toggle="collapse"
          data-target="#header_menu_toggler"
          onClick={handleNavCollapse}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <div className="col-xs-12 col-sm-12 visible-xs visible-sm">
          <div
            className={`${isNavCollapsed ? "collapse" : ""
              }  navbar-collapse header-menu-mobile`}
            id="header_menu_toggler"
          >
            <ul className="header-menu clearfix">
              <li
                id="menu-item-1510"
                className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-1510"
              >
                <a href="#">Home</a>
                <div className="magic_line" style={{ maxWidth: "0px" }} />
              </li>

              {
                getLoginDetails().role == 2 &&
                <li
                  id="menu-item-2008"
                  className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2008"
                >
                  <a href="#" onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    props.enableFavFlag({val: true})
                    props.getFavoriteProfessors({ id: getLoginDetails()._id })
                  }}
                  >Favorites</a>
                  <div className="magic_line" style={{ maxWidth: "0px" }} />
                </li>
              }


              <li
                id="menu-item-1665"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1665"
              >
                <a href="#"
                  onClick={() => {
                    removeLoginDetails()
                    window.location.reload()
                  }}
                >Logout</a>
                <div className="magic_line" style={{ maxWidth: "0px" }} />
              </li>
              {
                getLoginDetails().role != 1 &&
                <li>
                  <form role="search">
                    <div className="search-wrapper">
                      <input
                        placeholder="Search professor"
                        type="text"
                        className="form-control search-input"
                        onChange={(e) => props.onChangeSearchInput(e)}
                      />
                      <button
                        className="search-submit"
                        onClick={async (e) => {
                          e.preventDefault();
                          props.searchToggleHanler(!props.searchBar);
                        }}
                      ></button>
                    </div>
                  </form>
                  <div className="magic_line" style={{ maxWidth: "0px" }} />
                </li>}
            </ul>
          </div>
        </div>
      </div>{" "}
      {/* md-3 */}
      {/* MObile menu */}
    </>
  );
}

export default Header;

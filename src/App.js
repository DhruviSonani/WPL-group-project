import React, { Component } from "react";

import "./CSS/Homepage.scss";

import _ from "lodash";
import {
  Desktop,
  Features,
  Mobile,
  Professor,
  Professor_modal,
  SearchModal,
} from "./Redux/container";
import { Footer, Header, Hero_image, Import } from "./Components";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBarToggle: false,
      searchVal: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchTutorData();
  }

  onChangeSearchInput = (evt) => {
    this.debouncedSearch(evt.target.value);
  };

  debouncedSearch = _.debounce(async function (searchVal) {
    await this.props.findProf({
      searchVal: searchVal,
      profVal: this.props.tutorData,
    });
  }, 1000);

  render() {
    return (
      <div>
        <Import />
        <div id="wrapper">
          <div id="header" className="transparent_header" data-color>
            <div className="header_default">
              <div className="container">
                <div className="row">
                  <Header onChangeSearchInput={(e) => this.onChangeSearchInput(e)} />

                  <Mobile
                    onChangeSearchInput={(e) => this.onChangeSearchInput(e)}
                  />

                  {/* Desktop menu */}
                  <Desktop />
                </div>
              </div>
            </div>
          </div>
          <div id="main">
            {/* Breads */}
            <div className="breadcrumbs_holder" />
            <div className="container">
              <Hero_image />

              <div className="vc_row-full-width vc_clearfix" />

              <div
                data-vc-full-width="true"
                data-vc-full-width-init="true"
                className="vc_row wpb_row vc_row-fluid overflowed_content vc_custom_1436163428614 visible-xl visible-md visible-lg visible-xxl"
                style={{
                  position: "relative",
                  left: "-174.6px",
                  width: "1519px",
                  boxSizing: "border-box",
                  paddingLeft: "174.6px",
                  paddingRight: "174.4px",
                }}
              >
                <Features
                  bg={"#f07922"}
                  title={"SEARCH TUTORS"}
                  desc={
                    "Our mentors are experienced counselors and&nbsp;tutors passionate about achieving results"
                  }
                />
                <Features
                  bg={"#457992"}
                  title={"SCHEDULE AN APPOINTMENT"}
                  desc={
                    "Edura also offers tutoring by appointment. Book a visit in-person or online with an appointment."
                  }
                />
                <Features
                  bg={"#f0a822"}
                  title={"PROVIDE FEEDBACK"}
                  desc={
                    "Giving effective feedback is an essential part of the service that students provide tutors, the progress they’ve made and, with further refinement, can make through the tutoring sessions."
                  }
                />
                <Features
                  bg={"#004566"}
                  title={"NEED HELP?"}
                  desc={
                    <p>
                      Need help with technical issues? Call us at&nbsp;
                      <a
                        className="c-link"
                        href="tel:9728832270"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-stringify-link="tel:9728832270"
                        data-sk="tooltip_parent"
                      >
                        972-883-2270
                      </a>
                      , or email on{" "}
                      <a href="mailto:admission@utdallas.edu" target="_blank">
                        contact email
                      </a>
                      .
                    </p>
                  }
                />
              </div>
              <div
                data-vc-full-width="true"
                data-vc-full-width-init="true"
                className="vc_row wpb_row vc_row-fluid overflowed_content vc_custom_1436163428614 visible-xs visible-sm"
                style={{
                  position: "relative",
                  boxSizing: "border-box",
                  paddingLeft: "174.6px",
                  paddingRight: "174.4px",
                }}
              >
                <Features
                  bg={"#f07922"}
                  title={"SEARCH TUTORS"}
                  desc={
                    "Our mentors are experienced counselors and&nbsp;tutors passionate about achieving results"
                  }
                />
                <Features
                  bg={"#457992"}
                  title={"SCHEDULE AN APPOINTMENT"}
                  desc={
                    "Edura also offers tutoring by appointment. Book a visit in-person or online with an appointment."
                  }
                />
                <Features
                  bg={"#f0a822"}
                  title={"PROVIDE FEEDBACK"}
                  desc={
                    "Giving effective feedback is an essential part of the service that students provide tutors, the progress they’ve made and, with further refinement, can make through the tutoring sessions."
                  }
                />
                <Features
                  bg={"#004566"}
                  title={"NEED HELP?"}
                  desc={
                    <p>
                      Need help with technical issues? Call us at&nbsp;
                      <a
                        className="c-link"
                        href="tel:9728832270"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-stringify-link="tel:9728832270"
                        data-sk="tooltip_parent"
                      >
                        972-883-2270
                      </a>
                      , or email on{" "}
                      <a href="mailto:admission@utdallas.edu" target="_blank">
                        contact email
                      </a>
                      .
                    </p>
                  }
                />
              </div>
              <Professor />
              <div className="vc_row wpb_row vc_row-fluid">
                <div className="wpb_column vc_column_container vc_col-sm-12">
                  <div className="vc_column-inner ">
                    <div className="wpb_wrapper">
                      <div
                        className="vc_empty_space"
                        style={{ height: "18px" }}
                      >
                        <span className="vc_empty_space_inner" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />

        <SearchModal onChangeSearchInput={(e) => this.onChangeSearchInput(e)} />
        {this.props.profDetail && <Professor_modal />}
      </div>
    );
  }
}

export default App;

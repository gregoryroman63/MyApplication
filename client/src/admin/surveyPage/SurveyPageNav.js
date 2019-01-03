import React from "react";
import { Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./SurveyNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

class SurveyNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      search: ""
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleSearchInput = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
    this.props.searchForFeedbacks(value);
  };
  searchOnClick = e => {
    this.props.history.push("/feedbackpage");
  };
  render() {
    const { isOpen } = this.state;
    const { toggle, searchOnClick } = this;
    return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand-md" id="navBar">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem id="navItemHome">
                  <NavLink to={"/"} className="navLinks">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={"/feedbackpage"} className="navLinks">
                    Cohorts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <div className="input-group col-md-12">
                    <span className="input-group-append">
                      <button
                        id="searchBtn"
                        className="btn btn-outline-secondary"
                        type="submit"
                        onClick={searchOnClick}
                      >
                        <FontAwesomeIcon icon="search" />
                      </button>
                    </span>
                  </div>
                </NavItem>
              </Nav>
            </Collapse>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(SurveyNavBar);
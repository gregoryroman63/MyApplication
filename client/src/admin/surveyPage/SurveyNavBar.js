import React from "react";
import { Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./SurveyNavBar.css";

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
    this.setState({ search: e.target.value });
  };
  searchOnClick = e => {
    e.preventDefault();
  };
  render() {
    const { isOpen, search } = this.state;
    const { toggle, handleSearchInput, searchOnClick } = this;
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
                    <input
                      className="form-control py-2 navSearch"
                      type="search"
                      value={search}
                      id="search"
                      onChange={handleSearchInput}
                      placeholder="Search by cohort #"
                    />
                    <span className="input-group-append">
                      <button
                        id="searchBtn"
                        className="btn btn-outline-secondary"
                        type="submit"
                        onClick={searchOnClick}
                      >
                        <span className="input-group-addon">
                          <span className="glyphicon glyphicon-search" />
                        </span>
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
export default SurveyNavBar;

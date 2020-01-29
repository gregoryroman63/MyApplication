import React from "react";
import { Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./SurveyNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
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
    e.preventDefault();
  };
  signOut = e => {
    e.preventDefault();
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
    });
    this.props.setUser({});
    window.open("/", "_self");
  };
  render() {
    const { isOpen, search } = this.state;
    const { toggle, handleSearchInput, searchOnClick } = this;
    return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand-md" id="surveyNavBar">
            <img
              src={
                this.props.user.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoVICaoWv740_veT03awpbxglZ1nXyyAZPPJno9B7uAybDCfr"
              }
              id="userImage"
              alt="User"
            />
            <span id="welcome">Welcome,</span>
            <span id="userName">{this.props.user.name}</span>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="navItemHome">
                  <NavLink to={"/"} className="navLinks">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem className="navItemHome">
                  <NavLink to={"/feedbackpage"} className="navLinks">
                    Cohorts
                  </NavLink>
                </NavItem>
                <NavItem className="navItemHome">
                  <NavLink to={"/"} className="navLinks" onClick={this.signOut}>
                    SignOut
                  </NavLink>
                </NavItem>
                <NavItem>
                  <div className="input-group col-md-12">
                    <input
                      className="form-control py-2 navSearch"
                      type="search"
                      name="search"
                      value={search}
                      id="search"
                      onChange={handleSearchInput}
                      placeholder="Cohort # or Name"
                    />
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
function mapDispatchToProps(dispatch) {
  return {
    setUser: user => dispatch({ type: "SET_USER", user })
  };
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SurveyNavBar));

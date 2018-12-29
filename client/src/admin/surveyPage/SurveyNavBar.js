import React from "react";
import { Collapse, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./SurveyNavBar.css";

class SurveyNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleOnChangeInput = () => {};
  render() {
    return (
      <React.Fragment>
        <div>
          <nav className="navbar navbar-expand-md ">
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem id="navItemHome">
                  <NavLink to={"/"}>Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={"/admin/businessContainer"}>Cohorts</NavLink>
                </NavItem>
                <NavItem>
                  <div className="input-group col-md-12">
                    <input
                      className="form-control py-2"
                      type="search"
                      value="search"
                      id="example-search-input"
                      onChange={this.handleOnChangeInput}
                      placeholder="Search for cohort number (e.g. 63)"
                    />
                    <span className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
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

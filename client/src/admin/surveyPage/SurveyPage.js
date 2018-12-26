import React from "react";
import "./SurveyPage.css";
import SurveyForm from "./SurveyForm";

class SurveyPage extends React.Component {
  state = {
    showForm: false
  };
  handleButtonClick = () => {
    this.setState({ showForm: true });
  };
  render() {
    return (
      <React.Fragment>
        <SurveyForm />
        {/* {!this.state.showForm ? (
          <button
            id="signupContainer"
            type="button"
            className="btn btn-outline-success btn-lg"
            onClick={this.handleButtonClick}
          >
            Sign Up Today
          </button>
        ) : (
          <SurveyForm />
        )} */}
      </React.Fragment>
    );
  }
}

export default SurveyPage;

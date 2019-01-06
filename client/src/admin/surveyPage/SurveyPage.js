import React from "react";
import "./SurveyPage.css";
import SunsetWaveVideo from "./../../assets/writingOnBoard.mp4";
import SurveyPageBkGdVideo from "./SurveyPageBkGdVideo";
import SurveyPageNav from "./SurveyPageNav";
import SurveyForm from "./SurveyForm";
import { connect } from "react-redux";
import { authenticateUser } from "./../../services/SurveyForm.service";

class SurveyPage extends React.Component {
  state = {
    showForm: false
  };

  componentDidMount() {
    window.onSignIn = googleUser => {
      const profile = googleUser.getBasicProfile();
      const user = {};
      user.id = profile.getId();
      user.name = profile.getName();
      user.image = profile.getImageUrl();
      user.email = profile.getEmail();
      user.id_token = googleUser.getAuthResponse().id_token;
      // console.log("ID: " + profile.getId()); // AKA: oAuthId. Do not send to your backend! Use an ID token instead.
      // console.log("Name: " + profile.getName());
      // console.log("Image URL: " + profile.getImageUrl());
      // console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
      // console.log("var id_token = " + googleUser.getAuthResponse().id_token);
      authenticateUser(user.id_token, user.id).then(
        res => {
          console.log(res);
          this.props.setUser(user);
        },
        err => console.error(err)
      );
    };
    if (this.props.repopulateForm) {
      this.setState({ showForm: this.props.repopulateForm });
    }
  }
  handleButtonClick = () => {
    this.setState({ showForm: true });
  };
  hideForm = bool => {
    this.setState({ showForm: bool });
  };
  render() {
    const { showForm } = this.state;
    const { hideForm, handleButtonClick } = this;
    const { id } = this.props.user;
    return (
      <React.Fragment>
        <SurveyPageBkGdVideo src={SunsetWaveVideo} />
        <div id="videoOverlay">
          {id && <SurveyPageNav />}
          {showForm ? (
            <SurveyForm hideForm={hideForm} />
          ) : (
            <div id="content">
              <h1 id="fancyFontH1">It's That Time Of The Evening Again</h1>
              <p id="fancyFontP">It is time to do Code Talks! </p>
              {id && (
                <button
                  id="fillOutFeedbackBtn"
                  type="button"
                  className="btn btn-lg"
                  onClick={handleButtonClick}
                >
                  Fill Out Feedback Form
                </button>
              )}
              <div className="g-signin2" data-onsuccess="onSignIn" />
            </div>
          )}
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
    repopulateForm: state.repopulateForm,
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyPage);

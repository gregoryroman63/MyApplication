import React from "react";
import "./SurveyPage.css";
import SunsetWaveVideo from "./../../assets/writingOnBoard.mp4";
import SurveyPageBkGdVideo from "./SurveyPageBkGdVideo";
import SurveyNavBar from "./SurveyNavBar";
import SurveyForm from "./SurveyForm";

class SurveyPage extends React.Component {
  state = {
    showForm: false
  };
  handleButtonClick = () => {
    this.setState({ showForm: true });
  };
  hideForm = bool => {
    this.setState({ showForm: bool });
  };
  render() {
    return (
      <React.Fragment>
        <SurveyPageBkGdVideo src={SunsetWaveVideo} />
        <div id="videoOverlay">
          <SurveyNavBar />
          {this.state.showForm ? (
            <SurveyForm hideForm={this.hideForm} />
          ) : (
            <div id="content">
              <h1 id="fancyFontH1">It's That Time Of The Evening Again</h1>
              <p id="fancyFontP">It is time to do Code Talks! </p>
              <button
                id="fillOutFeedbackBtn"
                type="button"
                className="btn btn-lg"
                onClick={this.handleButtonClick}
              >
                Fill Out Feedback Form
              </button>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default SurveyPage;

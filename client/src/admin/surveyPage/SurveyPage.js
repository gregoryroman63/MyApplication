import React from "react";
import "./SurveyPage.css";
import SunsetWaveVideo from "./../../assets/writingOnBoard.mp4";
import SurveyPageBkGdVideo from "./SurveyPageBkGdVideo";
import SurveyNavBar from "./SurveyNavBar";

class SurveyPage extends React.Component {
  handleButtonClick = () => {
    this.props.history.push(`/surveyform`);
  };
  render() {
    return (
      <React.Fragment>
        <SurveyPageBkGdVideo src={SunsetWaveVideo} />
        <div id="videoOverlay">
          <SurveyNavBar />
          <div id="content">
            <h1 id="fancyFontH1">It's That Time In The Evening Again</h1>
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
        </div>
      </React.Fragment>
    );
  }
}

export default SurveyPage;

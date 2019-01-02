import React from "react";
import "./SurveyPage.css";
import SunsetWaveVideo from "./../../assets/writingOnBoard.mp4";
import SurveyPageBkGdVideo from "./SurveyPageBkGdVideo";
import SurveyNavBar from "./SurveyNavBar";
import SurveyForm from "./SurveyForm";
import { connect } from "react-redux";

class SurveyPage extends React.Component {
  state = {
    showForm: false
  };
  componentDidMount() {
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
function mapStateToProps(state) {
  return {
    repopulateForm: state.repopulateForm
  };
}
export default connect(mapStateToProps)(SurveyPage);

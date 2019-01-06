import React from "react";
import "./SurveyForm.css";
import { NotificationManager } from "react-notifications";
import { postFeedback } from "./../../services/SurveyForm.service.js";
import { withRouter } from "react-router-dom";
import {
  getFeedBackById,
  updateFeedback
} from "./../../services/SurveyForm.service.js";
import { connect } from "react-redux";

class SurveyForm extends React.Component {
  state = {
    fullNameOfEvaluator: "",
    fullNameOfPresenter: "",
    //email: "",
    presenterCohort: "",
    overallPresentation: "3",
    topicSelection: "3",
    feedback: "",
    id: null
  };
  componentDidMount() {
    if (this.props.repopulateForm) {
      getFeedBackById(this.props.match.params.id)
        .then(res => {
          const {
            //Email,
            Feedback,
            FullNameOfEvaluator,
            FullNameOfPresenter,
            Id,
            OverallPresentation,
            PresenterCohort,
            TopicSelection
          } = res.data.Item;
          this.setState({
            fullNameOfEvaluator: FullNameOfEvaluator,
            fullNameOfPresenter: FullNameOfPresenter,
            //email: Email,
            presenterCohort: PresenterCohort,
            overallPresentation: OverallPresentation,
            topicSelection: TopicSelection,
            feedback: Feedback,
            id: Id
          });
        })
        .catch(err => console.error(err));
    }
  }
  cleanForm = () => {
    this.setState({
      fullNameOfEvaluator: "",
      fullNameOfPresenter: "",
      //email: "",
      presenterCohort: "",
      overallPresentation: "3",
      topicSelection: "3",
      feedback: ""
    });
  };
  submitFeedback = () => {
    const {
      fullNameOfEvaluator,
      fullNameOfPresenter,
      //email,
      presenterCohort,
      overallPresentation,
      topicSelection,
      feedback,
      id
    } = this.state;
    const payload = {
      fullNameOfEvaluator,
      fullNameOfPresenter,
      //email,
      presenterCohort,
      overallPresentation,
      topicSelection,
      feedback
    };
    if (this.props.repopulateForm) {
      payload.id = id;
      updateFeedback(payload)
        .then(res => {
          NotificationManager.success(
            "Successfully Submitted",
            "Thank-you For Your Feedback"
          );
          this.cleanForm();
          this.props.history.push("/feedbackPage");
          this.props.setRepopulateForm(false);
        })
        .catch(err => console.error(err));
    } else {
      payload.googleId = this.props.user.id;
      postFeedback(payload)
        .then(res => {
          NotificationManager.success(
            "Successfully Submitted",
            "Thank-you For Your Feedback"
          );
          this.cleanForm();
          this.props.history.push("/feedbackPage");
        })
        .catch(err => console.error(err));
    }
  };
  cancel = () => {
    if (this.props.repopulateForm) {
      this.cleanForm();
      this.props.setRepopulateForm(false);
      this.props.history.push("/");
    }
    this.props.hideForm(false);
  };
  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {
      fullNameOfEvaluator,
      fullNameOfPresenter,
      //email,
      presenterCohort,
      topicSelection,
      overallPresentation,
      feedback
    } = this.state;
    const { handleInputs, submitFeedback, cancel } = this;
    return (
      <React.Fragment>
        <div className="row match-height">
          <div className="col-md-12">
            <div className="">
              <div className="card-body">
                <div className="px-3">
                  <form className="form">
                    <div className="form-body">
                      <h4 className="form-section">Presentation Feedback</h4>
                      <div className="row">
                        <div className="form-group col-md-12 mb-2">
                          <label
                            className="labels"
                            htmlFor="fullNameOfEvaluator"
                          >
                            Full Name Of Evaluator
                          </label>
                          <input
                            className="form-control surveyInputs"
                            type="text"
                            name="fullNameOfEvaluator"
                            value={fullNameOfEvaluator}
                            onChange={handleInputs}
                            placeholder="Full Name Of Evaluator"
                          />
                        </div>
                        {/* <div className="form-group col-md-12 mb-2 ">
                          <label className="labels" htmlFor="email">
                            Email{" "}
                            <span id="emailMessage">
                              *Only Required if you would like a copy of this
                              survey
                            </span>
                          </label>
                          <input
                            name="email"
                            value={email}
                            onChange={handleInputs}
                            type="text"
                            placeholder="Email"
                            className="form-control surveyInputs"
                          />
                        </div> */}
                        <div className="form-group col-md-12 mb-2">
                          <label
                            className="labels"
                            htmlFor="fullNameOfPresenter"
                          >
                            Full Name Of Presenter
                          </label>
                          <input
                            name="fullNameOfPresenter"
                            value={fullNameOfPresenter}
                            onChange={handleInputs}
                            type="text"
                            placeholder="Full Name Of Presenter"
                            className="form-control surveyInputs"
                          />
                        </div>
                        <div className="form-group col-md-12 mb-2">
                          <label className="labels" htmlFor="presenterCohort">
                            Cohort Of Presenter
                          </label>
                          <input
                            name="presenterCohort"
                            value={presenterCohort}
                            onChange={handleInputs}
                            type="text"
                            placeholder="Cohort Of Presenter"
                            className="form-control surveyInputs"
                          />
                        </div>
                        <div className="form-group col-md-12 mb-2">
                          <label
                            className="labels"
                            htmlFor="overallPresentation"
                          >
                            Overall Presentation ( Range:{" "}
                            <span className="range">
                              1 = Poor --- 5 = Excellent
                            </span>{" "}
                            )
                          </label>
                          <select
                            className="form-control surveyInputs"
                            name="overallPresentation"
                            value={overallPresentation}
                            onChange={handleInputs}
                          >
                            <option value="3">3</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="form-group col-md-12 mb-2">
                          <label className="labels" htmlFor="topicSelection">
                            Topic Selection ( Range:{" "}
                            <span className="range">
                              1 = Poor --- 5 = Excellent
                            </span>{" "}
                            )
                          </label>
                          <select
                            className="form-control surveyInputs"
                            name="topicSelection"
                            value={topicSelection}
                            onChange={handleInputs}
                          >
                            <option value="3">3</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="form-group col-md-12 mb-2">
                          <label className="labels" htmlFor="feedback">
                            Feedback
                          </label>
                          <textarea
                            id="feedback"
                            className="form-control surveyInputs"
                            rows="1"
                            name="feedback"
                            value={feedback}
                            onChange={handleInputs}
                            placeholder="Feedback"
                          />
                        </div>
                        <div className="form-group col-md-12 mb-2">
                          <div id="feedbackButton">
                            <button
                              type="button"
                              className="btn"
                              onClick={submitFeedback}
                              id="feedbackBtn"
                            >
                              <i className="icon-note" /> Submit Feedback
                            </button>
                          </div>
                          <div id="cancelButton">
                            <button
                              type="button"
                              className="btn"
                              onClick={cancel}
                              id="cancelBtn"
                            >
                              <i className="icon-note" /> Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    repopulateForm: state.repopulateForm,
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setRepopulateForm: repopulateForm =>
      dispatch({ type: "SET_REPOPULATE_FORM", repopulateForm })
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SurveyForm)
);

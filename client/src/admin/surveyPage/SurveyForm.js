import React from "react";
import "./SurveyForm.css";
import { NotificationManager } from "react-notifications";
import { postFeedback } from "./../../services/SurveyForm.service.js";

class SurveyForm extends React.Component {
  state = {
    fullNameOfEvaluator: "",
    nameOfPresenter: "",
    email: "",
    cohort: "",
    overallPresentation: "",
    topicSelection: "",
    feedback: "",
    showSweetAlert: false
  };
  submitFeedback = () => {
    const {
      fullNameOfEvaluator,
      nameOfPresenter,
      email,
      cohort,
      overallPresentation,
      topicSelection,
      feedback
    } = this.state;
    const payload = {
      fullNameOfEvaluator,
      nameOfPresenter,
      email,
      cohort,
      overallPresentation,
      topicSelection,
      feedback
    };
    postFeedback(payload).then(res =>
      NotificationManager.success(
        "Successfully Submitted",
        "Thank-you For Your Feedback"
      )
    );
  };
  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {
      fullNameOfEvaluator,
      nameOfPresenter,
      email,
      cohort,
      topicSelection,
      overallPresentation,
      feedback
    } = this.state;
    const { handleInputs, submitFeedback } = this;
    return (
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
                        <label className="labels" htmlFor="fullNameOfEvaluator">
                          Full Name Of Evaluator
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="fullNameOfEvaluator"
                          value={fullNameOfEvaluator}
                          onChange={handleInputs}
                          placeholder="Full Name Of Evaluator"
                        />
                      </div>
                      <div className="form-group col-md-12 mb-2">
                        <label className="labels" htmlFor="nameOfPresenter">
                          Name Of Presenter
                        </label>
                        <input
                          name="nameOfPresenter"
                          value={nameOfPresenter}
                          onChange={handleInputs}
                          type="text"
                          placeholder="Name Of Presenter"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12 mb-2">
                        <label className="labels" htmlFor="email">
                          Email{" "}
                          <span>
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
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12 mb-2">
                        <label className="labels" htmlFor="cohort">
                          Cohort
                        </label>
                        <input
                          name="cohort"
                          value={cohort}
                          onChange={handleInputs}
                          type="text"
                          placeholder="Cohort"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12 mb-2">
                        <label className="labels" htmlFor="overallPresentation">
                          Overall Presentation
                        </label>
                        <select
                          className="form-control"
                          name="overallPresentation"
                          value={overallPresentation}
                          onChange={handleInputs}
                        >
                          <option>Satisfactory</option>
                          <option>Not Prepared</option>
                          <option>Subpar</option>
                          <option>Above Average</option>
                          <option>Toastmaster-esque</option>
                        </select>
                      </div>
                      <div className="form-group col-md-12 mb-2">
                        <label className="labels" htmlFor="topicSelection">
                          Topic Selection
                        </label>
                        <select
                          className="form-control"
                          name="topicSelection"
                          value={topicSelection}
                          onChange={handleInputs}
                        >
                          <option>Satisfactory</option>
                          <option>Lost Interest</option>
                          <option>Somewhat Payed Attention</option>
                          <option>Interesting</option>
                          <option>Very Interesting</option>
                        </select>
                      </div>
                      <div className="form-group col-md-12 mb-2">
                        <label className="labels" htmlFor="feedback">
                          Feedback
                        </label>
                        <textarea
                          id="feedback"
                          className="form-control"
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
                          >
                            <i className="icon-note" /> Submit Feedback
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
    );
  }
}

export default SurveyForm;

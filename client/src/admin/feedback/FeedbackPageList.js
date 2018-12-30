import React from "react";
import "./FeedbackPageList.css";
import SurveyNavBar from "./../surveyPage/SurveyNavBar";
import { getFeedBacks } from "./../../services/SurveyForm.service.js";
import moment from "moment";

class FeedbackPageList extends React.Component {
  state = {
    feedbackList: []
  };
  componentDidMount() {
    getFeedBacks()
      .then(res => {
        this.setState({ feedbackList: res.data.Item });
      })
      .catch(err => console.error(err));
  }
  render() {
    const { feedbackList } = this.state;
    return (
      <React.Fragment>
        <div id="feedbackPageContainer">
          <SurveyNavBar />
          <div className="container" id="feedbackPageListContainer">
            <h1 className="display-1" id="presentationFeedbackH1">
              Presentation Feedback
            </h1>
            <hr id="feedbackHr" />
            <ul className="list-unstyled" id="feedbackUl">
              {feedbackList.length
                ? feedbackList.map(data => (
                    <li className="media" key={data.Id} id="feedbackListItem">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoVICaoWv740_veT03awpbxglZ1nXyyAZPPJno9B7uAybDCfr"
                        className="mr-3"
                        alt="..."
                      />
                      <div className="media-body">
                        <h3 className="mt-0 mb-1">
                          Presented:{" "}
                          <span className="spanTextShadow">
                            {data.FullNameOfPresenter}
                          </span>
                          , Cohort:{" "}
                          <span className="spanTextShadow">
                            {data.PresenterCohort}
                          </span>
                          ,{" "}
                          {moment(data.DateTimeCreated).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </h3>
                        <h4 className="mt-0 mb-1">
                          Provided Feedback:{" "}
                          <span className="spanTextShadow">
                            {data.FullNameOfEvaluator}
                          </span>
                        </h4>
                        <h5>
                          Overall Presentation Score:{" "}
                          <span className="spanTextShadow">
                            {data.OverallPresentation}
                          </span>
                        </h5>
                        <h5>
                          Topic Selection Score:{" "}
                          <span className="spanTextShadow">
                            {data.TopicSelection}
                          </span>
                        </h5>
                        <p>{data.Feedback}</p>
                      </div>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FeedbackPageList;

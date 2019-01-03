import React from "react";
import "./FeedbackPageList.css";
import SurveyNavBar from "./../surveyPage/SurveyNavBar";
import {
  getFeedBacks,
  deleteFb,
  searchFeedbacks
} from "./../../services/SurveyForm.service.js";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import Paginator from "./../../shared/Paginator";

class FeedbackPageList extends React.Component {
  state = {
    feedbackList: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    totalPages: 0
  };
  prefix = this.props.match.path;
  componentDidMount() {
    getFeedBacks(this.state.pageIndex, 5)
      .then(res => {
        const { Item } = res.data;
        this.setState({
          feedbackList: Item.reverse(),
          totalPages: Math.ceil(Item[0].TotalRows / this.state.pageSize)
        });
      })
      .catch(err => console.error("an error"));
  }
  updateFeedback = id => {
    this.props.setRepopulateForm(true);
    this.props.history.push(`${this.prefix}/surveypage/${id}`);
  };
  deleteFeedback = id => {
    deleteFb(id)
      .then(res => {
        getFeedBacks(this.state.pageIndex, this.state.pageSize)
          .then(res => {
            const { Item } = res.data;
            this.setState({
              feedbackList: Item.reverse(),
              totalPages: Math.ceil(Item[0].TotalRows / this.state.pageSize)
            });
          })
          .catch(err => console.error("an error"));
      })
      .catch(err => console.error(err));
  };
  searchForFeedbacks = q => {
    searchFeedbacks(0, 10, q)
      .then(res => this.setState({ feedbackList: res.data.Item }))
      .catch(err => console.error(err));
  };
  getAllFeedbacks = () => {
    const { pageIndex, pageSize } = this.state;
    getFeedBacks(pageIndex, pageSize).then(res => {
      const totalCount = res.data.Item[0].TotalRows;
      console.log(totalCount, pageSize);
      console.log(Math.ceil(totalCount / pageSize));
      this.setState({
        feedbackList: res.data.Item.reverse(),
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize)
      });
    });
  };
  goToPage = pageIndex => {
    this.setState(
      prev => ({
        pageIndex
      }),
      () => {
        this.getAllFeedbacks();
      }
    );
  };
  render() {
    const { feedbackList, pageIndex, totalPages } = this.state;
    const { updateFeedback, deleteFeedback } = this;
    return (
      <React.Fragment>
        <div id="feedbackPageContainer">
          <SurveyNavBar searchForFeedbacks={this.searchForFeedbacks} />
          <div className="container" id="feedbackPageListContainer">
            <h1 className="display-1" id="presentationFeedbackH1">
              Presentation Feedback
            </h1>
            <hr id="feedbackHr" />
            <Paginator
              currentPage={pageIndex}
              totalPages={totalPages}
              goTo={this.goToPage}
            />
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
                        <h4 className="mt-0 mb-1">
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
                        </h4>
                        <h5 className="mt-0 mb-1">
                          Provided Feedback:{" "}
                          <span className="spanTextShadow">
                            {data.FullNameOfEvaluator}
                          </span>
                        </h5>
                        <h5 className="mt-0 mb-1">
                          Overall Presentation Score:{" "}
                          <span className="spanTextShadow">
                            {data.OverallPresentation}
                          </span>
                        </h5>
                        <h5 className="mt-0 mb-1">
                          Topic Selection Score:{" "}
                          <span className="spanTextShadow">
                            {data.TopicSelection}
                          </span>
                        </h5>
                        <p>{data.Feedback}</p>
                        <button
                          className="box-shadow-2 btn btn-secondary feedbackListBtn"
                          onClick={() => updateFeedback(data.Id)}
                        >
                          <FontAwesomeIcon icon="edit" />
                        </button>
                        <button
                          className="box-shadow-2 btn btn-secondary feedbackListBtn"
                          onClick={() => deleteFeedback(data.Id)}
                        >
                          <FontAwesomeIcon icon="trash-alt" />
                        </button>
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

function mapDispatchToProps(dispatch) {
  return {
    setRepopulateForm: repopulateForm =>
      dispatch({ type: "SET_REPOPULATE_FORM", repopulateForm })
  };
}
export default connect(
  null,
  mapDispatchToProps
)(FeedbackPageList);

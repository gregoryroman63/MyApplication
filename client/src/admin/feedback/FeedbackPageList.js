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
import DeleteModal from "./DeleteModal";

class FeedbackPageList extends React.Component {
  state = {
    feedbackList: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    totalPages: 0,
    isOpen: false,
    id: null
  };
  prefix = this.props.match.path;
  componentDidMount() {
    if (Object.keys(this.props.user).length === 0) {
      this.props.history.push("/");
      window.open("/", "_self");
    } else {
      getFeedBacks(this.state.pageIndex, 5)
        .then(res => {
          const { Item } = res.data;
          if (Item.length !== 0) {
            this.setState({
              feedbackList: Item.reverse(),
              totalPages: Math.ceil(Item[0].TotalRows / this.state.pageSize)
            });
          }
        })
        .catch(err => console.error(err));
    }
  }
  updateFeedback = id => {
    this.props.setRepopulateForm(true);
    this.props.history.push(`${this.prefix}/surveypage/${id}`);
  };
  deleteFeedbackModal = id => {
    this.setState({ isOpen: true, id });
  };
  yesDeleteFeedback = () => {
    deleteFb(this.state.id)
      .then(res => {
        getFeedBacks(this.state.pageIndex, this.state.pageSize)
          .then(res => {
            const { Item } = res.data;
            this.setState({
              feedbackList: Item.length ? Item.reverse() : [],
              totalPages: Item.length ? Math.ceil(Item[0].TotalRows / this.state.pageSize) : 0,
              id: null
            });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
    this.setState({ isOpen: false });
  };
  deleteCancelled = () => {
    this.setState({ isOpen: false });
  };
  searchForFeedbacks = q => {
    searchFeedbacks(0, 5, q)
      .then(res => this.setState({ feedbackList: res.data.Item }))
      .catch(err => console.error(err));
  };
  getAllFeedbacks = () => {
    const { pageIndex, pageSize } = this.state;
    getFeedBacks(pageIndex, pageSize).then(res => {
      const totalCount = res.data.Item[0].TotalRows;
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
    const { updateFeedback, deleteFeedbackModal } = this;
    return (
      <React.Fragment>
        <DeleteModal
          isOpen={this.state.isOpen}
          yesDeleteFeedback={this.yesDeleteFeedback}
          deleteCancelled={this.deleteCancelled}
          centered={true}
        />
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
                    <div className="imageContainer">
                      <img
                        src={
                          data.ImageUrl ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoVICaoWv740_veT03awpbxglZ1nXyyAZPPJno9B7uAybDCfr"
                        }
                        className={`mr-3 ${data.ImageUrl &&
                          "rotate90"} imageResize`}
                        alt="..."
                      />
                    </div>
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
                      {data.GoogleId === this.props.user.id && (
                        <React.Fragment>
                          <button
                            className="box-shadow-2 btn btn-secondary feedbackListBtn"
                            onClick={() => updateFeedback(data.Id)}
                          >
                            <FontAwesomeIcon icon="edit" />
                          </button>
                          <button
                            className="box-shadow-2 btn btn-secondary feedbackListBtn"
                            onClick={() => deleteFeedbackModal(data.Id)}
                          >
                            <FontAwesomeIcon icon="trash-alt" />
                          </button>
                        </React.Fragment>
                      )}
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
function mapStateToProps(state) {
  return { user: state.user };
}
function mapDispatchToProps(dispatch) {
  return {
    setRepopulateForm: repopulateForm =>
      dispatch({ type: "SET_REPOPULATE_FORM", repopulateForm }),
    setUser: user => dispatch({ type: "SET_USER", user })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackPageList);

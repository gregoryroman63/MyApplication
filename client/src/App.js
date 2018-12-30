import React, { Component } from "react";
import SurveyPage from "./admin/surveyPage/SurveyPage";
import { Route } from "react-router-dom";
import "./App.css";
import SurveyForm from "./admin/surveyPage/SurveyForm";
import FeedbackPageList from "./admin/feedback/FeedbackPageList";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={SurveyPage} />
        <Route exact path="/surveyform" component={SurveyForm} />
        <Route exact path="/feedbackpage" component={FeedbackPageList} />
      </React.Fragment>
    );
  }
}

export default App;

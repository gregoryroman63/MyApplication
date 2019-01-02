import React, { Component } from "react";
import SurveyPage from "./admin/surveyPage/SurveyPage";
import { Route } from "react-router-dom";
import "./App.css";
import FeedbackPageList from "./admin/feedback/FeedbackPageList";
import {
  faIgloo,
  faSearch,
  faEdit,
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faIgloo, faSearch, faEdit, faTrashAlt);

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path={`${"/feedbackpage/surveypage/"}:id(\\d+)`}
          component={SurveyPage}
        />
        <Route exact path="/" component={SurveyPage} />
        <Route exact path="/feedbackpage" component={FeedbackPageList} />
      </React.Fragment>
    );
  }
}

export default App;

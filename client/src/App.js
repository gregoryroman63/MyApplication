import React, { Component } from "react";
import SurveyPage from "./admin/surveyPage/SurveyPage";
import { Route } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={SurveyPage} />
      </React.Fragment>
    );
  }
}

export default App;

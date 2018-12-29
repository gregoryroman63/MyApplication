import React, { Component } from "react";
import SurveyPage from "./admin/surveyPage/SurveyPage";
import { Route } from "react-router-dom";
import "./App.css";
import SurveyForm from "./admin/surveyPage/SurveyForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={SurveyPage} />
        <Route exact path="/surveyform" component={SurveyForm} />
      </React.Fragment>
    );
  }
}

export default App;

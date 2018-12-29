import React from "react";
import "./SurveyPageBkGdVideo.css";

export default function(props) {
  return (
    <React.Fragment>
      <video autoPlay muted loop id="myVideo">
        <source src={props.src} type="video/mp4" />
      </video>
    </React.Fragment>
  );
}

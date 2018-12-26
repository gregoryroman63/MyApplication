import axios from "axios";

const baseUrl = "api/feedbackpage";

export function postFeedback(payload) {
  return axios.post(baseUrl, payload);
}

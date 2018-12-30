import axios from "axios";

const baseUrl = "api/feedbackpage";

export function postFeedback(payload) {
  return axios.post(baseUrl, payload);
}
export function getFeedBacks() {
  return axios.get(baseUrl);
}

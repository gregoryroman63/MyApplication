import axios from "axios";

const baseUrl = "/api/feedbackpage";

export function postFeedback(payload) {
  return axios.post(baseUrl, payload);
}
export function getFeedBacks() {
  return axios.get(baseUrl);
}
export function getFeedBackById(id) {
  return axios.get(`${baseUrl}/${id}`);
}
export function updateFeedback(payload) {
  return axios.put(baseUrl, payload);
}
export function deleteFb(id) {
  return axios.delete(`${baseUrl}/${id}`);
}
export function searchFeedbacks(pageIndex, pageSize, q) {
  return axios.get(`${baseUrl}/${pageIndex}/${pageSize}?q=${q}`);
}

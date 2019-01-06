import axios from "axios";

const baseUrl = "/api/feedbackpage";

export function postFeedback(payload) {
  return axios.post(baseUrl, payload);
}
export function getFeedBacks(pageIndex, pageSize) {
  return axios.get(`${baseUrl}/getall/${pageIndex}/${pageSize}`);
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
export function authenticateUser(token, id) {
  return axios.get(`${baseUrl}/authentication?id_token=${token}&oAuthId=${id}`);
}

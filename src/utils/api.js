import axios from "axios";

const API_URI = process.env.REACT_APP_API_URI;

export async function getUser() {
  return axios({
    url: `${API_URI}/auth/local/user`,
    method: "GET",
    withCredentials: true,
  });
}

export function getSubmissions({ eventId }) {
  return axios({
    url: `${API_URI}/submissions/${eventId}`,
    method: "GET",
    withCredentials: true,
  });
}

export function updateUserGeneral(body) {
  return axios({
    url: `${API_URI}/user/general`,
    method: "POST",
    data: body,
    withCredentials: true,
  });
}

export function sendAnalytics({ eventId, email }) {
  return axios({
    url: `${API_URI}/event/analytics/send`,
    method: "POST",
    data: { eventId, email },
    withCredentials: true,
  });
}

export async function logout() {
  return axios({
    url: `${API_URI}/auth/local/logout`,
    method: "POST",
    withCredentials: true,
  });
}

export async function deleteEvent({ eventUUID }) {
  return axios({
    url: `${API_URI}/event`,
    method: "DELETE",
    withCredentials: true,
    data: { eventUUID },
  });
}

export async function updateCookie() {
  return axios({
    url: `${API_URI}/auth/local/cookie`,
    method: "POST",
    withCredentials: true,
  });
}

export async function uploadProfilePicture({ image }) {
  let res = await axios.post(`${API_URI}/user/upload`, image, {
    withCredentials: true,
  });
  return res.data;
}

export async function getUsernameFromId(id) {
  return axios({
    url: `${API_URI}/username/${id}`,
    method: "GET",
    withCredentials: true,
  });
}

export async function login({ password, email }) {
  console.log("Test");
  console.log(API_URI);
  return axios({
    url: `${API_URI}/auth/local/login`,
    method: "POST",
    withCredentials: true,
    data: { password, email },
  });
}

export async function sendTestEmail({ emailHTML, emailAddress }) {
  return axios({
    url: `${API_URI}/test/email`,
    method: "POST",
    withCredentials: true,
    data: { emailHTML, emailAddress },
  });
}

export async function signup_auth({ password, username, email }) {
  return axios({
    url: `${API_URI}/auth/local/signup`,
    method: "POST",
    withCredentials: true,
    data: { password, username, email },
  });
}

export async function updateEvent({ event }) {
  return axios({
    url: `${API_URI}/update-event`,
    method: "POST",
    withCredentials: true,
    data: { event },
  });
}

export async function testText({ phoneNumber, phoneContent }) {
  let data = await fetch(`${API_URI}/testPhone`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ phoneNumber, phoneContent }),
  });
  return await data.json();
}

export async function testEmail({ emailHTML, emailAddress }) {
  let data = await fetch(`${API_URI}/testEmail`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ emailHTML, emailAddress }),
  });
  return await data.json();
}

export async function approveSubmission({ userId }) {
  let data = await fetch(`${API_URI}/submission/approve`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ userId }),
  });
  return await data.json();
}

export async function uploadImage(fileEnabled, image) {
  if (!fileEnabled) return { filename: null, error: false };

  let res = await axios.post(`${API_URI}/image/upload`, image);
  return res.data;
}

export async function addEvent(body) {
  let data = await fetch(`${API_URI}/event/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
  return await data.json();
}

export async function verifyCaptcha({ token }) {
  let data = await fetch(`${API_URI}/captcha`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ token }),
  });
  return await data.json();
}

export async function getEvent({ id }) {
  let data = await fetch(`${API_URI}/event/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  return await data.json();
}

export async function finishSubmission({ id, formData }) {
  let data = await fetch(`${API_URI}/submission/${id}/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(formData),
  });
  return await data.json();
}

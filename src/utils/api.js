import axios from "axios";
const { PRODUCTION_API_URI, API_URI } = require("../constants.json");

// const API_URI = PRODUCTION_API_URI;

export async function getUser() {
  return axios({
    url: `${API_URI}/auth/local/user`,
    method: "GET",
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

export async function login({ password, email }) {
  return axios({
    url: `${API_URI}/auth/local/login`,
    method: "POST",
    withCredentials: true,
    data: { password, email },
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
    url: `${API_URI}/api/update-event`,
    method: "POST",
    withCredentials: true,
    data: { event },
  });

  let data = await fetch(`${API_URI}/api/update-event`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ event }),
  });
  return await data.json();
}

export async function testText({ phoneNumber, phoneContent }) {
  let data = await fetch(`${API_URI}/api/testPhone`, {
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
  let data = await fetch(`${API_URI}/api/testEmail`, {
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
  let data = await fetch(`${API_URI}/api/submission/approve`, {
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

  let res = await axios.post(`${API_URI}/api/image/upload`, image);
  return res.data;
}

export async function addEvent(body) {
  let data = await fetch(`${API_URI}/api/event/create`, {
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
  let data = await fetch(`${API_URI}/api/captcha`, {
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

export async function getQrCode({ url }) {
  let data = await fetch(`${API_URI}/api/qr`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({ url }),
  });
  return await data.json();
}

export async function getEvent({ id }) {
  let data = await fetch(`${API_URI}/api/event/${id}`, {
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
  let data = await fetch(`${API_URI}/api/event/submission/${id}`, {
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

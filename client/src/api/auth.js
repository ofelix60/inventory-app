import axios from 'axios';
axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:8000/api/';

export async function onRegistration(registrationData) {
  return await axios.post(`${baseURL}register`, registrationData);
}

export async function onLogin(loginData) {
  return await axios.post(`${baseURL}login`, loginData);
}

export async function onLogout() {
  return await axios.get(`${baseURL}logout`);
}

export async function fetchProtectedInfo() {
  return await axios.get(`${baseURL}protected`);
}
export async function fetchDemoInfo() {
  return await axios.get(`${baseURL}allItems`);
}

export async function jankeyUserSave(email) {
  return await axios.get(`${baseURL}userByEmail/${email}`);
}

export default axios.create({
  baseURL,
});

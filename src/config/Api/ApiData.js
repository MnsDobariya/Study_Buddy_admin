import axios from 'axios';
import Storage from './storage';


let API_BASE_URL;

if (window.location.hostname === 'localhost') {
  API_BASE_URL = 'http://localhost:3000/api/v1';
  // API_BASE_URL = 'http://115.124.106.150:8124/api';
} else {
  // Live server environment
  API_BASE_URL = 'http://localhost:3000/api/v1';
}

const getHttpMemberOptions = (options, isAuth = false) => {
  const headers = {};
  if (isAuth) {
    headers.Authorization = `Bearer ${Storage.getToken()}` ?? '';
  }
  if (options.hasOwnProperty('Content-Type')) {
    headers['Content-Type'] = options['Content-Type'] ?? 'application/json';
  }
  return { headers };
};

export const ApiGet = (url, params = {}, options = {}) => {
  params = params == null || params === undefined ? {} : params;
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/${url}`, { params, ...getHttpMemberOptions(options, true) })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          Storage.deauthenticateUser();
          // todo : redirect to login page
        } else {
          reject({
            code: error?.response?.status,
            error: error?.response?.data?.message,
          });
        }
      });
  });
};

export const ApiPost = (url, fromData = {}, options = {}) => {
  fromData = fromData === null || fromData === undefined ? {} : fromData;
  return new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/${url}`, fromData, getHttpMemberOptions(options, true))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject({
          code: error?.response?.status,
          error: error?.response?.data?.message,
        });
      });
  });
};

export const ApiPut = (url, fromData = {}, options = {}) => {
  fromData = fromData === null || fromData === undefined ? {} : fromData;
  return new Promise((resolve, reject) => {
    axios.put(`${API_BASE_URL}/${url}`, fromData, getHttpMemberOptions(options, true))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          Storage.deauthenticateUser();
          // todo : redirect to login page
        } else {
          reject({
            code: error?.response?.status,
            error: error?.response?.data?.message,
          });
        }
      });
  });
};

export const ApiDelete = (url, data = {}, options = {}) => {
  data = data === null || data === undefined ? {} : data;
  return new Promise((resolve, reject) => {
    axios.delete(`${API_BASE_URL}/${url}`, { data, ...getHttpMemberOptions(options, true) })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          Storage.deauthenticateUser();
          // todo : redirect to login page
        } else {
          reject({
            code: error?.response?.status,
            error: error?.response?.data?.message,
          });
        }
      });
  });
};

export const ApiGetNoAuth = (url, params = {}, options = {}) => {
  params = params === null || params === undefined ? {} : params;
  return new Promise((resolve, reject) => {
    axios.get(`${API_BASE_URL}/${url}`, { params, ...getHttpMemberOptions(options, false) })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          Storage.deauthenticateUser();
        } else {
          reject({
            code: error?.response?.status,
            error: error?.response?.data?.message,
          });
        }
      });
  });
};

export const ApiPostNoAuth = (url, fromData, options = {}) => {
  fromData = fromData === null || fromData === undefined ? {} : fromData;
  return new Promise((resolve, reject) => {
    axios.post(`${API_BASE_URL}/${url}`, fromData, getHttpMemberOptions(options, false))
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          Storage.deauthenticateUser();
          // todo : redirect to login page
        } else {
          reject({
            code: error?.response?.status,
            error: error?.response?.data?.message,
          });
        }
      });
  });
};

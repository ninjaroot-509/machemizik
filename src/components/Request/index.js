import axios from 'axios';
// import { removeUserSession } from './Auth/Sessions';

const url = 'https://machemizik.htbonmache.com';

const BASE_URL_API_HTTP = url + '/api/';

// section GET
const getUser = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/user`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get wallet
const getWallet = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/wallet`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get genres
const getAllGenre = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/genres`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get songs
const getAllSong = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/songs`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get album
const getAllAlbum = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/albums`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get mySongs
const getMySong = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/my-songs`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get myAlbums
const getMyAlbum = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/my-albums`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get mySongDownloads
const getMySongDownload = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/my-downloads`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// get carts
const getMyCart = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}mizik/cart`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// notification
const getNotifications = (token) =>
  axios
    .get(`${BASE_URL_API_HTTP}notifications/notifs`, {
      headers: {
        authorization: `Token ${token}`,
      },
    })
    .then((res) => res.data);

// section POST
const postHandleLogin = (dataBody) =>
  axios
    .post(`${BASE_URL_API_HTTP}/auth/login`, dataBody)
    .then((res) => res.data);

const postHandleSignup = (dataBody) =>
  axios
    .post(`${BASE_URL_API_HTTP}/auth/register`, dataBody)
    .then((res) => res.data);


const postAddAlbum = (token, dataBody) =>
  axios
    .post(`${BASE_URL_API_HTTP}mizik/my-albums`, dataBody, {
      headers: {
        authorization: `Token ${token}`,
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);


const postAddSong = (token, dataBody) =>
    axios
      .post(`${BASE_URL_API_HTTP}mizik/my-songs`, dataBody, {
        headers: {
          authorization: `Token ${token}`,
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data);

const postAddSongDownload = (token, dataBody) =>
    axios
      .post(`${BASE_URL_API_HTTP}mizik/my-downloads`, dataBody, {
        headers: {
          authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data);


const postEditProfile = (token, dataBody) =>
  axios
    .post(`${BASE_URL_API_HTTP}mizik/user`, dataBody, {
      headers: {
        authorization: `Token ${token}`,
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);

const postAddToCart = (token, dataBody) =>
    axios
      .post(`${BASE_URL_API_HTTP}mizik/cart`, dataBody, {
        headers: {
          authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data);

const postRemoveToCart = (token, dataBody) =>
    axios
      .post(`${BASE_URL_API_HTTP}mizik/cart-remove`, dataBody, {
        headers: {
          authorization: `Token ${token}`,
        },
      })
      .then((res) => res.data);

export default {
  // section GET
  getUser,
  getNotifications,
  getWallet,
  getAllGenre,
  getAllSong,
  getAllAlbum,
  getMySong,
  getMyAlbum,
  getMySongDownload,
  getMyCart,
  // section POST
  postHandleLogin,
  postHandleSignup,
  postAddAlbum,
  postAddSong,
  postAddSongDownload,
  postAddToCart,
  postRemoveToCart,
  postEditProfile,
};

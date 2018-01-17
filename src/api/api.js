import axios from 'axios';

const base = '';

export const requestLogin = params => axios.post(`${base}/login`, params).then(res => res.data);

export const getUserList = params => axios.get(`${base}/user/list`, { params });

export const getUserListPage = params => axios.get(`${base}/user/listpage`, { params });

export const removeUser = params => axios.get(`${base}/user/remove`, { params });

export const batchRemoveUser = params => axios.get(`${base}/user/batchremove`, { params });

export const editUser = params => axios.get(`${base}/user/edit`, { params });

export const addUser = params => axios.get(`${base}/user/add`, { params });

export const changeUserState = params => axios.get(`${base}/user/changestate`,{ params });

export const changeUserStateDown = params => axios.get(`${base}/user/changestatedown`,{ params });

export const changeUserstateText = params => axios.get(`${base}/user/changeText`,{ params });


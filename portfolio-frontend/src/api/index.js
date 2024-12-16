import axiosRoot from 'axios'; // 👈 1
import { JWT_TOKEN_KEY } from '../contexts/Auth.context';

const baseUrl = 'http://localhost:9000/api'; // 👈 1

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// 👇 2
export async function getAll(url) {
  const { data } = await axios.get(url); // 👈 2

  return data.items;
}

// 👇 1
export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`); // 👈 2
};

// src/api/index.js
export async function save(url, { arg: { id, ...data } }) {
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data,
  });
}

export const getById = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`);
  return data;
};

export const post = async (url, { arg }) => {
  const { data } = await axios.post(`${baseUrl}/${url}`, arg);

  return data;
};


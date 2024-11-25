import axios from 'axios';

const baseUrl = 'http://localhost:9000/api'; // 👈 1

// 👇 2
export async function getAll(url) {
  const { data } = await axios.get(`${baseUrl}/${url}`); // 👈 3

  return data.items;
}

// 👇 1
export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`); // 👈 2
};

export const save = async (url, { arg: body }) => {
  await axios.post(`${baseUrl}/${url}`, body); // 👈 2
};


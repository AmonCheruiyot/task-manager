import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export async function getTasks() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createTask(task) {
  const res = await axios.post(API_URL, task);
  return res.data;
}

export async function updateTask(id, updates) {
  const res = await axios.put(`${API_URL}/${id}`, updates);
  return res.data;
}

export async function deleteTask(id) {
  await axios.delete(`${API_URL}/${id}`);
}

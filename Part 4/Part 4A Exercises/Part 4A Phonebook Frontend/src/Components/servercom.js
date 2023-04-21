import axios from "axios"


const baseURL = "/api/persons"


const create = (newPerson) => {
  return axios.post(baseURL, newPerson).then((response) => response.data)
} 

const update = (id, newPerson) => {
  return axios.put(`${baseURL}/${id}`, newPerson)
}

const deleteEntry = (id) =>
{
  return axios.delete(`${baseURL}/${id}`).then(response => console.log(response.data));
}

export default {create, update, deleteEntry}
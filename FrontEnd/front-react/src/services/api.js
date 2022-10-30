import axios  from 'axios';

//Criar Constante
const api = axios.create({
    baseURL:"https://localhost:7149/api/"
})

export default api;
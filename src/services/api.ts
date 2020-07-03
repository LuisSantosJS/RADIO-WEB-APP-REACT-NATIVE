import axios from 'axios';

const api = axios.create({
    baseURL: 'http://radiocampusifac-com.umbler.net'
}); 

export default api;
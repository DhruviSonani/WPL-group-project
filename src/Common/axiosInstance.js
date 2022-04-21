import axios from 'axios'
import { BASE_URL } from './endPoints'

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' }
});

instance.defaults.timeout = "5000"


export default instance
import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1/";
import db from '../db.json'

export const fetchApi = async (endpoint) => {
    const res = await axios.get(baseUrl+endpoint)
    
    return res;
}


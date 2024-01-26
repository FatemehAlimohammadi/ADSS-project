import axios from "axios";

const baseUrl = "http://localhost:3030";
import db from '../db.json'

export const fetchApi = async (endpoint) => {
    const res = await axios.get(baseUrl+endpoint)
    
    return res;
}


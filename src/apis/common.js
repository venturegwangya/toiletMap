import axios from "axios";

export const instance = axios.create({
    headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    },
    withCredentials: true,
});



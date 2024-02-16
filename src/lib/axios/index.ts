import axios from "axios";

export const SCHEMA_API_AXIOS = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SCHEMA_API_URL,
    params: {
        token: process.env.NEXT_PUBLIC_SCHEMA_API_TOKEN
    }
})
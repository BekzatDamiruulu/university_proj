import axios from 'axios'
export const MAIN_URL = ''

export const $api = axios.create({
    baseURL: MAIN_URL,
})
//
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'access_token'
    )}`
    return config
})

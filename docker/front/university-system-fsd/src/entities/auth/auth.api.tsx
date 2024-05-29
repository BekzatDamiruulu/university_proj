import axios, { AxiosResponse } from 'axios'
import { MAIN_URL } from '../../shared/api.ts'
export const authApi = {
    login: async (
        userName: string,
        password: string
    ): Promise<AxiosResponse<string>> => {
        return await axios.post(MAIN_URL + 'api/v1/Login', {
            userName,
            password,
        })
    },
}

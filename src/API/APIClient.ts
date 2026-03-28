import axios, { AxiosResponse, Method } from "axios";

const APIClient = async<T>(url: string, method: Method, body?: any): Promise<{ data: T; status: number }> => {
    try {
        const config = {
            method,
            url,
            data: body,
            withCredentials: true
        };

        const response: AxiosResponse<T> = await axios(config);
        return {
            data: response.data,
            status: response.status
        };
    }
    catch (e: any) {
        console.log(e, "Error in API Client");
        throw e;
    }
}

export { APIClient }
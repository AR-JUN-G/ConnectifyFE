import { APIClient } from "./APIClient";
import { BASE_URL } from "../utils/constants";
import { LoginResponseType, LoginType, LogoutResponseType, RefreshTokenResponseType, SessionResponseType, SignupResponseType, SignupType } from "../Types/AuthAPI.types";
import { APIResponseType } from "../Types/CommonAPIResponse.types";
import { AxiosError } from "axios";

const LoginAPI = async (body: LoginType): Promise<APIResponseType<LoginResponseType>> => {
    try {
        const url = `${BASE_URL}/login`;
        const { data, status } = await APIClient<LoginResponseType>(url, "POST", { emailId: body.emailId, password: body.password });

        return {
            data: data,
            error: null,
            status: status
        }
    }
    catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        console.error("Error in LoginAPI", AxiosError);
        return {
            data: null,
            error: AxiosError.response?.data?.message || "Something went wrong",
            status: AxiosError.response?.status || 500
        }
    }
}


const SignupAPI = async (body: SignupType): Promise<APIResponseType<SignupResponseType>> => {
    try {
        const url = `${BASE_URL}/signup`;
        const { data, status } = await APIClient<SignupResponseType>(url, "POST", body);

        return {
            data,
            error: null,
            status: status
        }
    }
    catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>
        console.error("Error in SignupAPI", AxiosError);
        return {
            data: null,
            error: AxiosError.response?.data?.message || "Something went wrong",
            status: AxiosError.response?.status || 500
        }
    }
}

// The below API call is used to make a request to the backend to check if the user is logged in or not
// I will be making the below API call in useAuth which serve as the wrapper for all the auth related API calls
// This API call will be made in the App.tsx file
const getSessionAPI = async (): Promise<APIResponseType<SessionResponseType>> => {
    try {
        const { data, status } = await APIClient<SessionResponseType>(`${BASE_URL}/auth/getSessionDetail`, "GET", {});
        return {
            data,
            error: null,
            status
        };
    } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        console.error("Error in getSessionAPI", AxiosError);
        return {
            data: null,
            error: AxiosError.response?.data?.message || "Something went wrong",
            status: AxiosError.response?.status || 500
        }
    }
}


const refreshToken = async (): Promise<APIResponseType<RefreshTokenResponseType>> => {
    try {
        const { data, status } = await APIClient<RefreshTokenResponseType>(`${BASE_URL}/auth/refresh`, "GET", {});
        return {
            data: data,
            error: null,
            status: status
        };
    } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        console.error("Error in refreshToken", AxiosError);
        throw (error);
    }
}

const LogoutAPI = async (): Promise<APIResponseType<LogoutResponseType>> => {
    try {
        const { data, status } = await APIClient<LogoutResponseType>(`${BASE_URL}/auth/logout`, "POST", {});
        return {
            data: data,
            error: null,
            status: status
        };
    } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        console.error("Error in LogoutAPI", AxiosError);
        return {
            data: null,
            error: AxiosError.response?.data?.message || "Something went wrong",
            status: AxiosError.response?.status || 500
        }
    }
}

export { LoginAPI, SignupAPI, getSessionAPI, refreshToken, LogoutAPI }
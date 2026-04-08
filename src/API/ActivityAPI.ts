/*
    The below code contain the API calls for the Activity component
    1. Get all the received Request
    2. Accept or Reject the Request
    3. Get Suggestion Requests(Feed)
    4. Send Request to the User
*/

import { ReceivedRequestsListResponseType } from "../Types/ActivityAPI.types";
import { APIResponseType } from "../Types/CommonAPIResponse.types";
import { BASE_URL } from "../utils/constants";
import { APIClient } from "./APIClient";
import { AxiosError } from "axios";


// /api/users/request/received

const getAllReceivedRequests = async (): Promise<APIResponseType<ReceivedRequestsListResponseType>> => {
    try {
        const url = `${BASE_URL}/users/request/received`;
        const { data, status } = await APIClient<ReceivedRequestsListResponseType>(url, "GET", {});

        return {
            data: data,
            error: null,
            status: status
        }
    } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        console.error("Error in getAllReceivedRequests", AxiosError);
        return {
            data: null,
            error: AxiosError.response?.data?.message || "Something went wrong",
            status: AxiosError.response?.status || 500
        }
    }
}

export { getAllReceivedRequests };
import { availableMembersForChatResponseType, directChatListResponseType } from "../Types/ChatAPI.types";
import { AxiosError } from "axios";
import { APIResponseType } from "../Types/CommonAPIResponse.types";
import { BASE_URL } from "../utils/constants";
import { APIClient } from "./APIClient";

const getChatList = async (): Promise<APIResponseType<directChatListResponseType>> => {
    try {
        const url = `${BASE_URL}/direct/chats`;
        const { data, status } = await APIClient<directChatListResponseType>(url, "GET", {});

        return {
            data: data,
            error: null,
            status: status
        }
    } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        console.error("Error in getChatList", AxiosError);
        return {
            data: null,
            error: AxiosError.response?.data?.message || "Something went wrong",
            status: AxiosError.response?.status || 500
        }
    }
}

const getAvailableMemebersForChat = async (): Promise<APIResponseType<availableMembersForChatResponseType>> => {
    try {
        const url = `${BASE_URL}/direct/friends/available-for-chat`;
        const { data, status } = await APIClient<availableMembersForChatResponseType>(url, "GET", {});

        return {
            data: data,
            error: null,
            status: status
        }
    } catch (error) {
        const AxiosError = error as AxiosError<{ message: string }>;
        console.error("Error in getting available members for chat", AxiosError);
        return {
            data: null,
            error: AxiosError.response?.data?.message || "Something went wrong",
            status: AxiosError.response?.status || 500
        }
    }
}
export { getChatList, getAvailableMemebersForChat }


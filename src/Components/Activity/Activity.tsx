import "./Activity.css";
import { useEffect, useState } from "react";
import { ReceivedRequestType } from "../../Types/ActivityAPI.types";
import { getAllReceivedRequests } from "../../API/ActivityAPI";

const Activity = () => {

    const [receivedRequest, setReceivedRequest] = useState<ReceivedRequestType[]>([]);


    const fetchReceivedRequests = async () => {
        try {
            const response = await getAllReceivedRequests();
            if (response.status === 200 && response.data) {
                setReceivedRequest(response.data.requests);
            }

        } catch (error) {
            console.error(error, "Error Occured while fetching the Interest List")
        }
    }
    useEffect(() => {
        fetchReceivedRequests();
    }, [])
    return (
        <div className="activity-container">
            <h1>Friend Requests & Suggestions</h1>
        </div>
    )
}

export default Activity;
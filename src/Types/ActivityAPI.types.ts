type ReceivedRequestType = {
    fromUserID: {
        _id: string,
        firstName: string,
        lastName: string,
        photourl: string
    },
    status: string
}

type ReceivedRequestsListResponseType = {
    message: string,
    requests: ReceivedRequestType[]
}


export type { ReceivedRequestType, ReceivedRequestsListResponseType };
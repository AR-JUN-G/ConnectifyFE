type directChatResponseType = {
    userID: string;
    firstName: string;
    lastName: string;
    photourl: string;
    latestMessage: string;
    time: Date;
}

type directChatListResponseType = {
    message: string,
    chats: directChatResponseType[];
}

type availableMemberResponseType = {
    _id: string,
    firstName: string,
    lastName: string,
    photourl: string
}

type availableMembersForChatResponseType = {
    message: string,
    members: availableMemberResponseType[];
}

export type { directChatResponseType, directChatListResponseType, availableMembersForChatResponseType };
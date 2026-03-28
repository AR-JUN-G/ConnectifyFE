export type LoginType = {
    emailId: string,
    password: string
}

export type LoginResponseType = {
    message: string,
    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    photourl: string,
};

export type SessionResponseType = {
    message: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        photourl: string;
        emailId: string;
    };
};
export type SignupType = {
    firstName: string,
    lastName: string,
    emailId: string,
    password: string
};

export type SignupResponseType = {
    message: string,
    data: {
        id: string,
        firstName: string,
        emailId: string,
    },
};


export type RefreshTokenResponseType = {
    message: string
}

export type LogoutResponseType = {
    message: string

}
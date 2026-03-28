import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessionAPI, refreshToken } from "../API/AuthAPI";
import { updateUserDetails } from "../Store/userSlice";
import { RootState } from "../Store/store";

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.User.userID);

    useEffect(() => {
        const handleSessionFetch = async () => {
            try {
                const result = await getSessionAPI();
                if (result.data?.user) {
                    const { user: userData } = result.data;
                    dispatch(updateUserDetails({
                        userID: userData._id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.emailId,
                        photourl: userData.photourl
                    }));
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Session check error:", error);
                return false;
            }
        };

        const checkAuth = async () => {
            if (user) {
                setLoading(false);
                return;
            }

            const success = await handleSessionFetch();

            if (!success) {
                try {
                    console.log("Session invalid, attempting token refresh...");
                    await refreshToken();
                    // Refetch session after refresh
                    await handleSessionFetch();
                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [dispatch, user]);

    return { loading, isAuthenticated: !!user };
};

export default useAuth;

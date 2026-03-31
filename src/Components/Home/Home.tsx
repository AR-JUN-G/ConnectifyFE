import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/store";
import { LogoutAPI } from "../../API/AuthAPI";
import { removeUserDetails } from "../../Store/userSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userID = useSelector((state: RootState) => state.User.userID);

    const handleLogout = async () => {
        try {
            const result = await LogoutAPI();
            if (result.status === 200 || result.data?.message) {
                dispatch(removeUserDetails());
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };
    return (<>
        <h1>Home</h1>
        <button onClick={() => navigate(`/direct/inbox`)}>Chat</button>
        <button onClick={handleLogout}>Logout</button>
    </>)
}

export default Home;
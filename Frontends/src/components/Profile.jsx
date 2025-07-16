import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Always fetch latest user profile on mount
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};
export default Profile;
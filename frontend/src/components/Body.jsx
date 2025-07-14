import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("in body"+user.data)
      dispatch(addUser(user.data));
    } catch (error) {}
  };

  useEffect(()=>{
    fetchUser();
  },[]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* This Outlet will grow and push the footer down */}
      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;

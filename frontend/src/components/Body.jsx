import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log("in body"+user.data.firstName);
      dispatch(addUser(user.data));
    } catch (error) {
      if(err.status === 401) {
        console.error("Unauthorized access, redirecting to login");
        navigate("/login");
      }
    }
  };

  useEffect(()=>{
    if(!user){
      fetchUser();
    }
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

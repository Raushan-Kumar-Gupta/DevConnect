import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, PROFILE_PIC_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user); // or store.user.user based on your store
  // console.log("navbar"+user.firstName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    try{
      axios.post(
      BASE_URL + "/logout",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(removeUser())
    navigate("/login");
    console.log("Logout successful");
    }
    catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <div className="navbar bg-accent px-4 flex flex-wrap justify-between">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-2 flex-1">
        <img
          className="h-10 w-10 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQj6NLXa_dlgM8gscTDF-c6dDDH1YH5ygG9Q&s"
          alt="DevConnect Logo"
        />
        <a className="btn btn-ghost text-xl sm:text-2xl font-bold normal-case">
          DevConnect
        </a>
      </div>

      {/* Center: Welcome Message (optional, can hide on small screens) */}
      {user?.firstName && (
        <div className="hidden sm:flex items-center font-semibold text-white text-lg px-4">
          Welcome,{" "}
          {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
        </div>
      )}

      {/* Right: Search + Avatar */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-end sm:justify-normal">
        {/* <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full sm:w-40 md:w-60"
        /> */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="User Avatar" src={user?.photoUrl || PROFILE_PIC_URL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 w-52 p-2 shadow bg-base-100 rounded-box"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

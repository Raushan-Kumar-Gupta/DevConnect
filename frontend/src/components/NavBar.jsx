import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, PROFILE_PIC_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
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
        <Link to="/" className="btn btn-ghost text-xl sm:text-2xl font-bold normal-case">
          DevConnect
        </Link>
      </div>

      {/* Center: Welcome Message */}
      {user?.firstName && (
        <div className="hidden sm:flex items-center font-semibold text-white text-lg px-4">
          Welcome, {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
        </div>
      )}

      {/* Right: Avatar & Dropdown */}
      {user && (
        <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-end sm:justify-normal">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoUrl || PROFILE_PIC_URL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 w-52 p-2 shadow bg-base-100 rounded-box"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <Link to="/premium">Premium</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

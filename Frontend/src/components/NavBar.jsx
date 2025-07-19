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
    <div className="navbar bg-accent text-white px-4 py-3 shadow-md flex flex-wrap justify-between items-center">
      {/* Left: Logo & Brand */}
      <div className="flex items-center gap-3 flex-1">
        <img
          className="h-10 w-10 rounded-full border border-white shadow-md"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQj6NLXa_dlgM8gscTDF-c6dDDH1YH5ygG9Q&s"
          alt="DevConnect Logo"
        />
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-bold normal-case text-white hover:bg-transparent"
        >
          DevConnect
        </Link>
      </div>

      {/* Center: Welcome Message */}
      {user?.firstName && (
        <div className="hidden sm:block text-lg font-semibold text-white m-2">
          Welcome,{" "}
          {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
        </div>
      )}

      {/* Right: Avatar or Login */}
      <div className="flex items-center gap-3 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost avatar hover:ring hover:ring-secondary transition duration-200"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoUrl || PROFILE_PIC_URL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] w-52 p-2 shadow-lg bg-base-100 rounded-box text-black font-medium"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile <span className="badge badge-success">New</span>
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
                <a onClick={handleLogout} className="text-error font-semibold">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn bg-gradient-to-r from-accent to-secondary text-white font-bold border-none rounded-lg px-6 py-2 shadow-lg hover:shadow-accent hover:scale-105 hover:brightness-110 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;

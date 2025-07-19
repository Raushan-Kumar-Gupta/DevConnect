import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
          photoUrl,
          about,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.savedUser));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsLoginForm(false);
    } else {
      setIsLoginForm(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 px-4">
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border-2 border-transparent bg-clip-padding"
        style={{
          borderImage: "linear-gradient(to right, #3b82f6, #a855f7) 1",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginForm ? "Log in Here" : "Profile Details"}
        </h2>

        <div className="flex flex-col gap-4">
          {!isLoginForm && (
            <>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="FirstName"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="LastName"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="PhotoUrl"
                value={photoUrl}
                className="input input-bordered"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  className="input input-bordered w-full"
                  onChange={(e) => setAge(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Gender"
                  value={gender}
                  className="input input-bordered w-full"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="About"
                value={about}
                className="input input-bordered"
                onChange={(e) => setAbout(e.target.value)}
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={skills}
                className="input input-bordered"
                onChange={(e) => setSkills(e.target.value)}
              />
            </>
          )}
          <input
            type="text"
            placeholder="Email"
            value={emailId}
            className="input input-bordered w-full"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="input input-bordered w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isLoginForm && (
          <div className="text-center text-sm mt-1 text-blue-500 hover:underline cursor-pointer">
            Forget your password?
          </div>
        )}

        <p className="text-red-500 text-center mt-2">{error}</p>

        <div className="mt-6">
          <button
            className="btn w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold tracking-wide hover:scale-105 transition-all"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "LOG IN" : "SignUp"}
          </button>
        </div>

        <div className="text-center mt-4 text-sm">
          {isLoginForm ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Have an account?{" "}
              <span
                className="text-blue-500 font-semibold cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;

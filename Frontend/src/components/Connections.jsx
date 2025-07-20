import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-gray-600">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Your Connections
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="bg-white/70 backdrop-blur-md shadow-xl border border-gray-200 rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    photoUrl || "https://geographyandyou.com/images/user-profile.png"
                  }
                  alt="User"
                  className="w-16 h-16 rounded-full object-cover border border-gray-300 shadow"
                  onError={(e) =>
                    (e.target.src =
                      "https://geographyandyou.com/images/user-profile.png")
                  }
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {firstName} {lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-500">
                      {age} yrs, {gender}
                    </p>
                  )}
                </div>
              </div>

              {about && (
                <p className="text-sm text-gray-600 mt-3 italic line-clamp-3">
                  {about}
                </p>
              )}

              <Link to={`/chat/${_id}`}>
                <button className="mt-5 w-full btn btn-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-md hover:from-blue-600 hover:to-purple-600 transition-all">
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">
          No Requests Found
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Connection Requests
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-200 transition hover:shadow-2xl"
            >
              <img
                src={
                  photoUrl || "https://geographyandyou.com/images/user-profile.png"
                }
                alt="User"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow mb-4"
                onError={(e) =>
                  (e.target.src =
                    "https://geographyandyou.com/images/user-profile.png")
                }
              />
              <h2 className="text-xl font-semibold text-gray-800">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-500 mb-1">{age}, {gender}</p>
              )}
              {about && (
                <p className="text-sm text-gray-600 italic line-clamp-3 mb-3">
                  {about}
                </p>
              )}
              <div className="flex gap-4 mt-auto">
                <button
                  className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded-xl px-4 py-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

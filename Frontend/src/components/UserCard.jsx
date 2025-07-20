import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills: rawSkills
  } = user;

  const skills = Array.isArray(rawSkills)
    ? rawSkills
    : typeof rawSkills === "string"
    ? rawSkills.split(",").map((s) => s.trim())
    : [];
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
     if (!userId) return;
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="bg-base-300 shadow-xl rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto my-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl border border-gray-200">
      <figure className="w-full flex justify-center bg-gradient-to-tr from-blue-500 to-purple-500 rounded-t-2xl">
        <img
          src={photoUrl}
          alt="User"
          className="object-cover w-32 h-32 rounded-full border-4 border-white shadow-lg mt-4"
          onError={e => (e.target.src = "https://geographyandyou.com/images/user-profile.png")}
        />
      </figure>
      <div className="card-body w-full px-6 py-4 flex flex-col items-center">
        <h2 className="card-title text-xl font-bold text-center mb-1">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-gray-500 mb-2">{age}, {gender}</p>
        )}
        {about && (
          <p className="text-center text-gray-700 mb-3 italic">{about}</p>
        )}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="badge badge-outline badge-secondary px-3 py-1 text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions justify-center w-full mt-2 gap-3">
          <button
            className="btn btn-primary w-1/2"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary w-1/2"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
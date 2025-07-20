import { useState, useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhotoUrl(user.photoUrl || "");
    setAge(user.age ? String(user.age) : "");
    setGender(user.gender || "");
    setAbout(user.about || "");
    setSkills(
      Array.isArray(user.skills)
        ? user.skills.join(", ")
        : user.skills || ""
    );
  }, [user]);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-6">
        {/* Edit Form */}
        <div className="card w-full max-w-xl bg-base-200 shadow-2xl ml-28">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">Edit Profile</h2>

            {/* Inputs */}
            {[
              { label: "First Name", value: firstName, setter: setFirstName },
              { label: "Last Name", value: lastName, setter: setLastName },
              { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
              { label: "Age", value: age, setter: setAge },
              { label: "Gender", value: gender, setter: setGender },
            ].map((item, index) => (
              <label className="form-control w-full mb-3" key={index}>
                <div className="label">
                  <span className="label-text">{item.label}:</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered"
                  value={item.value}
                  onChange={(e) => item.setter(e.target.value)}
                />
              </label>
            ))}

            {/* About */}
            <label className="form-control w-full mb-3">
              <div className="label">
                <span className="label-text">About:</span>
              </div>
              <textarea
                className="textarea textarea-bordered"
                rows="3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>

            {/* Skills */}
            <label className="form-control w-full mb-3">
              <div className="label">
                <span className="label-text">Skills (comma separated):</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                placeholder="e.g. React, Node.js, C++"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {skills
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .map((skill, idx) => (
                    <span key={idx} className="badge badge-accent badge-outline">
                      {skill}
                    </span>
                  ))}
              </div>
            </label>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <div className="card-actions mt-4 justify-center">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <UserCard
          user={{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          }}
        />
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

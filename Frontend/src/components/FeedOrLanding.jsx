import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPage from "./LandingPage";
import Marquees from "./Marquees";
import Cards from "./Cards";

const FeedOrLanding = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/feed", { replace: true });
    }
  }, [user, navigate]);

  // Only show landing if not logged in
  if (user) return null;

  return (
    <div>
      <LandingPage />
      <Marquees />
      <Cards />
    </div>
  );
};

export default FeedOrLanding;
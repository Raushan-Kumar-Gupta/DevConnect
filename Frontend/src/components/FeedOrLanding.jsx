import { useSelector } from "react-redux";
import Feed from "./Feed";
import LandingPage from "./LandingPage";
import Marquees from "./Marquees";
import Cards from "./Cards";

const FeedOrLanding = () => {
  const user = useSelector((store) => store.user);
  return user && user._id ? (
    <Feed />
  ) : (
    <div>
      <LandingPage />
      <Marquees/>
      <Cards/>
    </div>
  );
};

export default FeedOrLanding;

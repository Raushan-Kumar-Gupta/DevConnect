import { useSelector } from "react-redux";
import Feed from "./Feed";
import LandingPage from "./LandingPage";
import Marquees from "./Marquees";
import Cards from "./Cards";

const FeedOrLanding = () => {
 (
    <div>
      <LandingPage />
      <Marquees/>
      <Cards/>
    </div>
  );
};

export default FeedOrLanding;

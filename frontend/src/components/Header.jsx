import { FaPlaneDeparture } from "react-icons/fa";
import { WiDayCloudy } from "react-icons/wi";

function Header() {

  return (

    <div className="dashboard-header">

      <div className="header-left">

        <FaPlaneDeparture className="header-icon" />

        <div>

          <h1>
            Flight Delay Prediction System
          </h1>

          <p>
            AI Aviation Intelligence Dashboard
          </p>

        </div>

      </div>

      <WiDayCloudy className="weather-icon" />

    </div>
  );
}

export default Header;
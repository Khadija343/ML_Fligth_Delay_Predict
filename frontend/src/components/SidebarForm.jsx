import { useState } from "react";
import { motion } from "framer-motion";
import AnalyticsSlider from "./AnalyticsSlider";

function SidebarForm({ setPredictionData }) {

  const [formData, setFormData] = useState({

    flight_distance_km: "",
    departure_hour: "",
    season: "winter",
    airline_type: "premium",
    aircraft_type: "narrow-body",
    airport_category: "medium",
    weather_severity_index: "",
    wind_speed_kmh: "",
    visibility_km: "",
    airport_congestion_level: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:5000/predict",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    // TEMPORARY MOCK IMPORTANCE DATA
    data.feature_importance = [

      {
        feature: "Weather Severity",
        impact: 34
      },

      {
        feature: "Wind Speed",
        impact: 22
      },

      {
        feature: "Airport Congestion",
        impact: 18
      },

      {
        feature: "Visibility",
        impact: 14
      }

    ];

    setPredictionData(data);
  };

  return (

    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass-card"
    >

      <h2>Flight Inputs</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Flight Distance (NM)
            <p className="field-helper">

  Typical commercial route:
  300–7000 NM

</p>
 </label>
          

          <input
            type="number"
            name="flight_distance_km"
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label>Departure Hour (0-23) </label>

          <input
            type="number"
            name="departure_hour"
            min="0"
            max="23"
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-group">

          <label>Season</label>

          <select
            name="season"
            onChange={handleChange}
          >

            <option value="winter">Winter</option>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>

          </select>

        </div>

        <div className="form-group">

          <label>Airline Type</label>

          <select
            name="airline_type"
            onChange={handleChange}
          >

            <option value="premium">Premium</option>
            <option value="international">
              International
            </option>
            <option value="cargo">Cargo</option>
            <option value="low-cost">
              Low Cost
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>Aircraft Type</label>

          <select
            name="aircraft_type"
            onChange={handleChange}
          >

            <option value="narrow-body">
              Narrow Body
            </option>

            <option value="wide-body">
              Wide Body
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>Airport Category</label>

          <select
            name="airport_category"
            onChange={handleChange}
          >

            <option value="small">
              Small
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="large_hub">
              Large Hub
            </option>

          </select>

        </div>

       <div className="weather-section">

  <div className="weather-title">

    WEATHER CONDITIONS

  </div>

  <AnalyticsSlider

    label="WEATHER SEVERITY INDEX"

    value={formData.weather_severity_index}

    min={0}

    max={10}

    step={0.1}

    name="weather_severity_index"

    unit="/10"

    leftLabel="0 /10"

    rightLabel="10 /10"

    onChange={handleChange}

  />

  <AnalyticsSlider

    label="WIND SPEED"

    value={formData.wind_speed_kmh}

    min={0}

    max={150}

    step={1}

    name="wind_speed_kmh"

    unit="km/h"

    leftLabel="0 km/h"

    rightLabel="150 km/h"

    onChange={handleChange}

  />

  <AnalyticsSlider

    label="VISIBILITY"

    value={formData.visibility_km}

    min={0}

    max={30}

    step={0.1}

    name="visibility_km"

    unit="km"

    leftLabel="0 km"

    rightLabel="30 km"

    onChange={handleChange}

  />

  <AnalyticsSlider

    label="AIRPORT CONGESTION"

    value={formData.airport_congestion_level}

    min={0}

    max={10}

    step={0.1}

    name="airport_congestion_level"

    unit="/10"

    leftLabel="LOW"

    rightLabel="HIGH"

    onChange={handleChange}

  />

</div>

        

        <button className="predict-btn">
          Predict Flight
        </button>

      </form>

    </motion.div>
  );
}

export default SidebarForm;
import GaugeChart from "./GaugeChart";
import FeatureImportance from "./FeatureImportance";
import FlightSummary from "./FlightSummary";

function AnalyticsPanel({ predictionData }) {

  if (!predictionData) {

    return (

      <div className="empty-state">

        <h2>
          AI Prediction Analytics
        </h2>

        <p>
          Submit flight information to view
          intelligent analytics.
        </p>

      </div>
    );
  }

  return (

    <div>

      <GaugeChart

  probability={
    predictionData.delay_probability
  }

  predictionResult={
    predictionData.result
  }

/>

      <FlightSummary
        predictionData={predictionData}
      />

      <FeatureImportance

  data={predictionData.feature_importance}

  predictionResult={
    predictionData.result
  }

/>

    </div>
  );
}

export default AnalyticsPanel;
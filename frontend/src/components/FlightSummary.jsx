import { motion } from "framer-motion";

function FlightSummary({ predictionData }) {

  const probability =
    predictionData.delay_probability * 100;

  const resultColor =
    predictionData.result === "Delayed"
      ? "#ef4444"
      : "#22c55e";

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20
      }}

      animate={{
        opacity: 1,
        y: 0
      }}

      transition={{
        duration: 0.5
      }}

      className="glass-card result-card-modern"
    >

      <div className="result-header">

        <h2>
          Prediction Result
        </h2>

        <div className="ai-badge">

          AI ANALYSIS

        </div>

      </div>

      <h1
        className="result-modern"
        style={{
          color: resultColor
        }}
      >

        {predictionData.result}

      </h1>

      <div className="confidence-text">

        Prediction Confidence:
        {" "}

        <span>

          {probability.toFixed(2)}%

        </span>

      </div>

    </motion.div>
  );
}

export default FlightSummary;
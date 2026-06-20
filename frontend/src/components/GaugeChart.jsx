import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis
} from "recharts";

import { motion } from "framer-motion";

function GaugeChart({

  probability,
  predictionResult

})
{

  const percentage = probability * 100;

  // =========================================
  // DYNAMIC COLORS
  // =========================================

  const getColor = () => {

    if (percentage >= 70) {
      return "#ef4444";
    }

    if (percentage >= 40) {
      return "#f59e0b";
    }

    return "#22c55e";
  };

  const gaugeColor = getColor();

  // =========================================
  // DATA
  // =========================================

  const data = [
    {
      name: "Delay Probability",
      value: percentage,
      fill: gaugeColor
    }
  ];

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
        duration: 0.6
      }}

      className="glass-card chart-card gauge-container"
    >

      <div className="gauge-header">

        <h2>

  {
    predictionResult === "Delayed"

      ? "Delay Probability"

      : "On-Time Confidence"
  }

</h2>

        <div className="live-indicator">

          <span className="live-dot"></span>

          AI LIVE

        </div>

      </div>

      {/* ========================================= */}
      {/* GAUGE */}
      {/* ========================================= */}

      <div className="gauge-wrapper">

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <RadialBarChart

            innerRadius="70%"

            outerRadius="100%"

            barSize={22}

            data={data}

            startAngle={180}

            endAngle={0}

          >

            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              tick={false}
            />

            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={20}
            />

          </RadialBarChart>

        </ResponsiveContainer>

        {/* CENTER TEXT */}

        <div className="gauge-center">

          <motion.h1

            initial={{
              scale: 0.7,
              opacity: 0
            }}

            animate={{
              scale: 1,
              opacity: 1
            }}

            transition={{
              delay: 0.3
            }}

            style={{
              color: gaugeColor
            }}

          >

            {percentage.toFixed(1)}%

          </motion.h1>

          <p>

  {
    predictionResult === "Delayed"

      ? (
          percentage >= 70
            ? "High Delay Risk"
            : percentage >= 40
            ? "Moderate Risk"
            : "Low Risk"
        )

      : (
          percentage >= 70
            ? "Strong Operational Stability"
            : percentage >= 40
            ? "Moderate Stability"
            : "Low Stability Confidence"
        )
  }

</p>

        </div>

      </div>

    </motion.div>
  );
}

export default GaugeChart;
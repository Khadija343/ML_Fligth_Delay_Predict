import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

import { motion } from "framer-motion";

function FeatureImportance({

  data,
  predictionResult

}) {

  const colors = [
    "#38bdf8",
    "#0ea5e9",
    "#0284c7",
    "#0369a1"
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

      className="glass-card chart-card"
    >

      <div className="chart-header">

        <h2>

  {
    predictionResult === "Delayed"

      ? "Top Delay Factors"

      : "Flight Performance Factors"
  }

</h2>
  <p className="chart-subtitle">

  {
    predictionResult === "Delayed"

      ? "Primary contributors increasing delay probability"

      : "Primary factors supporting operational stability"
  }

</p>

        <div className="chart-badge">

          LIVE ANALYTICS

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart

          data={data}

          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 20
          }}

        >

          <XAxis

            dataKey="feature"

            tick={{
              fill: "#cbd5e1",
              fontSize: 14
            }}

            axisLine={{
              stroke: "rgba(255,255,255,0.15)"
            }}

            tickLine={false}
          />

          <YAxis

            tick={{
              fill: "#cbd5e1"
            }}

            axisLine={false}

            tickLine={false}
          />

          <Tooltip

  formatter={(value) => [`${value}%`, "Impact"]}

  cursor={{
    fill:
      "rgba(255,255,255,0.05)"
  }}

  contentStyle={{

    background:
      "#0f172a",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius:
      "14px",

    color:
      "#f8fafc",

    backdropFilter:
      "blur(12px)",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.35)"
  }}

  labelStyle={{

    color:
      "#38bdf8",

    fontWeight:
      "600"
  }}

  itemStyle={{

    color:
      "#f8fafc",

    fontWeight:
      "600"
  }}

/>

          <Bar

            dataKey="impact"

            radius={[12, 12, 0, 0]}

            animationDuration={1800}

          >

            {
              data.map((entry, index) => (

                <Cell

                  key={index}

                  fill={
                    colors[index % colors.length]
                  }

                  style={{
                    filter:
                      "drop-shadow(0 0 8px rgba(56,189,248,0.35))"
                  }}

                />

              ))
            }

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </motion.div>
  );
}

export default FeatureImportance;
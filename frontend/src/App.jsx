import { useState } from "react";
import Header from "./components/Header";
import SidebarForm from "./components/SidebarForm";
import AnalyticsPanel from "./components/AnalyticsPanel";
function App() {
  const [predictionData, setPredictionData] = useState(null);
  return (
    <div className="dashboard-container">
      {/* Background Overlay */}
      <div className="background-overlay"></div>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <div className="main-layout">
        {/* LEFT PANEL */}
        <div className="left-panel">
          <SidebarForm
            setPredictionData={setPredictionData}
          />
        </div>
        {/* RIGHT PANEL */}
        <div className="right-panel">
          <AnalyticsPanel
            predictionData={predictionData}
          />
        </div>

      </div>

    </div>
  );
}

export default App;
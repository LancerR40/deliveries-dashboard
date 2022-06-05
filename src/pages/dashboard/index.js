import { useState } from "react";
import Navigation from "../../components/navigation";
import { DASHBOARD_SECTIONS } from "../../constants";

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState(DASHBOARD_SECTIONS.english.dashboard);

  return (
    <div className="lg:flex lg:min-h-screen lg:h-screen">
      <Navigation current={currentSection} change={setCurrentSection} />
    </div>
  );
};

export default Dashboard;

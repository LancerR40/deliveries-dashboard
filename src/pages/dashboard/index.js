import { useState } from "react";
import Navigation from "../../components/navigation";
import { H1 } from "../../components/ui";
import { DASHBOARD_SECTIONS } from "../../constants";
import image from "../../assets/images/image.png";

import Drivers from "../../components/drivers";
import Vehicles from "../../components/vehicles";
import Deliveries from "../../components/deliveries";

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState(DASHBOARD_SECTIONS.english.vehicles);

  return (
    <div className="lg:flex lg:min-h-screen lg:h-screen">
      <Navigation current={currentSection} change={setCurrentSection} />

      <div className="lg:flex-1 p-3 overflow-y-auto">
        <div className="border-b border-gray-100 pb-3">
          <div className="lg:flex lg:justify-between lg:items-center">
            <span className="text-gray-700 text-sm">
              Dashboard / {DASHBOARD_SECTIONS.spanish[currentSection.toLowerCase()]}
            </span>

            <div className="hidden lg:relative lg:flex lg:items-center">
              <div className="mr-3">
                <span className="text-gray-700 text-sm">
                  Bienvenido, <span className="font-bold">Ronald</span>
                </span>
              </div>

              <img className="w-9 h-9 rounded-full object-cover" src={image} alt="" />
            </div>
          </div>

          <H1 color="gray-700" size="2xl" className="mt-2">
            {DASHBOARD_SECTIONS.spanish[currentSection.toLowerCase()]}
          </H1>
        </div>

        <div className="mt-3">
          {currentSection === DASHBOARD_SECTIONS.english.drivers && <Drivers />}

          {currentSection === DASHBOARD_SECTIONS.english.vehicles && <Vehicles />}

          {currentSection === DASHBOARD_SECTIONS.english.deliveries && <Deliveries />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

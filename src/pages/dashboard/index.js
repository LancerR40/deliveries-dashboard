import { useState } from "react";

import { H1 } from "../../components/ui";
import Navigation from "../../components/navigation";

import Principal from "../../components/principal";
import Shipments from "../../components/shipments";
import Tracking from "../../components/tracking"
import Drivers from "../../components/drivers";
import Vehicles from "../../components/vehicles";

import { useUserContext } from "../../contexts/user";
import { DASHBOARD_SECTIONS } from "../../constants";

const Dashboard = () => {
  const { name, lastname, photo } = useUserContext();
  const [currentSection, setCurrentSection] = useState(DASHBOARD_SECTIONS.english.dashboard);

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
                  Bienvenido, <span className="font-bold">{name}</span>
                </span>
              </div>

              <img className="w-9 h-9 rounded-full object-cover" src={photo} alt={`${name} ${lastname}`} />
            </div>
          </div>

          <H1 className="mt-2 text-gray-700" weight="normal">
            {DASHBOARD_SECTIONS.spanish[currentSection.toLowerCase()]}
          </H1>
        </div>

        <div className="mt-3">
          {currentSection === DASHBOARD_SECTIONS.english.dashboard && <Principal />}

          {currentSection === DASHBOARD_SECTIONS.english.shipments && <Shipments />}

          {currentSection === DASHBOARD_SECTIONS.english.tracker && <Tracking />}

          {currentSection === DASHBOARD_SECTIONS.english.drivers && <Drivers />}

          {currentSection === DASHBOARD_SECTIONS.english.vehicles && <Vehicles />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

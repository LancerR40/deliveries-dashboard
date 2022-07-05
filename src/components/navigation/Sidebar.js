import navItems from "./navItems";

import { useAuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

import { DASHBOARD_SECTIONS } from "../../constants";

const handlerBg = (navItem, currentItem) => {
  if (navItem === currentItem) {
    return "bg-blue-500";
  }
};

const Sidebar = ({ current, change }) => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const onClick = (section) => {
    if (section === DASHBOARD_SECTIONS.english.logout.toLowerCase()) {
      navigate("/");

      setAuth({ isAuth: false, role: null });
      return localStorage.removeItem("token");
    }

    const name = DASHBOARD_SECTIONS.english[section];

    change(name);
  };

  return (
    <div className="p-3 flex flex-col gap-2" style={{ minWidth: "300px", background: "#0E1A35", overflowY: "auto" }}>
      {navItems.map((item) => {
        const { id, name, icon } = item;

        const translationName = DASHBOARD_SECTIONS.spanish[name];
        const itemBg = handlerBg(DASHBOARD_SECTIONS.english[name], current);

        return (
          <div
            key={id}
            className={`flex items-center text-white py-3 px-3 rounded cursor-pointer shadow-sm transition-all ${itemBg}`}
            onClick={() => onClick(name)}
          >
            <div>{icon}</div>

            <span className="ml-3 text-sm">{translationName}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;

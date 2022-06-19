import { MdDashboard, MdScreenshot } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTruck } from "react-icons/fa";

const navItems = [
  {
    id: 1,
    name: "dashboard",
    icon: <MdDashboard className="text-lg" />,
  },
  {
    id: 2,
    name: "deliveries",
    icon: <TbTruckDelivery className="text-lg" />,
  },
  {
    id: 3,
    name: "tracker",
    icon: <MdScreenshot className="text-lg" />,
  },
  {
    id: 4,
    name: "drivers",
    icon: <ImUsers className="text-lg" />,
  },
  {
    id: 5,
    name: "vehicles",
    icon: <FaTruck className="text-lg" />,
  },
  {
    id: 6,
    name: "logout",
    icon: <BiLogOut className="text-lg" />,
  },
];

export default navItems;

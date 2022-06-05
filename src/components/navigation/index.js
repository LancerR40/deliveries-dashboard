import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useScreen from "../../hooks/useScreen";

const Navigation = ({ current, change }) => {
  const { screenWidth } = useScreen();

  return screenWidth <= 1024 ? <Navbar {...{ current, change }} /> : <Sidebar {...{ current, change }} />;
};

export default Navigation;

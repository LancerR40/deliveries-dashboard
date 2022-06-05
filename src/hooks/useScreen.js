import { useState, useEffect } from "react";

const useScreen = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const screenWidthHandler = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", screenWidthHandler);

    return () => {
      window.removeEventListener("resize", screenWidthHandler);
    };
  }, []);

  return { screenWidth };
};

export default useScreen;

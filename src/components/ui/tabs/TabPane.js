import { useEffect } from "react";
import { useTabsContext } from "./Tabs";

const TabPane = ({ tab, id, children }) => {
  const { setElement, changeRenderedElement, activeElementId } = useTabsContext();

  const onClick = () => changeRenderedElement(id);

  useEffect(() => setElement({ id, children }), []);

  const isActiveElement = activeElementId === id;
  const activeElementColor = isActiveElement && "text-blue-500";

  const classes = `mr-5 cursor-pointer ${activeElementColor}`;

  return (
    <span className={classes} data-id={id} onClick={onClick}>
      {tab}
    </span>
  );
};

export default TabPane;

import { createContext, useContext, useState, useEffect } from "react";

export const TabsContext = createContext(null);

export const useTabsContext = () => useContext(TabsContext);

const Tabs = ({ className, style, defaultTabPane, children }) => {
  const classes = `mt-5 relative text-gray-900 text-sm ${className}`;

  const [activeLineProps, setActiveLineProps] = useState({
    width: 0,
    marginLeft: 0,
  });

  // All jsx elements
  const [elements, setElements] = useState([]);

  // Active jsx element
  const [activeElement, setActiveElement] = useState({});

  const setElement = (element) => setElements((state) => [...state, element]);

  const changeRenderedElement = (elementId) => {
    const element = elements.find((element) => element.id === elementId);

    setActiveElement(element);
  };

  useEffect(() => setActiveElement(elements[defaultTabPane - 1 || 0]), [elements]);

  useEffect(() => {
    if (!activeElement || Object.keys(activeElement).length < 1) {
      return;
    }

    const elementId = activeElement.id || defaultTabPane;

    const tabPaneElement = document.querySelectorAll(`[data-id="${elementId}"]`)[0];
    const tabPaneElementWidth = tabPaneElement.getBoundingClientRect().width;

    setActiveLineProps((state) => ({ ...state, width: tabPaneElementWidth }));

    if (elementId === 1) {
      return setActiveLineProps((state) => ({ ...state, marginLeft: 0 }));
    }

    let marginLeft = 0;
    for (let i = 0; i < activeElement.id - 1; i++) {
      const tabPaneElement = document.querySelectorAll(`[data-id="${i + 1}"]`)[0];

      const style = Number(
        (tabPaneElement.currentStyle || window.getComputedStyle(tabPaneElement)).marginRight.slice(0, -2)
      );

      const tabPaneElementWidth = tabPaneElement.getBoundingClientRect().width + style;

      marginLeft += tabPaneElementWidth;
    }

    setActiveLineProps((state) => ({ ...state, marginLeft }));
  }, [activeElement]);

  const value = {
    setElement,
    changeRenderedElement,
    activeElementId: activeElement?.id || defaultTabPane,
  };

  const renderElement = activeElement?.children ?? "";

  return (
    <section className={classes} style={style}>
      <div className="whitespace-nowrap overflow-x-auto">
        <TabsContext.Provider value={value}>{children}</TabsContext.Provider>

        <div className="mt-3 bg-gray-50 h-0.5">
          <div className="bg-blue-500 w-0 h-0.5 transition-all" style={activeLineProps}></div>
        </div>
      </div>

      <div>{renderElement}</div>
    </section>
  );
};

export default Tabs;

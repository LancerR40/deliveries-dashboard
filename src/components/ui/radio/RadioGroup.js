import { Children, cloneElement, isValidElement } from "react";
import classNames from "classnames";

const sizes = { 
  sm: "text-sm", 
  lg: "text-base" 
};

const RadioGroup = ({ className, style, size = "sm", value, onChange, children }) => {
  const radios = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const props = { name: value, onChange };

      return cloneElement(child, props);
    }

    return child;
  });

  const classes = classNames("flex", sizes[size], className);

  return (
    <div className={classes} style={style}>
      {radios}
    </div>
  );
};

export default RadioGroup;
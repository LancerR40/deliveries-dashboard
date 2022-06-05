import { Children, cloneElement, isValidElement } from "react";

const RadioGroup = ({ className, style, label, value, children, color, size, onChange }) => {
  const radios = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const props = { name: value, onChange };

      return cloneElement(child, props);
    }

    return child;
  });

  return (
    <div className={className} style={style}>
      <label className={`text-${color} text-${size}`}>{label}</label>

      <div className="flex mt-5">{radios}</div>
    </div>
  );
};

export default RadioGroup;

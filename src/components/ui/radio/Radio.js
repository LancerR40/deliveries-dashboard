import classNames from "classnames";

const sizes = { 
  sm: "text-sm", 
  lg: "text-base" 
};

const Radio = ({ name, size = "sm", value, defaultChecked, checked, onChange, children }) => {
  const customProps = {};

  if (typeof checked === "boolean") {
    customProps.checked = checked;
  }

  if (typeof defaultChecked === "boolean") {
    customProps.defaultChecked = defaultChecked;
  }

  const classes = classNames("mr-5", sizes[size], classNames);

  return (
    <div className={classes}>
      <input className="mr-2" type="radio" name={name} value={value} onChange={onChange} {...customProps} />

      <span>{children}</span>
    </div>
  );
};

export default Radio;
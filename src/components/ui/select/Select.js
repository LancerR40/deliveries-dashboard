import classNames from "classnames";

const defaultClasses = "w-full rounded border-2 border-gray-100 focus:border-blue-500 outline-0 transition-all";
const sizes = {
  sm: "p-2 text-sm",
  lg: "p-3 text-base",
};

const Select = ({ className, style, name, size = "sm", value, onChange, children }) => {
  const classes = classNames(defaultClasses, sizes[size], className);

  const customProps = {};

  if (typeof value === "string") {
    customProps.value = value;
  }

  return (
    <select className={classes} style={style} name={name} onChange={onChange} {...customProps}>
      {children}
    </select>
  );
};

export default Select;
import classNames from "classnames";

const defaultClasses = "w-full rounded border-2 border-gray-100 focus:border-blue-500 outline-0 transition-all";
const sizes = {
  sm: "p-2 text-sm",
  lg: "p-3 text-base",
};

const Date = ({ className, style, name, size = "sm", onChange }) => {
  const classes = classNames(defaultClasses, sizes[size], className);

  return <input className={classes} style={style} type="date" name={name} onChange={onChange} />;
};

export default Date;
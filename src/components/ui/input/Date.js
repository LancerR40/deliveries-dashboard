import classNames from "classnames";

const Date = ({ className, style, name, color, size = "sm", onChange }) => {
  const classes = classNames(
    className,
    `w-full rounded border-2 border-gray-100 focus:border-blue-500 outline-0 transition-all text-${color}`,
    {
      "p-2 text-sm": size === "sm",
      "p-3 text-base": size === "lg",
    }
  );

  return <input className={classes} style={style} type="date" name={name} onChange={onChange} />;
};

export default Date;

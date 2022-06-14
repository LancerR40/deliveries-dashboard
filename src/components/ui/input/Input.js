import classNames from "classnames";

const Input = ({
  className,
  style,
  type = "text",
  name,
  defaultValue,
  placeholder,
  color,
  size = "sm",
  onChange,
  children,
}) => {
  const classes = classNames(
    className,
    `w-full rounded border-2 border-gray-100 focus:border-blue-500 outline-0 transition-all text-${color}`,
    {
      "p-2 text-sm": size === "sm",
      "p-3 text-base": size === "lg",
    }
  );

  return (
    <input
      className={classes}
      style={style}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
    >
      {children}
    </input>
  );
};

export default Input;

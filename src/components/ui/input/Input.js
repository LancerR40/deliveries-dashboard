import classNames from "classnames";

const Input = ({
  className,
  style,
  type = "text",
  name,
  placeholder,
  defaultValue,
  value,
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

  const onChangeHandler = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  const customProps = {};

  if (typeof value === "string") {
    customProps.value = value;
  }

  if (typeof defaultValue === "string") {
    customProps.defaultValue = defaultValue;
  }

  return (
    <input
      className={classes}
      style={style}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChangeHandler}
      {...customProps}
    >
      {children}
    </input>
  );
};

export default Input;

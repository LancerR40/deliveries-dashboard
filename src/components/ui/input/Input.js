import classNames from "classnames";

const defaultClasses = "w-full rounded border-2 border-gray-100 focus:border-blue-500 outline-0 transition-all";
const sizes = {
  sm: "p-2 text-sm",
  lg: "p-3 text-base",
};

const Input = ({ className, style, type = "text", size = "sm", name, placeholder, defaultValue, value, disabled = false, onChange, children }) => {
  const classes = classNames(defaultClasses, sizes[size], className)

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
      disabled={disabled}
      {...customProps}
    >
      {children}
    </input>
  );
};

export default Input;

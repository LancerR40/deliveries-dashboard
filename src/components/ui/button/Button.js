import classNames from "classnames";

const Button = ({ className, style, type, bg, color, children, size = "sm", onClick }) => {
  const classes = classNames(className, `w-full rounded bg-${bg} text-${color}`, {
    "p-2 text-sm": size === "sm",
    "p-3 text-base": size === "lg",
  });

  return (
    <button className={classes} style={style} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

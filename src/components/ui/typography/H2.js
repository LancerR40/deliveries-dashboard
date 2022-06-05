import classNames from "classnames";

const H2 = ({ className, style, size, color, weight, children }) => {
  const classes = classNames(className, `text-${color} text-${size} font-${weight}`);

  return (
    <h1 className={classes} style={style}>
      {children}
    </h1>
  );
};

export default H2;

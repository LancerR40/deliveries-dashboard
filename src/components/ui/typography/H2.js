import classNames from "classnames";

const defaultClasses = "text-2xl font-bold";

const H2 = ({ className, style, children }) => {
  const classes = classNames(defaultClasses, className);

  return (
    <h1 className={classes} style={style}>
      {children}
    </h1>
  );
};

export default H2;

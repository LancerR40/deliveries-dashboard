import classNames from "classnames";

const defaultClasses = "text-3xl font-bold";

const H1 = ({ className, style, children }) => {
  const classes = classNames(defaultClasses, className);

  return (
    <h1 className={classes} style={style}>
      {children}
    </h1>
  );
};

export default H1;

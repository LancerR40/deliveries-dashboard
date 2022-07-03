import classNames from "classnames";

const defaultClasses = "mb-2";

const Label = ({ className, style, children }) => {
  const classes = classNames(defaultClasses, className);

  return (
    <label className={classes} style={style}>
      {children}
    </label>
  );
};

export default Label;

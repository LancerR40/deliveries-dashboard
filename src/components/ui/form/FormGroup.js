import classNames from "classnames";

const defaultClasses = "mb-4";

const FormGroup = ({ className, style, children }) => {
  const classes = classNames(defaultClasses, className);

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default FormGroup;

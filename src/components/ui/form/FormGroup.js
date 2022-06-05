import classNames from "classnames";

const FormGroup = ({ className, style, label, color, size, children }) => {
  const classes = classNames(className, `text-${color} text-${size}`);

  return (
    <div className={classes} style={style}>
      <label className="block mb-2">{label}</label>

      {children}
    </div>
  );
};

export default FormGroup;

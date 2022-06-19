const Radio = ({ name, value, children, color, size, onChange, defaultChecked, checked }) => {
  const customProps = {};

  if (typeof checked === "boolean") {
    customProps.checked = checked;
  }

  if (typeof defaultChecked === "boolean") {
    customProps.defaultChecked = defaultChecked;
  }

  return (
    <div className="mr-5">
      <input type="radio" name={name} value={value} onChange={onChange} {...customProps} />

      <span className={`ml-2 text-${color} text-${size}`}>{children}</span>
    </div>
  );
};

export default Radio;

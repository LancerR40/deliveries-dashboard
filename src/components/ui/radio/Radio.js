const Radio = ({ name, value, isChecked = false, children, color, size, onChange }) => (
  <div className="mr-5">
    <input type="radio" name={name} value={value} defaultChecked={isChecked} onChange={onChange} />

    <span className={`ml-2 text-${color} text-${size}`}>{children}</span>
  </div>
);

export default Radio;

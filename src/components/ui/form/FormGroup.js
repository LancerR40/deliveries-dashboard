const FormGroup = ({ className, style, label, children }) => {
  return (
    <div className={className} style={style}>
      <label className="block mb-2">{label}</label>

      {children}
    </div>
  );
};

export default FormGroup;

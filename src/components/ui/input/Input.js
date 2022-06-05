const Input = ({ className, style, type, name, placeholder, onChange }) => {
  const classes = `w-full p-2 rounded border-2 border-gray-100 focus:border-blue-500 outline-0 transition-all ${className}`;

  return (
    <input className={classes} style={style} type={type} name={name} placeholder={placeholder} onChange={onChange} />
  );
};

export default Input;

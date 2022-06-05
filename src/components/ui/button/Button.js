const Button = ({ className, style, type, children }) => {
  const classes = `w-full p-2 rounded ${className}`;

  return (
    <button type={type} className={classes} style={style}>
      {children}
    </button>
  );
};

export default Button;

const H2 = ({ className, style, children }) => {
  const classes = `text-2xl ${className}`;

  return (
    <h2 className={classes} style={style}>
      {children}
    </h2>
  );
};

export default H2;

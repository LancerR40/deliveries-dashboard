const H1 = ({ className, style, children }) => {
  const classes = `text-3xl ${className}`;

  return (
    <h1 className={classes} style={style}>
      {children}
    </h1>
  );
};

export default H1;

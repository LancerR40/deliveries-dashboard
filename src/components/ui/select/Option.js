const Option = ({ value = "", children, isDisable = false }) => {
  return (
    <option value={value} disabled={isDisable}>
      {children}
    </option>
  );
};

export default Option;

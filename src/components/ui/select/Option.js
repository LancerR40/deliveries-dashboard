const Option = ({ value = "", isDisable = false, children}) => {
  return (
    <option value={value} disabled={isDisable}>
      {children}
    </option>
  );
};

export default Option;

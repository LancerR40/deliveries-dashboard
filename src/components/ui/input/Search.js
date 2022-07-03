import classNames from "classnames";
import { GoSearch } from "react-icons/go";

const defaultClasses = "flex items-center w-full rounded border-2 border-gray-100 focus-within:border-blue-500 transition-all";
const sizes = {
  sm: "p-2 text-sm",
  lg: "p-3 text-base",
};

const Search = ({ className, style, size = "sm", name, placeholder, onChange }) => {
  const classes = classNames(defaultClasses, sizes[size], className);

  return (
    <div className={classes} style={style}>
      <GoSearch className="text-xl" />

      <input className="px-4 flex-1 outline-0" type="text" name={name} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Search;

import classNames from "classnames";
import { GoSearch } from "react-icons/go";

const Search = ({ className, style, name, placeholder, color, size = "sm", onChange }) => {
  const classes = classNames(
    className,
    `flex items-center w-full rounded border-2 border-gray-100 focus-within:border-blue-500 transition-all text-${color}`,
    {
      "p-2.5 text-sm": size === "sm",
      "p-3 text-base": size === "lg",
    }
  );

  return (
    <div className={classes} style={style}>
      <GoSearch className="text-xl" />

      <input className="px-4 flex-1 outline-0" type="text" name={name} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Search;

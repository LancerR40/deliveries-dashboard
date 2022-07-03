import classNames from "classnames";
import { useState } from "react";

const defaultClasses = "relative flex items-center w-full rounded border-2 border-gray-100 active:border-blue-500 outline-0 transition-all";
const sizes = {
  sm: "p-2 text-sm",
  lg: "p-3 text-base",
};

const Photo = ({ className, style, name, placeholder, size = "sm", onChange }) => {
  const [photoName, setPhotoName] = useState(null);

  const handler = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const filename = file.name;
    const extension = filename.split(".")[1];
    const allowedExtension = ["png", "jpg", "jpge"];

    if (!allowedExtension.includes(extension)) {
      return;
    }

    setPhotoName(filename);

    if (onChange) {
      onChange(e);
    }
  };

  const classes = classNames(defaultClasses, sizes[size], className);

  return (
    <div className={classes} style={style}>
      <span>{!photoName ? placeholder : photoName}</span>

      <input className="absolute inset-0 opacity-0" type="file" name={name} onChange={handler} />
    </div>
  );
};

export default Photo;

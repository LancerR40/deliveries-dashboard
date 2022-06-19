import { FormGroup, Input, Date, RadioGroup, Radio, Select, Option, Button, H2 } from "../ui";
import { MdAddToPhotos } from "react-icons/md";
import { useState, useEffect } from "react";
import { getBrandsAPI } from "../../api/vehicles";

const Form = () => {
  const [brands, setBrands] = useState([]);

  const [vehicle, setVehicle] = useState({
    colors: [],
  });
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const response = await getBrandsAPI();

    if (response.success && response.data.length) {
      setBrands(response.data);
    }
  };

  const addColorHandler = () => {
    const colorsLength = vehicle?.colors?.length;

    if (colorsLength === 2) {
      return alert("No puedes añadir más de dos colores");
    }

    setVehicle((state) => ({ ...state, colors: [...state.colors, selectedColor] }));
    setSelectedColor("");
  };

  const colorHandler = (e) => {
    setSelectedColor(e.target.value);
  };

  return (
    <form>
      <H2 className="mt-5" size="xl">
        Añadir vehículo
      </H2>

      <FormGroup className="mt-5" label="Modelo:" size="sm" color="gray-700">
        <Input type="text" name="model" placeholder="Ingresa el modelo..." color="gray-700" />
      </FormGroup>

      {/* <FormGroup className="mt-5" label="Marca:" size="sm" color="gray-700">
        <Select name="brand" color="gray-700">
          <Option>Selecciona un modelo...</Option>
          {brands.map((name) => (
            <Option key={name} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </FormGroup> */}

      {/* <FormGroup className="mt-5" label="Colores:" size="sm" color="gray-700">
        <div className="flex items-center gap-2">
          <Input
            className="flex-1"
            type="text"
            name="colors"
            placeholder="Agregar color..."
            color="gray-700"
            defaultValue={selectedColor}
            onChange={colorHandler}
          />
          <div className="flex justify-center items-center w-10 h-10 rounded bg-blue-500 text-red-500 cursor-pointer">
            <MdAddToPhotos className="text-white text-lg" onClick={addColorHandler} />
          </div>
        </div>
      </FormGroup> */}
    </form>
  );
};

export default Form;

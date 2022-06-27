import { FormGroup, Input, Select, Option, Button, H2, Search } from "../ui";
import { useState, useEffect } from "react";

import { getBrandsAPI, createVehicleAPI } from "../../api/vehicles";
import { driversByQueriesAPI } from "../../api/drivers";

import classNames from "classnames";
import { MdAddToPhotos } from "react-icons/md";

const Form = () => {
  const [brands, setBrands] = useState([]);
  const [ownerType, setOwnerType] = useState("company");

  const [selectedColor, setSelectedColor] = useState("");

  const [vehicle, setVehicle] = useState({
    model: "",
    brand: "",
    colors: [],
    type: "",
    licenseNumber: "",
    tiresNumber: "",
    owner: "company",
  });
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    const response = await getBrandsAPI();

    if (response.success && response.data.length) {
      setBrands(response.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await createVehicleAPI(vehicle);

    if (!response.success) {
      alert(response.error.message);
    }

    if (response.success) {
      setVehicle({
        model: "",
        brand: "",
        colors: [],
        type: "",
        licenseNumber: "",
        tiresNumber: "",
        owner: "company",
      });
      setSelectedColor("");
      setOwnerType("company");

      alert(response.data.message);
    }
  };

  const vehicleHandler = (e) => {
    const { name, value } = e.target;

    setVehicle((state) => ({ ...state, [name]: value }));
  };

  const addColorHandler = () => {
    const colorsLength = vehicle?.colors?.length;

    if (colorsLength === 2) {
      return alert("No puedes añadir más de dos colores");
    }

    setVehicle((state) => ({ ...state, colors: [...state.colors, selectedColor] }));
    setSelectedColor("");
  };

  const ownerHandler = (owner) => {
    if (owner === "company") {
      setVehicle((state) => ({ ...state, owner }));
      return setOwnerType(owner);
    }

    setVehicle((state) => ({ ...state, owner: "" }));
    setOwnerType(owner);
  };

  const searchDriverHandler = async (e) => {
    const { value } = e.target;

    if (!value) {
      return setDrivers([]);
    }

    const data = {
      search: {
        field: value,
      },
    };

    const response = await driversByQueriesAPI(data);

    if (response.success) {
      const { drivers } = response.data;

      setDrivers(drivers);
    }
  };

  const selectDriver = (identificationCode) => {
    setVehicle((state) => ({ ...state, owner: identificationCode }));
  };

  return (
    <form onSubmit={onSubmit}>
      <H2 className="mt-5" size="xl">
        Añadir vehículo
      </H2>

      <FormGroup className="mt-5" label="Modelo:" size="sm" color="gray-700">
        <Input
          type="text"
          name="model"
          placeholder="Ingresa el modelo..."
          color="gray-700"
          value={vehicle.model}
          onChange={vehicleHandler}
        />
      </FormGroup>

      <FormGroup className="mt-5" label="Marca:" size="sm" color="gray-700">
        <Select name="brand" color="gray-700" value={vehicle.brand} onChange={vehicleHandler}>
          <Option>Selecciona un modelo...</Option>
          {brands.map(({ id, name }) => (
            <Option key={id} value={name}>
              {name}
            </Option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup className="mt-5" label="Colores:" size="sm" color="gray-700">
        <div className="flex items-center gap-2">
          <Input
            className="flex-1"
            type="text"
            name="colors"
            placeholder="Agregar un color..."
            color="gray-700"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />

          <div className="flex justify-center items-center w-10 h-10 rounded bg-blue-500 text-red-500 cursor-pointer">
            <MdAddToPhotos className="text-white text-lg" onClick={addColorHandler} />
          </div>
        </div>
      </FormGroup>

      <FormGroup className="mt-5" label="Tipo de vehículo:" size="sm" color="gray-700">
        <Input
          type="text"
          name="type"
          placeholder="Ingresa el tipo de vehículo..."
          color="gray-700"
          value={vehicle.type}
          onChange={vehicleHandler}
        />
      </FormGroup>

      <FormGroup className="mt-5" label="Número de licencia:" size="sm" color="gray-700">
        <Input
          type="text"
          name="licenseNumber"
          placeholder="Ingresa el número de licencia..."
          color="gray-700"
          value={vehicle.licenseNumber}
          onChange={vehicleHandler}
        />
      </FormGroup>

      <FormGroup className="mt-5" label="Número de neúmaticos:" size="sm" color="gray-700">
        <Input
          type="number"
          name="tiresNumber"
          placeholder="Ingresa el número de neúmaticos..."
          color="gray-700"
          value={vehicle.tiresNumber}
          onChange={vehicleHandler}
        />
      </FormGroup>

      <FormGroup className="mt-5" label="Propietario:" size="sm" color="gray-700">
        <div className="flex text-center">
          <div
            className={classNames("flex-1 lg:flex-initial py-3 px-10 rounded-l cursor-pointer transition-all", {
              "bg-blue-500 text-white": ownerType === "company",
              "bg-gray-100": ownerType !== "company",
            })}
            onClick={() => ownerHandler("company")}
          >
            Compañia
          </div>

          <div
            className={classNames("flex-1 lg:flex-initial py-3 px-10 rounded-r cursor-pointer transition-all", {
              "bg-blue-500 text-white": ownerType === "driver",
              "bg-gray-100": ownerType !== "driver",
            })}
            onClick={() => ownerHandler("driver")}
          >
            Conductor
          </div>
        </div>
      </FormGroup>

      {ownerType === "driver" && (
        <>
          <FormGroup className="mt-5" label="Buscar un conductor específico:" size="sm" color="gray-700">
            <Search placeholder="Buscar por nombre o cédula..." onChange={searchDriverHandler} />
          </FormGroup>

          {drivers.length > 0 && (
            <>
              <H2 className="mt-5" size="xl">
                Lista de conductores
              </H2>

              <div className="mt-5 whitespace-nowrap overflow-auto">
                <div className="flex p-3" style={{ minWidth: "768px" }}>
                  <span className="flex-1">Nombre completo</span>

                  <span className="flex-1">Cédula</span>

                  <span className="flex-1">Email</span>

                  <span className="flex-1" />
                </div>

                <div className="flex flex-col gap-2" style={{ minWidth: "768px" }}>
                  {drivers.map(({ driverId, name, lastname, identificationCode, email, photo }) => (
                    <div className="flex items-center p-3 bg-gray-50 rounded" key={driverId}>
                      <span className="flex-1 flex items-center">
                        <img className="w-10 h-10 rounded-full object-cover" src={photo} alt="" />
                        <span className="ml-2">
                          {name} {lastname}
                        </span>
                      </span>

                      <span className="flex-1">{identificationCode}</span>

                      <span className="flex-1">{email}</span>

                      <span className="flex-1">
                        <Button
                          type="button"
                          bg={classNames({
                            "blue-500": identificationCode !== vehicle.owner,
                            "green-500": identificationCode === vehicle.owner,
                          })}
                          color="white"
                          className="w-28"
                          onClick={() => selectDriver(identificationCode)}
                        >
                          {identificationCode !== vehicle.owner ? "Seleccionar" : "Seleccionado"}
                        </Button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <FormGroup className="mt-5" label="Cédula del propietario:" size="sm" color="gray-700">
            <Input
              type="text"
              name="owner"
              placeholder="Ingresa la cédula del propietario..."
              color="gray-700"
              value={vehicle.owner}
              onChange={vehicleHandler}
            />
          </FormGroup>
        </>
      )}

      <Button type="submit" bg="blue-500" color="white" className="mt-5 lg:w-96">
        Registrar
      </Button>
    </form>
  );
};

export default Form;

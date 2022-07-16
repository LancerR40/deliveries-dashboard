import { H2, H3, FormGroup, Label, Input, Button } from "../ui";
import { useState, useEffect } from "react";
import classNames from "classnames";

import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Map } from "../map";

import { getDriversAPI, getAssigmentsVehiclesAPI } from "../../api/shipments";

import { MdOutlineCancel } from "react-icons/md";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const initialState = {
  products: [],
  driverIdentificationCode: "",
  vehicleLicenseNumber: "",
  shipment: {
    origin: {
      latitude: 0,
      longitude: 0,
    },
    destination: {
      latitude: 0,
      longitude: 0,
    },
  },
};

const Shipments = () => {
  const [data, setData] = useState(initialState);
  const [mapCoordinatesType, setMapCoordinatesType] = useState("initial");
  const [assigmentsVehicles, setAssigmentsVehicles] = useState([]);

  const searchDriver = async (value) => {
    const response = await getDriversAPI({ field: value });

    if (response.success) {
      const mapper = response.data.map(({ driverName, driverLastname, driverIdentificationCode, driverPhoto }) => {
        const fullname = `${driverName} ${driverLastname}`;
        const label = (
          <div className="flex items-center gap-2">
            <img className="w-6 h-6 rounded-full object-cover" src={driverPhoto} alt={fullname} />
            <span>{fullname}</span>
            <span>{driverIdentificationCode}</span>
          </div>
        );

        return {
          value: driverIdentificationCode,
          label,
        };
      });

      return mapper;
    }

    return [];
  };

  const selectDriver = async (e) => {
    setData((state) => ({ ...state, driverIdentificationCode: e.value, vehicleLicenseNumber: "" }));

    const response = await getAssigmentsVehiclesAPI({ field: e.value });

    if (response.success) {
      if (!response.data[0].vehicleModel) {
        return setAssigmentsVehicles([]);
      }

      const mapper = response.data.map(({ vehicleModel, vehicleLicenseNumber }) => {
        return {
          value: vehicleLicenseNumber,
          label: `${vehicleModel} - ${vehicleLicenseNumber}`,
        };
      });

      setAssigmentsVehicles(mapper);
    }
  };

  const selectVehicle = (vehicle) => {
    setData((state) => ({ ...state, vehicleLicenseNumber: vehicle.value }));
  };

  const addProduct = () => {};

  const removeProduct = () => {};

  const onClickMapHandler = (e) => {
    console.log(e);
  };

  const coordinatesTypeHandler = (type) => {
    setMapCoordinatesType(type);
  };

  console.log(data);

  return (
    <div>
      <H2 className="my-5 text-gray-700" weight="normal">
        Selección de conductor y vehículo
      </H2>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Buscar conductor:</Label>

          <AsyncSelect
            className="text-sm"
            cacheOptions
            loadOptions={searchDriver}
            onChange={selectDriver}
            defaultOptions
          />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Seleccionar vehículo:</Label>

          <Select
            className="text-sm"
            options={assigmentsVehicles}
            value={data.vehicleLicenseNumber}
            controlShouldRenderValue={true}
            onChange={selectVehicle}
          />
        </FormGroup>
      </FormGroup>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Cédula del conductor:</Label>

          <Input type="text" name="name" placeholder="Cédula del conductor..." />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Número de licencia del vehículo:</Label>

          <Input type="text" name="name" placeholder="Número de licencia del vehículo..." />
        </FormGroup>
      </FormGroup>

      <H2 className="mb-5 text-gray-700" weight="normal">
        Lista de productos
      </H2>

      <FormGroup className="text-sm text-gray-700">
        <Label>Agregar producto:</Label>

        <div className="lg:flex lg:gap-4">
          <Input className="flex-1 mb-5 lg:mb-0" type="text" placeholder="Nombre del producto..." />

          <Input className="flex-1" type="number" placeholder="Cantidad del producto..." />

          <div
            className="flex justify-center items-center w-10 h-10 rounded bg-blue-500 text-red-500 cursor-pointer"
            // onClick={addColorHandler}
          >
            <HiOutlineViewGridAdd className="text-white text-lg" />
          </div>
        </div>

        {data.products.length > 0 && (
          <div className="mt-5 flex gap-2">
            {/* {vehicle.colors.map((color) => (
                <div key={color} className="bg-gray-100 flex items-center justify-between p-3 w-28 rounded">
                  {color}

                  <MdOutlineCancel
                    className="text-red-500 text-lg cursor-pointer"
                    onClick={() => removeColorHandler(color)}
                  />
                </div>
              ))} */}
          </div>
        )}
      </FormGroup>

      <H2 className="mb-5 text-gray-700" weight="normal">
        Datos de punto de inicio y destino
      </H2>

      <FormGroup className="text-sm text-gray-700 flex-1">
        <Label>Dirección de envío:</Label>

        <Input type="text" name="name" placeholder="Ingresar la dirección de envío..." />
      </FormGroup>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Coordenadas de punto de inicio
      </H3>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Latitud:</Label>

          <Input type="number" name="name" placeholder="Agregar latitud inicial..." />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Longitud:</Label>

          <Input type="number" name="name" placeholder="Agregar longitud inicial..." />
        </FormGroup>
      </FormGroup>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Coordenadas de punto de destino
      </H3>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Latitud:</Label>

          <Input type="number" name="name" placeholder="Agregar latitud final..." />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Longitud:</Label>

          <Input type="number" name="name" placeholder="Agregar longitud final..." />
        </FormGroup>
      </FormGroup>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Selección de coordenadas mediante el mapa
      </H3>

      <div className="mb-5 flex text-center">
        <div
          className={classNames("flex-1 py-2 px-10 rounded-l cursor-pointer transition-all", {
            "bg-blue-500 text-white": mapCoordinatesType === "initial",
            "bg-gray-100": mapCoordinatesType !== "initial",
          })}
          onClick={() => coordinatesTypeHandler("initial")}
        >
          Coordinadas iniciales
        </div>

        <div
          className={classNames("flex-1 py-2 px-10 rounded-r cursor-pointer transition-all", {
            "bg-blue-500 text-white": mapCoordinatesType === "destination",
            "bg-gray-100": mapCoordinatesType !== "destination",
          })}
          onClick={() => coordinatesTypeHandler("destination")}
        >
          Coordenadas finales
        </div>
      </div>

      <Map onClick={onClickMapHandler}></Map>

      <Button type="submit" color="primary" className="lg:w-96 mt-5">
        Registrar
      </Button>
    </div>
  );
};

export default Shipments;

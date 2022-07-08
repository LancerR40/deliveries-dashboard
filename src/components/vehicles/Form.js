import { FormGroup, Input, Select, Option, Button, H2, H3, Search, Label, Date } from "../ui";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { getBrandsAPI, createVehicleAPI, getVehicleDocumentsAPI } from "../../api/vehicles";
import { driversByQueriesAPI } from "../../api/drivers";

import classNames from "classnames";
import { MdAddToPhotos, MdOutlineCancel } from "react-icons/md";

const Form = () => {
  const [brands, setBrands] = useState([]);
  const [ownerType, setOwnerType] = useState("company");

  const [vehicle, setVehicle] = useState({
    model: "",
    brand: "",
    colors: [],
    type: "",
    licenseNumber: "",
    tiresNumber: "",
  });
  const [selectedColor, setSelectedColor] = useState("");

  const [document, setDocument] = useState({ title: "", name: "", lastname: "", identificationCode: "" });
  const [documentTypes, setDocumentTypes] = useState([]);

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getBrands();
    getVehicleDocuments();
  }, []);

  const notify = (type, message) => toast[type](message);

  const getVehicleDocuments = async () => {
    const response = await getVehicleDocumentsAPI();

    if (response.success) {
      setDocumentTypes(response.data);
    }
  };

  const getBrands = async () => {
    const response = await getBrandsAPI();

    if (response.success && response.data.length) {
      setBrands(response.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await createVehicleAPI({ ...vehicle, document });

    if (!response.success) {
      notify("error", response.error.message);
    }

    if (response.success) {
      setVehicle({
        model: "",
        brand: "",
        colors: [],
        type: "",
        licenseNumber: "",
        tiresNumber: "",
      });
      setSelectedColor("");
      setOwnerType("company");
      setDocument({ title: "", name: "", lastname: "", identificationCode: "" });

      notify("success", response.data.message);
    }
  };

  const vehicleHandler = (e) => {
    const { name, value } = e.target;

    setVehicle((state) => ({ ...state, [name]: value }));
  };

  const documentHandler = (e) => {
    const { name, value } = e.target;

    setDocument((state) => ({ ...state, [name]: value }));
  };

  const addColorHandler = () => {
    const colorsLength = vehicle?.colors?.length;

    if (!selectedColor) {
      return notify("error", "El color es requerido.");
    }

    if (colorsLength === 2) {
      return notify("error", "No puedes añadir más de dos colores.");
    }

    if (vehicle.colors.filter((color) => color === selectedColor).length) {
      return notify("error", "El color se encuentra añadido.");
    }

    setVehicle((state) => ({ ...state, colors: [...state.colors, selectedColor] }));
    setSelectedColor("");
  };

  const removeColorHandler = (color) => {
    setVehicle((state) => ({ ...state, colors: state.colors.filter((curr) => curr !== color) }));
  };

  const ownerHandler = (owner) => {
    setDrivers([]);
    setOwnerType(owner);
    setDocument({ title: "", name: "", lastname: "", identificationCode: "" });
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

  const driverHandler = (driver) => {
    const { name, lastname, identificationCode } = driver;

    setDocument((state) => ({ ...state, name, lastname, identificationCode }));
  };

  return (
    <>
      <Toaster />

      <form onSubmit={onSubmit}>
        <H2 className="my-5 text-gray-700" weight="normal">
          Añadir vehículo
        </H2>

        <FormGroup className="text-gray-700 lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="mb-5 lg:mb-0">
            <Label>Modelo:</Label>

            <Input
              type="text"
              name="model"
              placeholder="Ingresa el modelo..."
              value={vehicle.model}
              onChange={vehicleHandler}
            />
          </div>

          <div>
            <Label>Marca:</Label>

            <Select name="brand" value={vehicle.brand} onChange={vehicleHandler}>
              <Option>Selecciona un modelo...</Option>
              {brands.map(({ id, name }) => (
                <Option key={id} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>
        </FormGroup>

        <FormGroup className="text-gray-700 lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="mb-5 lg:mb-0">
            <Label>Tipo de vehículo:</Label>

            <Input
              type="text"
              name="type"
              placeholder="Ingresa el tipo de vehículo..."
              value={vehicle.type}
              onChange={vehicleHandler}
            />
          </div>

          <div>
            <Label>Número de neúmaticos:</Label>

            <Input
              type="number"
              name="tiresNumber"
              placeholder="Ingresa el número de neúmaticos..."
              value={vehicle.tiresNumber}
              onChange={vehicleHandler}
            />
          </div>
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Número de licencia:</Label>

          <Input
            type="text"
            name="licenseNumber"
            placeholder="Ingresa el número de licencia..."
            value={vehicle.licenseNumber}
            onChange={vehicleHandler}
          />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Colores:</Label>

          <div className="flex items-center gap-2">
            <Input
              className="flex-1"
              type="text"
              name="colors"
              placeholder="Agregar un color..."
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />

            <div
              className="flex justify-center items-center w-10 h-10 rounded bg-blue-500 text-red-500 cursor-pointer"
              onClick={addColorHandler}
            >
              <MdAddToPhotos className="text-white text-lg" />
            </div>
          </div>

          {vehicle.colors.length > 0 && (
            <div className="mt-5 flex gap-2">
              {vehicle.colors.map((color) => (
                <div key={color} className="bg-gray-100 flex items-center justify-between p-3 w-28 rounded">
                  {color}

                  <MdOutlineCancel
                    className="text-red-500 text-lg cursor-pointer"
                    onClick={() => removeColorHandler(color)}
                  />
                </div>
              ))}
            </div>
          )}
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Propietario:</Label>

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

        <H2 className="mb-5 text-gray-700" weight="normal">
          Añadir documentos
        </H2>

        <FormGroup className="text-gray-700">
          <Label>Documentos:</Label>

          <Select name="title" value={document.title} onChange={documentHandler}>
            <Option>Selecciona un documento...</Option>
            {documentTypes.map(({ id, name }) => (
              <Option key={id} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </FormGroup>

        {document?.title === "Certificado de circulación" && (
          <>
            {ownerType === "driver" && (
              <>
                <FormGroup className="text-gray-700">
                  <Label>Busqueda de conductor:</Label>

                  <Search placeholder="Buscar por nombre o cédula..." onChange={searchDriverHandler} />
                </FormGroup>

                {drivers.length > 0 && (
                  <>
                    <H3 weight="normal">Lista de conductores</H3>

                    <div className="my-5 whitespace-nowrap overflow-auto border-2 border-gray-100 rounded">
                      <div className="flex p-3" style={{ minWidth: "768px" }}>
                        <span className="flex-1">Nombre completo</span>

                        <span className="flex-1">Cédula</span>

                        <span className="flex-1">Email</span>

                        <span className="flex-1" />
                      </div>

                      <div className="flex flex-col gap-2" style={{ minWidth: "768px" }}>
                        {drivers.map((driver) => {
                          const { driverId, name, lastname, identificationCode, email, photo } = driver;
                          const fullname = `${name} ${lastname}`;

                          return (
                            <div className="flex items-center p-3 bg-gray-50 rounded" key={driverId}>
                              <span className="flex-1 flex items-center">
                                <img className="w-10 h-10 rounded-full object-cover" src={photo} alt={fullname} />
                                <span className="ml-2">{fullname}</span>
                              </span>

                              <span className="flex-1">{identificationCode}</span>

                              <span className="flex-1">{email}</span>

                              <span className="flex-1">
                                <Button
                                  type="button"
                                  color={classNames({
                                    primary: identificationCode !== document?.identificationCode,
                                    success: identificationCode === document?.identificationCode,
                                  })}
                                  className="w-28"
                                  onClick={() => driverHandler(driver)}
                                >
                                  {identificationCode !== document?.identificationCode ? "Seleccionar" : "Seleccionado"}
                                </Button>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                <FormGroup className="text-gray-700">
                  <Label>Nombre del propietario:</Label>

                  <Input
                    type="text"
                    name="name"
                    placeholder="Ingresa el nombre del propietario..."
                    value={document.name}
                    onChange={documentHandler}
                  />
                </FormGroup>

                <FormGroup className="text-gray-700">
                  <Label>Apellido del propietario:</Label>

                  <Input
                    type="text"
                    name="lastname"
                    placeholder="Ingresa el apellido del propietario..."
                    value={document.lastname}
                    onChange={documentHandler}
                  />
                </FormGroup>

                <FormGroup className="text-gray-700">
                  <Label>Cédula del propietario:</Label>

                  <Input
                    type="text"
                    name="identificationCode"
                    placeholder="Ingresa la cédula del propietario..."
                    value={document.identificationCode}
                    onChange={documentHandler}
                  />
                </FormGroup>
              </>
            )}

            <FormGroup className="text-gray-700">
              <Label>Peso máximo de carga del vehículo en kg:</Label>

              <Input
                type="number"
                name="maximumLoadMass"
                placeholder="Ingresa el peso máximo de carga del vehículo en kg..."
                onChange={documentHandler}
              />
            </FormGroup>

            <FormGroup className="text-gray-700">
              <Label>Expedición:</Label>

              <Date name="expedition" onChange={documentHandler} />
            </FormGroup>
          </>
        )}

        {ownerType === "company" && document.title !== "" && (
          <span className="block mb-4 text-gray-700 text-blue-500">
            Importante: Los datos de la compañia se agregarán automáticamente.
          </span>
        )}

        <Button type="submit" className="lg:w-96">
          Registrar
        </Button>
      </form>
    </>
  );
};

export default Form;

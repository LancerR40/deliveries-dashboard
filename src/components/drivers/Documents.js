import { H2, Search, Select, Option, FormGroup, Input, Date, Button, RadioGroup, Radio } from "../ui";

import { useState, useEffect } from "react";
import className from "classnames";

import { driversByQueriesAPI, addDriverDocumentAPI, driversDocumentsAPI } from "../../api/drivers";

const Documents = () => {
  const [document, setDocument] = useState({ name: "", lastname: "", identificationCode: "", gender: "Masculino" });
  const [documentTypes, setDocumentTypes] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState(null);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    driverDocuments();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await addDriverDocumentAPI({ document });

    if (!response.success) {
      alert(response.error.message);
    }

    if (response.success) {
      alert(response.data.message);
    }
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

  const driverDocuments = async () => {
    const response = await driversDocumentsAPI();

    if (response.success) {
      setDocumentTypes(response.data);
    }
  };

  const driverOnChange = (e) => {
    const { name, value } = e.target;

    setDocument((state) => ({ ...state, [name]: value }));
  };

  const documentOnChange = (e) => {
    const { name, value } = e.target;

    setDocument((state) => ({ ...state, [name]: value }));
  };

  const selectDriver = (driver) => {
    const { driverId, name, lastname, identificationCode, gender } = driver;

    setDocument((state) => ({ ...state, name, lastname, identificationCode, gender }));
    setSelectedDriver(driverId);
  };

  return (
    <div>
      <H2 className="mt-5" size="xl">
        Añadir documentos
      </H2>

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
              {drivers.map((driver) => (
                <div className="flex items-center p-3 bg-gray-50 rounded" key={driver.driverId}>
                  <span className="flex-1 flex items-center">
                    <img className="w-10 h-10 rounded-full object-cover" src={driver.photo} alt="" />
                    <span className="ml-2">
                      {driver.name} {driver.lastname}
                    </span>
                  </span>

                  <span className="flex-1">{driver.identificationCode}</span>

                  <span className="flex-1">{driver.email}</span>

                  <span className="flex-1">
                    <Button
                      type="button"
                      bg={className({
                        "blue-500": driver.driverId !== selectedDriver,
                        "green-500": driver.driverId === selectedDriver,
                      })}
                      color="white"
                      className="w-28"
                      onClick={() => selectDriver(driver)}
                    >
                      {driver.driverId !== selectedDriver ? "Seleccionar" : "Seleccionado"}
                    </Button>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <form onSubmit={onSubmit}>
        <FormGroup className="mt-5" label="Tipo de documento:" size="sm" color="gray-700">
          <Select name="title" color="gray-700" onChange={documentOnChange}>
            <Option>Selecciona un tipo de documento...</Option>
            {documentTypes.map(({ id, name }) => (
              <Option key={id} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </FormGroup>

        {document?.title === "Licencia de conducir" && (
          <>
            <FormGroup className="mt-5" label="Nombre:" size="sm" color="gray-700">
              <Input
                type="text"
                name="name"
                placeholder="Ingresa el nombre..."
                color="gray-700"
                value={document.name}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="mt-5" label="Apellido:" size="sm" color="gray-700">
              <Input
                type="text"
                name="lastname"
                placeholder="Ingresa el apellido..."
                color="gray-700"
                value={document.lastname}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="mt-5" label="Cédula:" size="sm" color="gray-700">
              <Input
                type="text"
                name="identificationCode"
                placeholder="Ingresa la cédula..."
                color="gray-700"
                value={document.identificationCode}
                onChange={driverOnChange}
              />
            </FormGroup>

            <RadioGroup
              label="Género:"
              value="gender"
              size="sm"
              color="gray-700"
              className="mt-5"
              onChange={driverOnChange}
            >
              <Radio size="sm" color="gray-700" value="Masculino" checked={document?.gender === "Masculino"}>
                Masculino
              </Radio>
              <Radio size="sm" color="gray-700" value="Femenino" checked={document?.gender === "Femenino"}>
                Femenino
              </Radio>
            </RadioGroup>

            <FormGroup className="mt-5" label="Tipo de licencia:" size="sm" color="gray-700">
              <Select name="type" color="gray-700" onChange={documentOnChange}>
                <Option>Selecciona un tipo de licencia...</Option>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
              </Select>
            </FormGroup>

            <FormGroup className="mt-5" label="Expedición:" size="sm" color="gray-700">
              <Date name="expedition" color="gray-700" onChange={documentOnChange} />
            </FormGroup>

            <FormGroup className="mt-5" label="Expiración:" size="sm" color="gray-700">
              <Date name="expiration" color="gray-700" onChange={documentOnChange} />
            </FormGroup>

            <Button type="submit" bg="blue-500" color="white" className="mt-5 lg:w-96">
              Registrar
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default Documents;

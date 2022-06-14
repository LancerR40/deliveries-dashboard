import { H2, Search, Select, Option, FormGroup, Input, Date, Button } from "../ui";
import { useState } from "react";
import { driversByQueriesAPI, addDriverDocumentAPI } from "../../api/drivers";

const Documents = () => {
  const [document, setDocument] = useState({});
  const [drivers, setDrivers] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await addDriverDocumentAPI(document);

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

  const driverOnChange = (e) => {
    const { name, value } = e.target;

    setDocument((state) => ({ ...state, [name]: value }));
  };

  const documentOnChange = (e) => {
    const { name, value } = e.target;

    setDocument((state) => ({ ...state, document: { ...state.document, [name]: value } }));
  };

  const selectDriver = (driver) => {
    const { name, lastname, identificationCode } = driver;

    setDocument((state) => ({
      ...state,
      driverName: name,
      driverLastname: lastname,
      driverIdentificationCode: identificationCode,
    }));
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

          <div className="mt-5 whitespace-nowrap overflow-x-auto">
            <div className="flex p-3">
              <span className="flex-1">Nombre completo</span>

              <span className="flex-1">Cédula</span>

              <span className="flex-1">Email</span>

              <span className="flex-1" />
            </div>

            <div className="flex flex-col gap-2">
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
                      bg="blue-500"
                      color="white"
                      className="w-32"
                      onClick={() => selectDriver(driver)}
                    >
                      Seleccionar
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
            <Option value="driver license">Licencia de conducir</Option>
          </Select>
        </FormGroup>

        {document?.document?.title === "driver license" && (
          <>
            <FormGroup className="mt-5" label="Nombre:" size="sm" color="gray-700">
              <Input
                type="text"
                name="driverName"
                placeholder="Ingresa el Nombre..."
                color="gray-700"
                defaultValue={document.driverName}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="mt-5" label="Apellido:" size="sm" color="gray-700">
              <Input
                type="text"
                name="driverLastname"
                placeholder="Ingresa el Apellido..."
                color="gray-700"
                defaultValue={document.driverLastname}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="mt-5" label="Cédula:" size="sm" color="gray-700">
              <Input
                type="text"
                name="driverIdentificationCode"
                placeholder="Ingresa la cédula..."
                color="gray-700"
                defaultValue={document.driverIdentificationCode}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="mt-5" label="Tipo de licencia:" size="sm" color="gray-700">
              <Select name="licenseType" color="gray-700" onChange={documentOnChange}>
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

import { useState, useEffect } from "react";
import { H2, H3, Search, Select, Option, FormGroup, Input, Date, Button, RadioGroup, Radio, Label } from "../ui";
import className from "classnames";

import { driversByQueriesAPI, driversDocumentsAPI, createDriverDocumentAPI } from "../../api/drivers";

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

    const response = await createDriverDocumentAPI({ document });

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
      <H2 className="my-5 text-gray-700" weight="normal">
        Añadir documentos
      </H2>

      <FormGroup className="text-gray-700">
        <Label>Busqueda de conductor:</Label>

        <Search placeholder="Buscar por nombre o cédula..." onChange={searchDriverHandler} />
      </FormGroup>

      {drivers.length > 0 && (
        <>
          <H3 className="mt-5 text-gray-700" weight="normal">
            Lista de conductores
          </H3>

          <div className="mt-5 whitespace-nowrap overflow-auto border-2 border-gray-100 rounded">
            <div className="flex p-3" style={{ minWidth: "768px" }}>
              <span className="flex-1">Nombre completo</span>

              <span className="flex-1">Cédula</span>

              <span className="flex-1">Email</span>

              <span className="flex-1" />
            </div>

            <div className="flex flex-col gap-2" style={{ minWidth: "768px" }}>
              {drivers.map((driver) => {
                const { driverId, name, lastname, identificationCode, photo, email } = driver;
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
                        color={className({
                          primary: driverId !== selectedDriver,
                          success: driverId === selectedDriver,
                        })}
                        className="w-28"
                        onClick={() => selectDriver(driver)}
                      >
                        {driverId !== selectedDriver ? "Seleccionar" : "Seleccionado"}
                      </Button>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      <form onSubmit={onSubmit}>
        <FormGroup className="mt-5 text-gray-700">
          <Label>Tipo de documento:</Label>

          <Select name="title" onChange={documentOnChange}>
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
            <FormGroup className="text-gray-700">
              <Label>Nombre:</Label>

              <Input
                type="text"
                name="name"
                placeholder="Ingresa el nombre..."
                value={document.name}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="text-gray-700">
              <Label>Apellido:</Label>

              <Input
                type="text"
                name="lastname"
                placeholder="Ingresa el apellido..."
                value={document.lastname}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="text-gray-700">
              <Label>Cédula:</Label>

              <Input
                type="text"
                name="identificationCode"
                placeholder="Ingresa la cédula..."
                value={document.identificationCode}
                onChange={driverOnChange}
              />
            </FormGroup>

            <FormGroup className="text-gray-700">
              <Label>Género:</Label>

              <RadioGroup value="gender" onChange={driverOnChange}>
                <Radio value="Masculino" checked={document?.gender === "Masculino"}>
                  Masculino
                </Radio>
                <Radio value="Femenino" checked={document?.gender === "Femenino"}>
                  Femenino
                </Radio>
              </RadioGroup>
            </FormGroup>

            <FormGroup className="text-gray-700">
              <Label>Tipo de licencia:</Label>

              <Select name="type" onChange={documentOnChange}>
                <Option>Selecciona un tipo de licencia...</Option>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
              </Select>
            </FormGroup>

            <FormGroup className="text-gray-700">
              <Label>Expedición:</Label>

              <Date name="expedition" onChange={documentOnChange} />
            </FormGroup>

            <FormGroup className="text-gray-700">
              <Label>Expiración:</Label>

              <Date name="expiration" onChange={documentOnChange} />
            </FormGroup>

            <Button type="submit" color="primary" className="lg:w-96">
              Registrar
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default Documents;

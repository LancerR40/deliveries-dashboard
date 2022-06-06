import { H2, Search, Select, Option, FormGroup, Input, Date, Button } from "../ui";
import { useState } from "react";

const Documents = () => {
  const [document, setDocument] = useState({});

  const searchDriverHandler = (e) => {
    const { value } = e.target;

    /* Endpoint call */
    console.log(value);
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "documentTitle" && !value) {
      return setDocument({});
    }

    setDocument((state) => ({ ...state, [name]: value }));
  };

  return (
    <div>
      <H2 className="mt-5" size="xl">
        Añadir documentos
      </H2>

      <FormGroup className="mt-5" label="Buscar un conductor específico:" size="sm" color="gray-700">
        <Search className="" placeholder="Buscar por nombre o cédula..." onChange={searchDriverHandler} />
      </FormGroup>

      <FormGroup className="mt-5" label="Tipo de documento:" size="sm" color="gray-700">
        <Select className="" name="documentTitle" color="gray-700" onChange={onChange}>
          <Option>Selecciona un tipo de documento...</Option>
          <Option value="driver license">Licencia de conducir</Option>
        </Select>
      </FormGroup>

      {document?.documentTitle === "driver license" && (
        <>
          <FormGroup className="mt-5" label="Nombre:" size="sm" color="gray-700">
            <Input
              type="text"
              name="driverName"
              placeholder="Ingresa el Nombre..."
              color="gray-700"
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup className="mt-5" label="Apellido:" size="sm" color="gray-700">
            <Input
              type="text"
              name="driverLastname"
              placeholder="Ingresa el Apellido..."
              color="gray-700"
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup className="mt-5" label="Cédula:" size="sm" color="gray-700">
            <Input
              type="text"
              name="driverIdentificationCode"
              placeholder="Ingresa la cédula..."
              color="gray-700"
              onChange={onChange}
            />
          </FormGroup>

          <FormGroup className="mt-5" label="Expedición:" size="sm" color="gray-700">
            <Date name="documentExpedition" color="gray-700" onChange={onChange} />
          </FormGroup>

          <FormGroup className="mt-5" label="Expiración:" size="sm" color="gray-700">
            <Date name="documentExpiration" color="gray-700" onChange={onChange} />
          </FormGroup>

          <Button type="submit" bg="blue-500" color="white" className="mt-5 lg:w-96">
            Registrar
          </Button>
        </>
      )}
    </div>
  );
};

export default Documents;

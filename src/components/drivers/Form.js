import { useState, useEffect } from "react";

import { FormGroup, Input, Date, Photo, RadioGroup, Radio, Select, Option, Button, H2 } from "../ui";
import { MdKeyboardArrowRight } from "react-icons/md";

import { driversDocumentsAPI, createDriverAPI, addDriverDocumentAPI } from "../../api/drivers";

const Form = () => {
  const [data, setData] = useState({
    gender: "Masculino",
  });
  const [document, setDocument] = useState({});
  const [displayDocumentForm, setDisplayDocumentForm] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    driversDocuments();
  }, []);

  const driversDocuments = async () => {
    const response = await driversDocumentsAPI();

    if (response.success) {
      setDocumentTypes(response.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(data);
    console.log(document);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("identificationCode", data.identificationCode);
    formData.append("gender", data.gender);
    formData.append("photo", data.photo);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("email", data.email);
    formData.append("password", data.password);

    const createDriverResponse = await createDriverAPI(formData);

    if (!createDriverResponse.success) {
      return alert(createDriverResponse.error.message);
    }

    if (createDriverResponse.success) {
      if (document.title) {
        document.name = data.name;
        document.lastname = data.lastname;
        document.identificationCode = data.identificationCode;
        document.gender = data.gender;

        const addDriverDocumentResponse = await addDriverDocumentAPI(document);

        if (addDriverDocumentResponse.error) {
          return alert(addDriverDocumentResponse.error.message);
        }

        if (addDriverDocumentResponse.success) {
          return alert("Se registró el conductor y el documento personal.");
        }
      }

      alert(createDriverResponse.data.message);
    }
  };

  const driverOnChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      return setData((state) => ({ ...state, [name]: files[0] }));
    }

    setData((state) => ({ ...state, [name]: value }));
  };

  const documentOnChange = (e) => {
    const { name, value } = e.target;

    setDocument((state) => ({ ...state, [name]: value }));
  };

  const documentFormHandler = () => {
    setDisplayDocumentForm(!displayDocumentForm);

    setDocument({});
  };

  return (
    <form onSubmit={onSubmit}>
      <H2 className="mt-5" size="xl">
        Añadir conductor
      </H2>

      <FormGroup className="mt-5" label="Nombre:" size="sm" color="gray-700">
        <Input type="text" name="name" placeholder="Ingresa el Nombre..." color="gray-700" onChange={driverOnChange} />
      </FormGroup>

      <FormGroup className="mt-5" label="Apellido:" size="sm" color="gray-700">
        <Input
          type="text"
          name="lastname"
          placeholder="Ingresa el Apellido..."
          color="gray-700"
          onChange={driverOnChange}
        />
      </FormGroup>

      <FormGroup className="mt-5" label="Cédula:" size="sm" color="gray-700">
        <Input
          type="text"
          name="identificationCode"
          placeholder="Ingresa la cédula..."
          color="gray-700"
          onChange={driverOnChange}
        />
      </FormGroup>

      <RadioGroup label="Género:" value="gender" size="sm" color="gray-700" className="mt-5" onChange={driverOnChange}>
        <Radio size="sm" color="gray-700" value="Masculino" defaultChecked>
          Masculino
        </Radio>
        <Radio size="sm" color="gray-700" value="Femenino">
          Femenino
        </Radio>
      </RadioGroup>

      <FormGroup className="mt-5" label="Fecha de nacimiento:" size="sm" color="gray-700">
        <Date name="dateOfBirth" color="gray-700" onChange={driverOnChange} />
      </FormGroup>

      <FormGroup className="mt-5" label="Email:" size="sm" color="gray-700">
        <Input type="email" name="email" placeholder="Ingresa el email..." color="gray-700" onChange={driverOnChange} />
      </FormGroup>

      <FormGroup className="mt-5" label="Contraseña:" size="sm" color="gray-700">
        <Input
          type="password"
          name="password"
          placeholder="Ingresa la contraseña..."
          color="gray-700"
          onChange={driverOnChange}
        />
      </FormGroup>

      <FormGroup className="mt-5" label="Foto:" size="sm" color="gray-700">
        <Photo
          name="photo"
          placeholder="Subir una foto de identificación..."
          color="gray-700"
          onChange={driverOnChange}
        />
      </FormGroup>

      <div className="mt-5">
        <span className="text-blue-500 text-sm cursor-pointer flex items-center" onClick={documentFormHandler}>
          Desplegar formulario para añadir documento
          <MdKeyboardArrowRight className={`text-lg transition-all ${displayDocumentForm && "rotate-90"}`} />
        </span>

        <div
          className={`transition-all ${
            displayDocumentForm ? "mt-5 h-fit pointer-events-auto opacity-1" : "h-0 pointer-events-none opacity-0"
          }`}
        >
          {displayDocumentForm && (
            <Select name="title" color="gray-700" onChange={documentOnChange}>
              <Option>Selecciona un documento...</Option>
              {documentTypes.map(({ id, name }) => (
                <Option key={id} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          )}

          {document?.title === "Licencia de conducir" && (
            <div className="mt-5">
              <Select name="type" color="gray-700" onChange={documentOnChange}>
                <Option>Selecciona un tipo de licencia...</Option>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
              </Select>

              <FormGroup className="mt-5" label="Expedición:" size="sm" color="gray-700">
                <Date name="expedition" color="gray-700" onChange={documentOnChange} />
              </FormGroup>

              <FormGroup className="mt-5" label="Expiración:" size="sm" color="gray-700">
                <Date name="expiration" color="gray-700" onChange={documentOnChange} />
              </FormGroup>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" bg="blue-500" color="white" className="mt-5 lg:w-96">
        Registrar
      </Button>
    </form>
  );
};

export default Form;

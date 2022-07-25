import { useState, useEffect } from "react";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";

import { FormGroup, Input, Date, Photo, RadioGroup, Radio, Select, Option, Button, H2, Label } from "../ui";
import { MdKeyboardArrowRight } from "react-icons/md";

import { driversDocumentsAPI, createDriverAPI } from "../../api/drivers";

const initialState = { name: "", lastname: "", identificationCode: "", gender: "Masculino", dateOfBirth: "", email: "", password: "" }

const Form = () => {
  const [data, setData] = useState(initialState);

  const [document, setDocument] = useState({});
  const [displayDocumentForm, setDisplayDocumentForm] = useState(false);

  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    driversDocuments();
  }, []);

  const notify = (type, message) => toast[type](message);

  const driversDocuments = async () => {
    const response = await driversDocumentsAPI();

    if (response.success) {
      setDocumentTypes(response.data);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { name, lastname, identificationCode, gender, photo, dateOfBirth, email, password } = data;

    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("identificationCode", identificationCode);
    formData.append("gender", gender);
    formData.append("photo", photo);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("email", email);
    formData.append("password", password);

    if (Object.keys(document).length !== 0) {
      formData.append("document", JSON.stringify(document));
    }

    const response = await createDriverAPI(formData);

    if (!response.success) {
      notify("error", response.error.message);
    }

    if (response.success) {
      setDocument({});
      setDisplayDocumentForm(false);
      setData(initialState);

      notify("success", response.data.message);
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
    <>
      <Toaster />

      <form onSubmit={onSubmit}>
        <H2 className="my-5 text-gray-700" weight="normal">
          Añadir conductor
        </H2>

        <FormGroup className="text-gray-700">
          <Label>Nombre:</Label>

          <Input
            type="text"
            name="name"
            placeholder="Ingresa el Nombre..."
            value={data.name}
            onChange={driverOnChange}
          />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Apellido:</Label>

          <Input
            type="text"
            name="lastname"
            placeholder="Ingresa el Apellido..."
            value={data.lastname}
            onChange={driverOnChange}
          />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Cédula</Label>

          <Input
            type="text"
            name="identificationCode"
            placeholder="Ingresa la cédula..."
            value={data.identificationCode}
            onChange={driverOnChange}
          />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Género</Label>

          <RadioGroup value="gender" onChange={driverOnChange}>
            <Radio value="Masculino" checked={data.gender === "Masculino"}>
              Masculino
            </Radio>
            <Radio value="Femenino" checked={data.gender === "Femenino"}>
              Femenino
            </Radio>
          </RadioGroup>
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Fecha de nacimiento:</Label>

          <Date name="dateOfBirth" value={data.dateOfBirth} onChange={driverOnChange} />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Email:</Label>

          <Input
            type="email"
            name="email"
            placeholder="Ingresa el email..."
            value={data.email}
            onChange={driverOnChange}
          />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Contraseña</Label>

          <Input
            type="password"
            name="password"
            placeholder="Ingresa la contraseña..."
            value={data.password}
            onChange={driverOnChange}
          />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Foto</Label>

          <Photo name="photo" placeholder="Subir una foto de identificación..." onChange={driverOnChange} />
        </FormGroup>

        <div className="mt-5">
          <span className="text-blue-500 text-sm cursor-pointer flex items-center" onClick={documentFormHandler}>
            Desplegar formulario para añadir documento
            <MdKeyboardArrowRight className={`text-lg transition-all ${displayDocumentForm && "rotate-90"}`} />
          </span>

          <div
            className={classNames("my-5 transition-all", {
              "h-fit pointer-events-auto opacity-1": displayDocumentForm === true,
              "h-0 pointer-events-none opacity-0": displayDocumentForm === false,
            })}
          >
            {displayDocumentForm && (
              <FormGroup className="text-gray-700">
                <Label>Documento:</Label>

                <Select name="title" onChange={documentOnChange}>
                  <Option>Selecciona un documento...</Option>
                  {documentTypes.map(({ id, name }) => (
                    <Option key={id} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </FormGroup>
            )}

            {document?.title === "Licencia de conducir" && (
              <>
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
              </>
            )}
          </div>
        </div>

        <Button type="submit" color="primary" className="lg:w-96">
          Registrar
        </Button>
      </form>
    </>
  );
};

export default Form;

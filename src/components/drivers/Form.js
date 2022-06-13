import { FormGroup, Input, Date, Photo, RadioGroup, Radio, Select, Option, Button, H2 } from "../ui";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { createDriverAPI, addDriverDocumentAPI } from "../../api/drivers";

const Form = () => {
  const [data, setData] = useState({
    gender: 1,
  });
  const [document, setDocument] = useState({});
  const [displayDocumentForm, setDisplayDocumentForm] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("lastname", data.lastname);
    formData.append("identificationCode", data.identificationCode);
    formData.append("gender", data.gender);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("photo", data.photo);

    const createDriverResponse = await createDriverAPI(formData);

    if (!createDriverResponse.success) {
      return alert(createDriverResponse.error.message);
    }

    if (createDriverResponse.success) {
      if (document?.title !== "") {
        document.driverName = data.name;
        document.driverLastname = data.lastname;
        document.driverIdentificationCode = data.identificationCode;

        const addDriverDocumentResponse = await addDriverDocumentAPI(document);

        if (addDriverDocumentResponse.error) {
          return alert(addDriverDocumentResponse.error.message);
        }

        if (addDriverDocumentResponse.success) {
          return alert("Se registro todo.");
        }

        alert(createDriverResponse.data.message);
      }
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

    setDocument((state) => ({ ...state, document: { ...state.document, [name]: value } }));
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
        <Radio size="sm" color="gray-700" value={1} isChecked>
          Masculino
        </Radio>
        <Radio size="sm" color="gray-700" value={2}>
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
              <Option value="driver license">Licencia de conducir</Option>
            </Select>
          )}

          {document?.document?.title === "driver license" && (
            <div className="mt-5">
              <Select name="licenseType" color="gray-700" onChange={documentOnChange}>
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

import { FormGroup, Input, Date, Photo, RadioGroup, Radio, Select, Option, Button, H2 } from "../ui";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    gender: 1,
  });
  const [displayDocumentForm, setDisplayDocumentForm] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;

    setData((state) => ({ ...state, [name]: value }));
  };

  const documentFormHandler = () => {
    setDisplayDocumentForm(!displayDocumentForm);
    setData((state) => ({ ...state, documentType: "" }));
  };

  console.log(data);

  return (
    <form>
      <H2 className="mt-5" size="xl">
        Añadir conductor
      </H2>

      <FormGroup className="mt-5" label="Nombre:" size="sm" color="gray-700">
        <Input type="text" name="name" placeholder="Ingresa el Nombre..." color="gray-700" onChange={onChange} />
      </FormGroup>

      <FormGroup className="mt-5" label="Apellido:" size="sm" color="gray-700">
        <Input type="text" name="lastname" placeholder="Ingresa el Apellido..." color="gray-700" onChange={onChange} />
      </FormGroup>

      <FormGroup className="mt-5" label="Cédula:" size="sm" color="gray-700">
        <Input
          type="text"
          name="identificationCode"
          placeholder="Ingresa la cédula..."
          color="gray-700"
          onChange={onChange}
        />
      </FormGroup>

      <RadioGroup label="Género:" value="gender" size="sm" color="gray-700" className="mt-5" onChange={onChange}>
        <Radio size="sm" color="gray-700" value={1} isChecked>
          Masculino
        </Radio>
        <Radio size="sm" color="gray-700" value={2}>
          Femenino
        </Radio>
      </RadioGroup>

      <FormGroup className="mt-5" label="Fecha de nacimiento:" size="sm" color="gray-700">
        <Date name="dateOfBirth" color="gray-700" onChange={onChange} />
      </FormGroup>

      <FormGroup className="mt-5" label="Email:" size="sm" color="gray-700">
        <Input type="email" name="email" placeholder="Ingresa el email..." color="gray-700" onChange={onChange} />
      </FormGroup>

      <FormGroup className="mt-5" label="Contraseña:" size="sm" color="gray-700">
        <Input
          type="password"
          name="password"
          placeholder="Ingresa la contraseña..."
          color="gray-700"
          onChange={onChange}
        />
      </FormGroup>

      <FormGroup className="mt-5" label="Foto:" size="sm" color="gray-700">
        <Photo name="photo" placeholder="Subir una foto de identificación..." color="gray-700" onChange={onChange} />
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
            <Select name="documentType" color="gray-700" onChange={onChange}>
              <Option>Selecciona un documento...</Option>
              <Option value={1}>Licencia de conducir</Option>
            </Select>
          )}

          {data?.documentType === "1" && (
            <div className="mt-5">
              <Select name="licenseType" color="gray-700" onChange={onChange}>
                <Option>Selecciona un tipo de licencia...</Option>
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
              </Select>

              <FormGroup className="mt-5" label="Expedición:" size="sm" color="gray-700">
                <Date name="expeditionDate" color="gray-700" onChange={onChange} />
              </FormGroup>

              <FormGroup className="mt-5" label="Expiración:" size="sm" color="gray-700">
                <Date name="expirationDate" color="gray-700" onChange={onChange} />
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

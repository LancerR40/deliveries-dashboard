import { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Button, FormGroup, H1 } from "../../components/ui";
import { MdKeyboardArrowRight } from "react-icons/md";

const Login = () => {
  const [data, setData] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    if (!data.email) {
      return alert("Email requerido.");
    }

    if (!data.password) {
      return alert("La contraseña es requerida");
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
      return alert("El email no es válido.");
    }

    if (data.password.length < 6) {
      return alert("La contraseña debe tener seis(6) o más carácteres");
    }

    console.log(data);
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setData((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-100">
      <form className="w-full p-5 shadow rounded sm:max-w-sm bg-white" onSubmit={onSubmit}>
        <H1 className="mb-5 text-center" color="gray-700" weight="light">
          Bienvenido
        </H1>

        <FormGroup label="Email:" size="sm" color="gray-700">
          <Input type="text" name="email" placeholder="Ingresa tu Email..." color="gray-700" onChange={onChange} />
        </FormGroup>

        <FormGroup label="Contraseña:" size="sm" color="gray-700" className="mt-5">
          <Input
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña..."
            color="gray-700"
            onChange={onChange}
          />
        </FormGroup>

        <div className="mt-5 text-right">
          <Link className="text-sm text-blue-500" to="/">
            ¿Perdiste tu contraseña?
          </Link>
        </div>

        <div>
          <hr className="mt-5 border border-gray-100" />
        </div>

        <Button type="submit" bg="blue-500" color="white" className="mt-5 relative">
          Ingresar
          <MdKeyboardArrowRight className="absolute right-2 top-2.5 text-lg" />
        </Button>
      </form>
    </div>
  );
};

export default Login;

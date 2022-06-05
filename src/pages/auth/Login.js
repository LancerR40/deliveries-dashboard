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
        <H1 className="mb-5 text-2xl text-gray-700 text-center font-light">Bienvenido</H1>

        <FormGroup className="text-sm text-gray-700" label="Email:">
          <Input type="text" name="email" placeholder="Ingresa tu Email..." onChange={onChange} />
        </FormGroup>

        <FormGroup label="Contraseña:" className="mt-5 text-sm text-gray-700">
          <Input type="password" name="password" placeholder="Ingresa tu contraseña..." onChange={onChange} />
        </FormGroup>

        <div className="mt-5 text-right">
          <Link className="text-sm text-blue-500" to="/">
            ¿Perdiste tu contraseña?
          </Link>
        </div>

        <div>
          <hr className="mt-5 border border-gray-100" />
        </div>

        <Button type="submit" className="relative mt-5 bg-blue-500 text-sm text-white">
          Ingresar
          <MdKeyboardArrowRight className="absolute right-2 top-2.5 text-lg" />
        </Button>
      </form>
    </div>
  );
};

export default Login;

import { Input, Button, FormGroup, Label, H1 } from "../../components/ui";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdKeyboardArrowRight } from "react-icons/md";

import { loginAPI } from "../../api/auth";
import { useAuthContext } from "../../contexts/auth";

const Login = () => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const onSubmit = async (e) => {
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

    const response = await loginAPI(data);

    if (!response) {
      return alert("Ups! ocurrio un error.");
    }

    if (!response.success) {
      return alert(response.error.message);
    }

    if (response.success) {
      const { auth, role, token } = response.data;

      navigate("/dashboard");

      setAuth({ isAuth: auth, role });
      localStorage.setItem("token", token);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setData((state) => ({ ...state, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-100">
      <form className="w-full p-5 shadow rounded sm:max-w-sm bg-white" onSubmit={onSubmit}>
        <H1 className="mb-5 text-center text-gray-700" weight="normal">
          Bienvenido
        </H1>

        <FormGroup className="text-gray-700">
          <Label>Email:</Label>

          <Input type="text" name="email" placeholder="Ingresa tu Email..." onChange={onChange} />
        </FormGroup>

        <FormGroup className="text-gray-700">
          <Label>Contraseña:</Label>

          <Input type="password" name="password" placeholder="Ingresa tu contraseña..." onChange={onChange} />
        </FormGroup>

        <div className="text-right">
          <Link className="text-sm text-blue-500" to="/">
            ¿Perdiste tu contraseña?
          </Link>
        </div>

        <div>
          <hr className="mt-5 border border-gray-100" />
        </div>

        <Button className="mt-5 relative" type="submit">
          Ingresar
          <MdKeyboardArrowRight className="absolute right-2 top-2.5 text-lg" />
        </Button>
      </form>
    </div>
  );
};

export default Login;

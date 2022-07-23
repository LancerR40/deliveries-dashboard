import { Input, Button, FormGroup, Label, H1 } from "../../components/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { MdKeyboardArrowRight } from "react-icons/md";

import { loginAPI } from "../../api/auth";
import { useAuthContext } from "../../contexts/auth";

const Login = () => {
  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const notify = (type, message) => toast[type](message);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!data.email) {
      return notify("error", "Debes ingresar un email para continuar.");
    }

    if (!data.password) {
      return notify("error", "Debes ingresar una contraseña para continuar.");
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email)) {
      return notify("error", "El email ingresado no es válido.");
    }

    if (data.password.length < 6) {
      return notify("error", "La contraseña debe tener seis (6) o más carácteres.");
    }

    const response = await loginAPI(data);

    if (!response) {
      return notify("error", "Ocurrió un error. Por favor, intenta más tarde.");
    }

    if (!response.success) {
      return notify("error", response.error.message);
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
      <Toaster />

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

        {/* <div className="text-right">
          <Link className="text-sm text-blue-500" to="/">
            ¿Perdiste tu contraseña?
          </Link>
        </div> */}

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

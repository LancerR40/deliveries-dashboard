import { Link } from "react-router-dom"
import { useAuthContext } from "../contexts/auth";

const NotFound = () => {
  const { auth: { isAuth } } = useAuthContext();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full p-5 shadow rounded sm:max-w-xl bg-white flex justify-center items-center flex-col text-center">
        <span className="text-3xl text-gray-700 font-normal">Ups, la página no ha sido encontrada</span>
        <Link className="mt-5 bg-blue-500 text-white text-sm rounded py-3 px-3" to={isAuth ? "/dashboard" : "/"}>
          Ir al {isAuth ? "dashboard" : "inicio de sesión"}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
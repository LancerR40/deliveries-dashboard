import { H2, Search } from "../ui";

const List = () => {
  return (
    <div>
      <H2 className="mt-5" size="xl">
        Listado de vehículos
      </H2>

      <Search className="mt-5" placeholder="Buscar por id o número de placa..." />

      <div className="mt-5"></div>
    </div>
  );
};

export default List;

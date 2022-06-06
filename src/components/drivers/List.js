import { H2, Search, Table } from "../ui";

const List = () => {
  return (
    <div>
      <H2 className="mt-5" size="xl">
        Listado de conductores
      </H2>

      <Search className="mt-5" placeholder="Buscar por nombre o cédula..." />

      <div className="mt-5">
        <Table />
      </div>
    </div>
  );
};

export default List;

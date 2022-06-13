import { useState, useEffect } from "react";
import { H2, Search, Table } from "../ui";
import { driversByQueriesAPI } from "../../api/drivers";

const COLUMNS_TABLE = [
  {
    title: "Nombre Completo",
    dataIndex: "name",
    key: "name",
    render: (driver) => (
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full object-cover" src={driver.photo} alt={driver.name} />
        <span className="ml-2">
          {driver.name} {driver.lastname}
        </span>
      </div>
    ),
  },
  {
    title: "Cédula",
    dataIndex: "identificationCode",
    key: "identificationCode",
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Creado en",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];

const List = () => {
  const [drivers, setDrivers] = useState([]);
  const [driversCounter, setDriverCounter] = useState(1);

  const [inputSearch, setInputSearch] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    getDrivers();
  }, [page, inputSearch]);

  const getDrivers = async () => {
    const data = {
      search: {
        page,
        field: inputSearch,
      },
    };

    const response = await driversByQueriesAPI(data);

    if (response.success) {
      const { drivers, counter } = response.data;

      const mapping = drivers.map((driver) => {
        const { driverId, identificationCode, email, createdAt } = driver;

        return {
          key: driverId,
          name: driver,
          identificationCode: identificationCode,
          email: email,
          createdAt: createdAt,
        };
      });

      setDrivers(mapping);
      setDriverCounter(counter);
    }
  };

  const onChange = (e) => {
    setInputSearch(e.target.value);
  };

  return (
    <div>
      <H2 className="mt-5" size="xl">
        Listado de conductores
      </H2>

      <Search className="mt-5" placeholder="Buscar por nombre o cédula..." onChange={onChange} />

      <div className="mt-5">
        <Table columns={COLUMNS_TABLE} dataSource={drivers} />
      </div>
    </div>
  );
};

export default List;

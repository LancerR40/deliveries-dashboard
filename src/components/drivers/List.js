import { useState, useEffect } from "react";
import { H2, Search, Table, Pagination } from "../ui";
import Detail from "./Detail"

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
    title: "Estado",
    dataIndex: "statusName",
    key: "statusName",
    render: (statusName) => {
      const colors = statusName === "Disponible" ? "bg-green-200 text-green-500" : statusName === "En proceso de entrega" ? "bg-blue-200 text-blue-500" : "bg-red-200 text-red-500";
      const classes = `py-2 rounded text-center ${colors}`;

      return (
        <div className="flex">
          <div className={classes} style={{ minWidth: "151px" }}>{statusName}</div>
        </div>
      );
    },
  },
  {
    title: "Descripción de estado",
    dataIndex: "statusDescription",
    key: "statusDescription",
  },
  {
    title: "Creado en",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions"
  }
];

const List = () => {
  const [drivers, setDrivers] = useState([]);
  const [driversCounter, setDriverCounter] = useState(1);

  const [inputSearch, setInputSearch] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);

  const [editIsOpen, setEditIsOpen] = useState(false)

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
      const { drivers, counter, perPage } = response.data;

      const mapping = drivers.map((driver) => {
        const { driverId, identificationCode, email, statusName, statusDescription, createdAt } = driver;
        const description = statusDescription ?? "Sin observaciones";
        const actions = (
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white text-sm rounded py-2 px-3" onClick={editHandler}>Detalle</button>
            <button className="bg-red-500 text-white text-sm rounded p-2">Eliminar</button>
          </div>
        )

        return { key: driverId, name: driver, identificationCode, email, statusName, statusDescription: description, createdAt, actions };
      });

      setDrivers(mapping);
      setDriverCounter(counter);
      setPerPage(perPage);
    }
  };

  const editHandler = () => {
    setEditIsOpen(!editIsOpen)
  }

  const onChange = (e) => {
    setInputSearch(e.target.value);
  };

  const pageOnChange = (page) => {
    setPage(page);
  };

  return (
    // <Detail />
    
    <div>
      <H2 className="my-5 text-gray-700" weight="normal">
        Listado de conductores
      </H2>

      <Search className="text-gray-700" placeholder="Buscar por nombre o cédula..." onChange={onChange} />

      <div className="mt-5">
        <Table columns={COLUMNS_TABLE} dataSource={drivers} />
      </div>

      <div className="mt-5 flex justify-end">
        <Pagination total={driversCounter} perPage={perPage} currentPage={page} onChange={pageOnChange} />
      </div>
    </div>
  );
};

export default List;

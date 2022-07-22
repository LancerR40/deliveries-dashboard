import { useState, useEffect } from "react";
import { FormGroup, Label, Select, Option, Search, H2, H3, Button, Pagination, Input } from "../ui";
import toast, { Toaster } from "react-hot-toast";

import { driversByQueriesAPI } from "../../api/drivers";
import { createVehicleAssignmentAPI, getVehiclesAPI } from "../../api/vehicles";

const VEHICLE_COLUMNS = ["Propietario", "Número de licencia", "Modelo", "Marca", "Estado", "Descripción de estado"];
const DRIVERS_COLUMNS = ["Nombre completo", "Cédula", "Estado", "Descripción de estado"];

const Assignments = () => {
  const [searchType, setSearchType] = useState("vehicles");

  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [data, setData] = useState({ driverIdentificationCode: "", vehicleLicenseNumber: "" });

  const [pagination, setPagination] = useState({ page: 1, perPage: 1, resourceCount: 1 });

  useEffect(() => {
    setPagination({ page: 1, perPage: 1, resourceCount: 1 });
    getData();
  }, [searchType]);

  const notify = (type, message) => toast[type](message);

  const getData = async (field = "") => {
    const { page } = pagination;
    const data = { search: { page, field } };

    if (searchType === "vehicles") {
      setDrivers([]);
      const response = await getVehiclesAPI(data);

      if (response.success) {
        const { vehicles, counter, perPage } = response.data;

        setVehicles(vehicles);
        setPagination((state) => ({ ...state, perPage, resourceCount: counter }));
      }
    }

    if (searchType === "drivers") {
      setVehicles([]);
      const response = await driversByQueriesAPI(data);

      if (response.success) {
        const { drivers, counter, perPage } = response.data;

        setDrivers(drivers);
        setPagination((state) => ({ ...state, perPage, resourceCount: counter }));
      }
    }
  };

  const onSubmit = async () => {
    const response = await createVehicleAssignmentAPI(data);

    if (!response.success) {
      notify("error", response.error.message);
    }

    if (response.success) {
      setData({ driverIdentificationCode: "", vehicleLicenseNumber: "" });
      notify("success", response.data.message);
    }
  };

  const dataHandler = (e) => {
    const { name, value } = e.target;
    setData((state) => ({ ...state, [name]: value }));
  };

  const searchTypeHandler = (e) => {
    setSearchType(e.target.value);
  };

  const searchInputHandler = (e) => {
    const { value } = e.target;
    getData(value);
  };

  const paginationHandler = (page) => {
    setPagination((state) => ({ ...state, page }));
  };

  const vehicleOnClick = (licenseNumber) => {
    setData((state) => ({ ...state, vehicleLicenseNumber: licenseNumber }));
  };

  const driverOnClick = (identificationCode) => {
    setData((state) => ({ ...state, driverIdentificationCode: identificationCode }));
  };

  return (
    <div>
      <Toaster />

      <H2 className="mt-5 text-gray-700" weight="normal">
        Asignaciones de vehículos
      </H2>

      <FormGroup className="text-gray-700 mt-5 lg:grid lg:grid-cols-2 lg:gap-4">
        <div className="mb-5 lg:mb-0">
          <Label>Cédula del conductor::</Label>

          <Input
            type="text"
            name="driverIdentificationCode"
            placeholder="Ingresa la cédula del conductor..."
            value={data.driverIdentificationCode}
            onChange={dataHandler}
          />
        </div>

        <div>
          <Label>Número de licencia del vehículo:</Label>

          <Input
            type="text"
            name="vehicleLicenseNumber"
            placeholder="Ingresa el número de licencia del vehículo..."
            value={data.vehicleLicenseNumber}
            onChange={dataHandler}
          />
        </div>
      </FormGroup>

      <div>
        <Button className="lg:w-40" color="primary" onClick={onSubmit}>
          Asignar
        </Button>
      </div>

      <H2 className="my-5 text-gray-700" weight="normal">
        Busquedas
      </H2>

      <FormGroup className="text-gray-700">
        <Label>Búsqueda de:</Label>

        <Select name="searchType" value={searchType} onChange={searchTypeHandler}>
          <Option value="vehicles">Vehículos</Option>
          <Option value="drivers">Conductores</Option>
        </Select>
      </FormGroup>

      {searchType === "vehicles" && (
        <>
          <FormGroup className="text-gray-700">
            <Label>Busqueda de vehículos:</Label>

            <Search placeholder="Buscar por número de placa, modelo o marca..." onChange={searchInputHandler} />
          </FormGroup>

          <div className="mt-5">
            <H3 weight="normal">Lista de vehículos</H3>

            <div className="mt-5 whitespace-nowrap overflow-x-auto">
              <table className="border-separate w-full border-2 border-gray-100 ">
                <thead>
                  <tr className="text-left">
                    {VEHICLE_COLUMNS.map((col) => (
                      <th key={col} className="p-3.5">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(
                    ({
                      vehicleId,
                      ownerName,
                      ownerLastname,
                      licenseNumber,
                      model,
                      brand,
                      statusName,
                      statusDescription,
                    }) => {
                      const ownerFullname = `${ownerName} ${ownerLastname}`;
                      const statusColor =
                        statusName === "Disponible" ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500";
                      const statusClasses = `py-2 rounded text-center ${statusColor}`;
                      const description = statusDescription || "Sin observaciones";

                      return (
                        <tr key={vehicleId}>
                          <td className="p-3.5">{ownerFullname}</td>
                          <td className="p-3.5">{licenseNumber}</td>
                          <td className="p-3.5">{model}</td>
                          <td className="p-3.5">{brand}</td>
                          <td className="p-3.5 flex">
                            <div className={statusClasses} style={{ minWidth: "151px" }}>{statusName}</div>
                          </td>
                          <td className="p-3.5">{description}</td>
                          <td className="p-3.5">
                            <Button color="primary" onClick={() => vehicleOnClick(licenseNumber)}>
                              Seleccionar
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {searchType === "drivers" && (
        <>
          <FormGroup className="text-gray-700">
            <Label>Busqueda de conductores:</Label>

            <Search placeholder="Buscar por nombre o cédula..." onChange={searchInputHandler} />
          </FormGroup>

          <div className="mt-5">
            <H3 weight="normal">Lista de conductores</H3>

            <div className="mt-5 whitespace-nowrap overflow-x-auto">
              <table className="border-separate w-full border-2 border-gray-100 ">
                <thead>
                  <tr className="text-left">
                    {DRIVERS_COLUMNS.map((col) => (
                      <th key={col} className="p-3.5">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {drivers.map(
                    ({ driverId, name, lastname, identificationCode, photo, statusName, statusDescription }) => {
                      const fullname = `${name} ${lastname}`;
                      const statusColor =
                        statusName === "Disponible" ? "bg-green-200 text-green-500" : statusName === "En proceso de entrega" ? "bg-blue-200 text-blue-500" : "bg-red-200 text-red-500";
                      const statusClasses = `py-2 rounded text-center ${statusColor}`;
                      const description = statusDescription || "Sin observaciones";

                      const isBtnDisabled = statusName !== "Disponible";

                      return (
                        <tr key={driverId}>
                          <td className="p-3.5">
                            <div className="flex items-center">
                              <img className="w-10 h-10 rounded-full object-cover" src={photo} alt={fullname} />
                              <span className="ml-2">{fullname}</span>
                            </div>
                          </td>
                          <td className="p-3.5">{identificationCode}</td>
                          <td className="p-3.5 flex">
                            <div className={statusClasses} style={{ minWidth: "151px" }}>{statusName}</div>
                          </td>
                          <td className="p-3.5">{description}</td>
                          {!isBtnDisabled && (
                            <td className="p-3.5">
                              <Button color="primary" onClick={() => driverOnClick(identificationCode)}>
                                Seleccionar
                              </Button>
                            </td>
                          )}
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="mt-5 flex justify-end">
        <Pagination
          total={pagination.resourceCount}
          perPage={pagination.perPage}
          currentPage={pagination.page}
          onChange={paginationHandler}
        />
      </div>
    </div>
  );
};

export default Assignments;

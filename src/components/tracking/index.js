import { useState, useEffect } from "react"
import { H2 } from "../ui"
import { Marker } from "@react-google-maps/api"
import { Map } from "../map"
import Detail from "./Detail"

import classNames from "classnames"
import toast, { Toaster } from "react-hot-toast";

import { getActiveShipmentDriversAPI, getShipmentTrackingCoordinatesAPI } from "../../api/shipments"

const Tracking = () => {
  const [shipments, setShipments] = useState({ all: [], selected: null })
  const [isDetailOpened, setIsDetailOpened] = useState(false)

  const notify = (type, message) => toast[type](message);

  useEffect(() => {
    getActiveShipmentDrivers()
  }, [])

  useEffect(() => {
    if (!shipments.all && !shipments.selected) return

    if (shipments.selected && !shipments.selected?.driverLatitude && !shipments.selected?.driverLongitude) {
      getTrackingCoordinates()
    }

    let interval = null

    if (!interval && shipments.selected) {

      interval = setInterval(() => {
        getTrackingCoordinates()
      }, 20000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [shipments.selected])

  const getActiveShipmentDrivers = async () => {
    const response = await getActiveShipmentDriversAPI()

    if (response.success) {
      const data = response.data

      if (data.length) {
        setShipments((state) => ({ ...state, all: data, selected: data[0] }))
      }
    }
  }

  const getTrackingCoordinates = async () => {
    if (!shipments.selected?.shipmentId) return

    const response = await getShipmentTrackingCoordinatesAPI({ shipmentId: shipments.selected.shipmentId })

    if (response.success) {
      if (!response.data.length) {
        return notify("error", "El conductor no posee registros de coordenadas aún.");
      }

      const { driverLatitude, driverLongitude } = response.data[0]
      setShipments((state) => ({ ...state, selected: { ...state.selected, driverLatitude, driverLongitude } }))
    }
  }

  const selectShipment = (shipmentId) => {
    const shipment = shipments.all.find(shipment => shipment.shipmentId === shipmentId)
    setShipments((state) => ({ ...state, selected: shipment }))
  }

  const openDetail = (shipmentId) => {
    const shipment = shipments.all.find(shipment => shipment.shipmentId === shipmentId)
    
    setShipments((state) => ({ ...state, selected: shipment }))
    setIsDetailOpened(!isDetailOpened)
  }

  const closeDetail = () => {
    setIsDetailOpened(!isDetailOpened)
  }

  const refresh = () => {
    getActiveShipmentDrivers()
  }

  return (
    <>
      <Toaster />

      {isDetailOpened && <Detail data={shipments.selected} onClose={closeDetail} />}

      {!isDetailOpened && (
        <div>
          <div className="mb-5 mt-5 text-right">
            <button className="bg-blue-500 rounded py-2.5 px-10 text-white text-sm" onClick={refresh}>Actualizar</button>
          </div>

          <Map style={{ height: "500px" }}>
            {shipments.selected && (
              <Marker position={{ lat: Number(shipments.selected.driverLatitude), lng: Number(shipments.selected.driverLongitude) }} />
            )}
          </Map>

          <H2 className="my-5 text-gray-700" weight="normal">Lista de envíos</H2>

          <div className="whitespace-nowrap overflow-x-auto">
            <table
              className="w-full border-2 border-gray-100"
              style={{ minWidth: "768px", borderCollapse: "collapse", borderSpacing: "0" }}
            >
              <thead>
                <tr className="text-left border-2 border-gray-100">
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Nombre completo</th>
                  <th className="p-3.5">Cédula</th>
                  <th className="p-3.5">Licencia del vehículo</th>
                  <th className="p-3.5">Marca</th>
                  <th className="p-3.5">Modelo</th>
                  <th className="p-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {shipments.all.map((data, index) => {
                  const isButtonDisabled = data.shipmentId === shipments.selected?.shipmentId
                  const buttonClasses = classNames("text-white text-sm rounded p-2", {
                    "bg-green-500": data.shipmentId !== shipments.selected?.shipmentId,
                    "bg-gray-400":  data.shipmentId === shipments.selected?.shipmentId
                  })
                  const buttonText = data.shipmentId === shipments.selected?.shipmentId ? "Seleccionado" : "Seleccionar"
                  
                  return (
                    <tr className="border-2 border-gray-100" key={data.shipmentId}>
                      <td className="p-3.5">{index + 1}</td>
                      <td className="p-3.5">
                        <div className="flex items-center">
                          <img className="w-10 h-10 rounded-full object-cover" src={data.driverPhoto} alt={data.driverName} />
                          <span className="ml-2">{data.driverName} {data.driverLastname}</span>
                        </div>
                      </td>
                      <td className="p-3.5">{data.driverIdentificationCode}</td>
                      <td className="p-3.5">{data.vehicleLicenseNumber}</td>
                      <td className="p-3.5">{data.vehicleBrand}</td>
                      <td className="p-3.5">{data.vehicleModel}</td>
                      <td className="p-3.5">
                        <div className="flex gap-2">
                          <button className={buttonClasses} disabled={isButtonDisabled} onClick={() => selectShipment(data.shipmentId)} style={{ minWidth: "98.8px" }}>{buttonText}</button>
                          <button className="bg-blue-500 text-white text-sm rounded py-2 px-3" style={{ minWidth: "98.8px" }} onClick={() => openDetail(data.shipmentId)}>Detalle</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}

export default Tracking
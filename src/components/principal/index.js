import { useState, useEffect } from "react"
import { H2 } from "../ui";
import { Map } from "../map";
import { Marker } from "@react-google-maps/api"
import toast, { Toaster } from "react-hot-toast";
import { getAllShipmentTrackingCoordinatesAPI } from "../../api/shipments"

const Principal = () => {
  const [shipments, setShipments] = useState([])

  const notify = (type, message) => toast[type](message);

  useEffect(() => {
    let interval = null

    if (!interval) {
      getAllShipmentTrackingCoordinates()

      interval = setInterval(() => {
        getAllShipmentTrackingCoordinates()
      }, 20000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  const getAllShipmentTrackingCoordinates = async () => {
    const response = await getAllShipmentTrackingCoordinatesAPI()

    if (response.success) {

      if (!response.data.length) {
        notify("error", "Aún no hay envíos activos.");
      }

      setShipments(response.data)
    }
  }

  return (
    <div>
      <Toaster />

      <H2 className="mb-5 text-gray-700" weight="normal">
        Envíos activos
      </H2>

      <Map>
        {shipments.length > 0 && (
          shipments.map((shipment) => (
            <Marker key={shipment.driverIdentificationCode} label={`${shipment.driverName} ${shipment.driverLastname}`} position={{ lat: Number(shipment.driverLatitude), lng: Number(shipment.driverLongitude) }} />
          ))
        )}
      </Map>
    </div>
  );
};

export default Principal;

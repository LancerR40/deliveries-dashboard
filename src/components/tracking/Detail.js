import { H2, H3, FormGroup, Label, Input } from "../ui"
import { Map } from "../map"
import { Marker, Polyline } from "@react-google-maps/api"

import { IoIosArrowBack } from "react-icons/io"
import { BsCheckCircle } from "react-icons/bs"

const Detail = ({ data, onClose }) => {
  const { shipmentDescription: { address, products, origin, destination }, driverLatitude, driverLongitude } = data

//   {
//     "shipmentId": 31,
//     "shipmentDescription": {
//         "products": [
//             {
//                 "productName": "Pepsi",
//                 "productQuantity": 10
//             }
//         ],
//         "address": "Mall Delicias, Maracaibo",
//         "origin": {
//             "latitude": "10.93110654706317",
//             "longitude": "-71.73188368670101"
//         },
//         "destination": {
//             "latitude": "10.952840363811298",
//             "longitude": "-71.72650603333574"
//         }
//     },
//     "driverId": 4,
//     "driverName": "Ronald",
//     "driverLastname": "Abu Saleh",
//     "driverIdentificationCode": "26275576",
//     "driverPhoto": "https://res.cloudinary.com/drycaa0bz/image/upload/v1658082393/deliveries-system/driver-photo/baknjwlwddss1loh6jmz.jpg",
//     "vehicleModel": "X-10-PRO",
//     "vehicleBrand": "Tesla",
//     "vehicleLicenseNumber": "A2973B7"
// }



  return (
    <div>
      <span className="flex items-center my-5 text-sm text-blue-500 cursor-pointer" onClick={onClose}>
        <IoIosArrowBack className="text-lg mr-1" />
        Regresar al listado de conductores
      </span>

      <Map style={{ height: 500 }}>
        {/* Origin Market */}
        <Marker label="Origen" position={{ lat: Number(origin.latitude), lng: Number(origin.longitude) }} />

        {/* Driver coordinates */}
        {driverLatitude && driverLongitude && (
          <>
            <Marker label="Conductor" position={{ lat: Number(driverLatitude), lng: Number(driverLongitude) }} />
            <Polyline 
              path={[{ lat: Number(driverLatitude), lng: Number(driverLongitude) }, { lat: Number(destination.latitude), lng: Number(destination.longitude) }]} 
              options={{ geodesic: true, strokeColor: "#669DF6", strokeOpacity: 1.0, strokeWeight: 2 }} 
            />
          </>
        )}

        {/* Destination Market */}
        <Marker label={"Destino"} position={{ lat: Number(destination.latitude), lng: Number(destination.longitude) }} />
      </Map>

      <H2 className="my-5 text-gray-700" weight="normal">
        Datos del conductor
      </H2>

      <div className="lg:flex lg:gap-4">
        <FormGroup className="flex-1 text-gray-700">
          <Label>Nombre:</Label>
          <Input type="text" defaultValue={data.driverName} disabled />
        </FormGroup>

        <FormGroup className="flex-1 text-gray-700">
          <Label>Apellido:</Label>

          <Input type="text" defaultValue={data.driverLastname} disabled />
        </FormGroup>
      </div>

      <div className="lg:flex lg:gap-4">
        <FormGroup className="flex-1 text-gray-700">
          <Label>Cédula:</Label>
          <Input type="text" defaultValue={data.driverIdentificationCode} disabled />
        </FormGroup>

        <div className="flex-1" />
      </div>

      <H2 className="mb-5 text-gray-700" weight="normal">
        Datos del vehículo
      </H2>

      <div className="lg:flex lg:gap-4">
        <FormGroup className="flex-1 text-gray-700">
          <Label>Número de licencia:</Label>
          <Input type="text" defaultValue={data.vehicleLicenseNumber} disabled />
        </FormGroup>

        <FormGroup className="flex-1 text-gray-700">
          <Label>Marca:</Label>

          <Input type="text" defaultValue={data.vehicleBrand} disabled />
        </FormGroup>
      </div>

      <div className="lg:flex lg:gap-4">
        <FormGroup className="flex-1 text-gray-700">
          <Label>Modelo:</Label>
          <Input type="text" defaultValue={data.vehicleModel} disabled />
        </FormGroup>

        <div className="flex-1" />
      </div>

      <H2 className="mb-5 text-gray-700" weight="normal">
        Datos de envío
      </H2>

      <FormGroup className="flex-1 text-gray-700">
        <Label>Dirección:</Label>
        <Input type="text" defaultValue={address} disabled />
      </FormGroup>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Lista de productos
      </H3>
      
      {products && products?.length > 0 && (
        <div className="mb-5 flex gap-2">
          {products.map(({productName, productQuantity }) => (
            <div key={productName} className="bg-gray-100 flex items-center justify-between p-3 rounded">
              <div className="text-gray-700 text-sm">
                <span>Nombre: {productName}</span>
                <span className="block mt-2">Cantidad: {productQuantity}</span>
              </div>

              <BsCheckCircle className="ml-5 text-green-500 text-xl" />
            </div>
          ))}
        </div>
      )}

      <H3 className="mb-5 text-gray-700" weight="normal">
        Coordenadas de origen
      </H3>

      <div className="lg:flex lg:gap-4">
        <FormGroup className="flex-1 text-gray-700">
          <Label>Latitud:</Label>
          <Input type="text" defaultValue={origin.latitude} disabled />
        </FormGroup>

        <FormGroup className="flex-1 text-gray-700">
          <Label>Longitud:</Label>

          <Input type="text" defaultValue={origin.longitude} disabled />
        </FormGroup>
      </div>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Coordenadas de destino
      </H3>

      <div className="lg:flex lg:gap-4">
        <FormGroup className="flex-1 text-gray-700">
          <Label>Latitud:</Label>
          <Input type="text" defaultValue={destination.latitude} disabled />
        </FormGroup>

        <FormGroup className="flex-1 text-gray-700">
          <Label>Longitud:</Label>

          <Input type="text" defaultValue={destination.longitude} disabled />
        </FormGroup>
      </div>
    </div>
  )
}

export default Detail
import { H2, H3, FormGroup, Label, Input, Button } from "../ui";
import { useState } from "react";
import classNames from "classnames";
import { Marker, Polyline } from "@react-google-maps/api"

import Select from "react-select";
import AsyncSelect from "react-select/async";
import { Map } from "../map";

import { createShipmentAPI, getDriversAPI, getAssigmentsVehiclesAPI } from "../../api/shipments";

import { MdOutlineCancel } from "react-icons/md";
import { HiOutlineViewGridAdd } from "react-icons/hi";

import toast, { Toaster } from "react-hot-toast";

const initialState = {
  products: [],
  driverIdentificationCode: "",
  vehicleLicenseNumber: "",
  shipment: {
    address: "",
    origin: {
      latitude: "",
      longitude: "",
    },
    destination: {
      latitude: "",
      longitude: "",
    },
  },
};

const Shipments = () => {
  const [data, setData] = useState(initialState);
  const [mapCoordinatesType, setMapCoordinatesType] = useState("initial");
  const [assigmentsVehicles, setAssigmentsVehicles] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState({ productName: "", productQuantity: "" })
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const polylinePath = [
    { lat: Number(data.shipment.origin.latitude), lng: Number(data.shipment.origin.longitude) },
    { lat: Number(data.shipment.destination.latitude), lng: Number(data.shipment.destination.longitude) }
  ]

  const notify = (type, message) => toast[type](message);

  const onSubmit = async (e) => {
    e.preventDefault()

    // if (data.products.length < 1) {
    //   return notify("error", "Debes añadir productos al envío.")
    // }

    // if (!data.driverIdentificationCode) {
    //   return notify("error", "Debes añadir la cédula de un conductor para continuar.")
    // }

    // if (!data.vehicleLicenseNumber) {
    //   return notify("error", "Debes añadir un número de licencia de vehículo para continuar.")
    // }

    // if (!data.shipment.address) {
    //   return notify("error", "Debes añadir una dirección de envío para continuar.")
    // }

    // if (!data.shipment.origin.latitude) {
    //   return notify("error", "Debes añadir una latitud de origen para continuar.")      
    // }

    // if (!data.shipment.origin.longitude) {
    //   return notify("error", "Debes añadir una longitud de origen para continuar.")
    // }

    // if (!data.shipment.destination.latitude) {
    //   return notify("error", "Debes añadir una latitud de destino para continuar.")      
    // }

    // if (!data.shipment.destination.longitude) {
    //   return notify("error", "Debes añadir una longitud de destino para continuar.")
    // }

    const response = await createShipmentAPI(data)

    if (!response.success) {
      notify("error", response.error.message)
    }

    if (response.success) {
      setData(initialState)
      notify("success", response.data.message)
    }
  }

  const searchDriver = async (value) => {
    const response = await getDriversAPI({ field: value });

    if (response.success) {
      const mapper = response.data.map(({ driverName, driverLastname, driverIdentificationCode, driverPhoto }) => {
        const fullname = `${driverName} ${driverLastname}`;
        const label = (
          <div className="flex items-center gap-2">
            <img className="w-6 h-6 rounded-full object-cover" src={driverPhoto} alt={fullname} />
            <span>{fullname}</span>
            <span>{driverIdentificationCode}</span>
          </div>
        );

        return {
          value: driverIdentificationCode,
          label,
        };
      });

      return mapper;
    }

    return [];
  };

  const selectDriver = async (e) => {
    setData((state) => ({ ...state, driverIdentificationCode: e.value, vehicleLicenseNumber: "" }));
    setSelectedVehicle(null)

    const response = await getAssigmentsVehiclesAPI({ field: e.value });

    if (response.success) {
      if (!response.data[0].vehicleModel) {
        return setAssigmentsVehicles([]);
      }

      const mapper = response.data.map(({ vehicleModel, vehicleLicenseNumber }) => {
        return {
          value: vehicleLicenseNumber,
          label: `${vehicleModel} - ${vehicleLicenseNumber}`,
        };
      });

      setAssigmentsVehicles(mapper);
    }
  };

  const selectVehicle = (option) => {
    setData((state) => ({ ...state, vehicleLicenseNumber: option.value }));
    setSelectedVehicle(option)
  };

  const addProduct = () => {
    if (!selectedProduct.productName) {
      return notify("error", "Debes agregar un nombre de producto.");
    }

    if (!selectedProduct.productQuantity) {
      return notify("error", "Debes agregar una cantidad de producto.");
    }

    if (data.products.some(prod => prod.productName.toLowerCase() === selectedProduct.productName.toLowerCase())) {
      return notify("error", "El producto ya se encuentra registrado.");
    }
   
    setData((state) => ({ ...state, products: [...state.products, selectedProduct] }))
    setSelectedProduct({ productName: "", productQuantity: "" })
  };

  const removeProduct = (productName) => {
    const products = data.products.filter(product => product.productName.toLowerCase() !== productName.toLowerCase())
    setData((state) => ({ ...state, products }))
  };

  const onClickMapHandler = (mapProps) => {
    const latitude = String(mapProps.latLng.lat())
    const longitude = String(mapProps.latLng.lng())

    if (mapCoordinatesType === "initial") {
      return setData(state => ({ ...state, shipment: { ...state.shipment, origin: { latitude, longitude } } }))
    }

    setData(state => ({ ...state, shipment: { ...state.shipment, destination: { latitude, longitude } } }))
  };

  const coordinatesTypeHandler = (type) => {
    setMapCoordinatesType(type);
  };

  return (
    <div>
      <Toaster />

      <H2 className="my-5 text-gray-700" weight="normal">
        Selección de conductor y vehículo
      </H2>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Buscar conductor:</Label>

          <AsyncSelect
            className="text-sm"
            cacheOptions
            loadOptions={searchDriver}
            onChange={selectDriver}
            defaultOptions
          />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Seleccionar vehículo:</Label>

          <Select
            className="text-sm"
            options={assigmentsVehicles}
            value={selectedVehicle}
            onChange={selectVehicle}
          />
        </FormGroup>
      </FormGroup>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Cédula del conductor:</Label>

          <Input type="text" name="driverIdentificationCode" placeholder="Cédula del conductor..." value={data.driverIdentificationCode} />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Número de licencia del vehículo:</Label>

          <Input type="text" name="vehicleLicenseNumber" placeholder="Número de licencia del vehículo..." value={data.vehicleLicenseNumber} />
        </FormGroup>
      </FormGroup>

      <H2 className="mb-5 text-gray-700" weight="normal">
        Agregar productos
      </H2>

      <FormGroup>
        <div className="lg:flex lg:gap-4">
          <FormGroup className="flex-1 text-sm text-gray-700">
            <Label>Nombre del producto:</Label>
            <Input type="text" name="productName" placeholder="Nombre del producto..." value={selectedProduct.productName} onChange={(e) => setSelectedProduct((state) => ({ ...state, productName: e.target.value }))} />
          </FormGroup>

          <FormGroup className="flex-1 text-sm text-gray-700">
            <Label>Cantidad del producto:</Label>
            <Input type="number" name="productQuantity" placeholder="Cantidad del producto..." value={selectedProduct.productQuantity} onChange={(e) => setSelectedProduct((state) => ({ ...state, productQuantity: e.target.value }))} />
          </FormGroup>

          <FormGroup className="flex items-end">
            <div
                className="flex justify-center items-center w-full lg:w-10 h-10 rounded bg-blue-500 text-red-500 cursor-pointer"
                onClick={addProduct}
              >
              <HiOutlineViewGridAdd className="text-white text-lg" />
            </div>
          </FormGroup>
        </div>

        {data.products.length > 0 && (
          <div className="mt-5 flex gap-2">
            {data.products.map(({productName, productQuantity }) => (
                <div key={productName} className="bg-gray-100 flex items-center justify-between p-3 rounded">
                  <div className="text-gray-700 text-sm">
                    <span>Nombre: {productName}</span>
                    <span className="block mt-2">Cantidad: {productQuantity}</span>
                  </div>

                  <MdOutlineCancel className="ml-5 text-red-500 text-xl cursor-pointer" onClick={() => removeProduct(productName)} />
                </div>
              ))}
          </div>
        )}
      </FormGroup>

      <H2 className="mb-5 text-gray-700" weight="normal">
        Datos de punto de inicio y destino
      </H2>

      <FormGroup className="text-sm text-gray-700 flex-1">
        <Label>Dirección de envío:</Label>

        <Input type="text" name="shipmentAddress" placeholder="Ingresar la dirección de envío..." value={data.shipment.address} onChange={e => setData(state => ({ ...state, shipment: { ...state.shipment, address: e.target.value } }))} />
      </FormGroup>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Coordenadas de punto de inicio
      </H3>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Latitud:</Label>

          <Input type="number" name="originLatitude" placeholder="Agregar latitud inicial..." value={data.shipment.origin.latitude} onChange={(e) => setData(state => ({ ...state, shipment: { ...state.shipment, origin: { ...state.shipment.origin, latitude: e.target.value } } }))} />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Longitud:</Label>

          <Input type="number" name="originLongitude" placeholder="Agregar longitud inicial..." value={data.shipment.origin.longitude} onChange={(e) => setData(state => ({ ...state, shipment: { ...state.shipment, origin: { ...state.shipment.origin, longitude: e.target.value } } }))} />
        </FormGroup>
      </FormGroup>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Coordenadas de punto de destino
      </H3>

      <FormGroup className="lg:flex lg:gap-4 mb-0">
        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Latitud:</Label>

          <Input type="number" name="destinationLatitude" placeholder="Agregar latitud final..." value={data.shipment.destination.latitude} onChange={(e) => setData(state => ({ ...state, shipment: { ...state.shipment, destination: { ...state.shipment.destination, latitude: e.target.value } } }))} />
        </FormGroup>

        <FormGroup className="text-sm text-gray-700 flex-1">
          <Label>Longitud:</Label>

          <Input type="number" name="destinationLongitude" placeholder="Agregar longitud final..." value={data.shipment.destination.longitude} onChange={(e) => setData(state => ({ ...state, shipment: { ...state.shipment, destination: { ...state.shipment.destination, longitude: e.target.value } } }))} />
        </FormGroup>
      </FormGroup>

      <H3 className="mb-5 text-gray-700" weight="normal">
        Selección de coordenadas mediante el mapa
      </H3>

      <div className="mb-5 flex text-center">
        <div
          className={classNames("flex-1 py-2 px-10 rounded-l cursor-pointer transition-all", {
            "bg-blue-500 text-white": mapCoordinatesType === "initial",
            "bg-gray-100": mapCoordinatesType !== "initial",
          })}
          onClick={() => coordinatesTypeHandler("initial")}
        >
          Coordinadas iniciales
        </div>

        <div
          className={classNames("flex-1 py-2 px-10 rounded-r cursor-pointer transition-all", {
            "bg-blue-500 text-white": mapCoordinatesType === "destination",
            "bg-gray-100": mapCoordinatesType !== "destination",
          })}
          onClick={() => coordinatesTypeHandler("destination")}
        >
          Coordenadas finales
        </div>
      </div>

      <Map onClick={onClickMapHandler}>
        <Marker
          label="Punto inicial"
          position={{ lat: Number(data.shipment.origin.latitude), lng: Number(data.shipment.origin.longitude) }}
        />

        <Marker
          label="Punto de destino"
          position={{ lat: Number(data.shipment.destination.latitude), lng: Number(data.shipment.destination.longitude) }}
        />

        <Polyline path={polylinePath} options={{ geodesic: true, strokeColor: "#669DF6", strokeOpacity: 1.0, strokeWeight: 2 }} />
      </Map>

      <Button type="submit" color="primary" className="lg:w-96 mt-5" onClick={onSubmit}>
        Registrar
      </Button>
    </div>
  );
};

export default Shipments;

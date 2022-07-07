import { H2 } from "../ui";
import Map from "../map/Map";

const Principal = () => {
  return (
    <div>
      <H2 className="mb-5 text-gray-700" weight="normal">
        Pedidos activos
      </H2>

      <Map />
    </div>
  );
};

export default Principal;

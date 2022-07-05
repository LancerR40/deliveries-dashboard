import { Tabs, TabPane } from "../ui";
import List from "./List";
import Form from "./Form";
import Assignments from "./Assignments";

const Vehicles = () => {
  return (
    <Tabs defaultTabPane={3}>
      <TabPane tab="Listado" id={1}>
        <List />
      </TabPane>

      <TabPane tab="Formulario" id={2}>
        <Form />
      </TabPane>

      <TabPane tab="Asignaciones" id={3}>
        <Assignments />
      </TabPane>
    </Tabs>
  );
};

export default Vehicles;

import { Tabs, TabPane } from "../ui";
import List from "./List";
import Form from "./Form";

const Vehicles = () => {
  return (
    <Tabs defaultTabPane={1}>
      <TabPane tab="Listado" id={1}>
        <List />
      </TabPane>

      <TabPane tab="Formulario" id={2}>
        <Form />
      </TabPane>

      <TabPane tab="Vincular" id={3}></TabPane>
    </Tabs>
  );
};

export default Vehicles;

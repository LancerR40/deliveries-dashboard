import { Tabs, TabPane } from "../ui";
import List from "./List";
import Form from "./Form";
import Assignments from "./Assignments";
import AssignmentsList from "./AssignmentsList";

const Vehicles = () => {
  return (
    <Tabs defaultTabPane={1}>
      <TabPane tab="Listado" id={1}>
        <List />
      </TabPane>

      <TabPane tab="Formulario" id={2}>
        <Form />
      </TabPane>

      <TabPane tab="Asignar" id={3}>
        <Assignments />
      </TabPane>

      <TabPane tab="Listado de asignaciones" id={4}>
        <AssignmentsList />
      </TabPane>
    </Tabs>
  );
};

export default Vehicles;

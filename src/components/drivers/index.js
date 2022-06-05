import { Tabs, TabPane } from "../ui";
import Form from "./Form";

const Drivers = () => {
  return (
    <Tabs defaultTabPane={2}>
      <TabPane tab="Listado" id={1}>
        <div className="mt-5">Hola</div>
      </TabPane>

      <TabPane tab="Formulario" id={2}>
        <Form />
      </TabPane>

      <TabPane tab="Documentos" id={3}></TabPane>
    </Tabs>
  );
};

export default Drivers;

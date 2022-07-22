import { H2, H3, FormGroup, Input, Label, RadioGroup, Radio, Date, Photo, Select, Option, Button } from "../ui"
import { IoIosArrowBack } from "react-icons/io"

const Detail = () => {
  return (
    <div>
        <span className="flex items-center mt-5 text-sm text-blue-500">
          <IoIosArrowBack className="text-lg mr-1" />
          Regresar al listado de conductores
        </span>

        <H2 className="my-5 text-gray-700" weight="normal">
          Detalle de conductor
        </H2>

        <form>
          <div className="lg:flex lg:gap-4">
            <FormGroup className="flex-1 text-gray-700">
              <Label>Nombre:</Label>

              <Input
                type="text"
                name="name"
                placeholder="Ingresa el Nombre..."
                defaultValue="Ronald"
              />
            </FormGroup>

            <FormGroup className="flex-1 text-gray-700">
              <Label>Apellido:</Label>

              <Input
                type="text"
                name="lastname"
                placeholder="Ingresa el Apellido..."
                defaultValue="Abu Saleh"
              />
            </FormGroup>
          </div>

          <FormGroup className="text-gray-700">
            <Label>Cédula</Label>

            <Input
                type="text"
                name="identificationCode"
                placeholder="Ingresa la cédula..."
              
            />
          </FormGroup>

          <FormGroup className="text-gray-700">
              <Label>Género</Label>

              <RadioGroup value="gender">
                <Radio value="Masculino">
                  Masculino
                </Radio>
                <Radio value="Femenino">
                  Femenino
                </Radio>
              </RadioGroup>
            </FormGroup>

          <FormGroup className="text-gray-700">
            <Label>Fecha de nacimiento:</Label>

            <Date name="dateOfBirth" />
         </FormGroup>

          <div className="lg:flex lg:gap-4">
            <FormGroup className="flex-1 text-gray-700">
              <Label>Email:</Label>

              <Input
                type="email"
                name="email"
                placeholder="Ingresa el email..."
              />
            </FormGroup>

            <FormGroup className="flex-1 text-gray-700">
              <Label>Contraseña</Label>

              <Input
                type="password"
                name="password"
                placeholder="Ingresa la contraseña..."
              />
            </FormGroup>
          </div>

          <FormGroup className="text-gray-700">
            <Label>Foto</Label>

            <Photo name="photo" placeholder="Subir una foto de identificación..." />
          </FormGroup>

          <H3 className="mb-5 text-gray-700" weight="normal">Documentos</H3>

          <Select className="text-gray-700 mb-5" name="title">
            <Option>Selecciona un documento asociado al conductor...</Option>   
          </Select>

          <Button type="submit" color="primary" className="lg:w-96">
            Actualizar
          </Button>
        </form>
    </div>
  )
}

export default Detail
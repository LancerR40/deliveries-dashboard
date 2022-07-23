import { useState, useEffect } from "react";
import { H2, Table } from "../ui";
import toast, { Toaster } from "react-hot-toast";
import { getAssignmentsAPI, deleteAssignmentAPI } from "../../api/vehicles"

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState([])

  const notify = (type, message) => toast[type](message);

  useEffect(() => {
    getAssignments()
  }, [])

  const getAssignments = async () => {
    const response = await getAssignmentsAPI()

    if (response.success) {
      setAssignments(response.data)
    }
  }

  const deleteAssignment = async (assignmentVehicleId) => { 
    const response = await deleteAssignmentAPI(assignmentVehicleId)
    
    if (!response.success) {
      return notify("error", response.error.message);
    }

    if (response.success) {
      const filter = assignments.filter(assignment => assignment.assignedVehicleId !== assignmentVehicleId)
      setAssignments(filter)

      return notify("success", response.data.message);
    }
  }

  return (
    <div>
      <Toaster />

      <H2 className="my-5 text-gray-700" weight="normal">
        Lista de vehículos asignados
      </H2>

      <div className="whitespace-nowrap overflow-x-auto">
        <table className="w-full border-2 border-gray-100" style={{ minWidth: "768px", borderCollapse: "collapse", borderSpacing: "0" }} >
              <thead>
                <tr className="text-left border-2 border-gray-100">
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Nombre completo</th>
                  <th className="p-3.5">Cédula</th>
                  <th className="p-3.5">Licencia del vehículo</th>
                  <th className="p-3.5">Marca</th>
                  <th className="p-3.5">Modelo</th>
                  <th className="p-3.5">Acción</th>
                </tr>
              </thead>
              <tbody>
                {assignments?.map((data, index) => {
                  const { assignedVehicleId, driverName, driverLastname, driverIdentificationCode, driverPhoto, vehicleLicenseNumber, vehicleBrand, vehicleModel } = data
                  const fullname = `${driverName} ${driverLastname}`
                  
                  return (
                    <tr className="border-2 border-gray-100" key={assignedVehicleId}>
                      <td className="p-3.5">{index + 1}</td>
                      <td className="p-3.5">
                        <div className="flex items-center">
                          <img className="w-10 h-10 rounded-full object-cover" src={driverPhoto} alt={fullname} />
                          <span className="ml-2">{fullname}</span>
                        </div>
                      </td>
                      <td className="p-3.5">{driverIdentificationCode}</td>
                      <td className="p-3.5">{vehicleLicenseNumber}</td>
                      <td className="p-3.5">{vehicleBrand}</td>
                      <td className="p-3.5">{vehicleModel}</td>
                      <td className="p-3.5">
                        <button className="bg-red-500 text-white text-sm rounded p-2" onClick={() => deleteAssignment(assignedVehicleId)}>Eliminar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default AssignmentsList
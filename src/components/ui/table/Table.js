// const dataSource = [
//   {
//     key: "1",
//     name: "Mike",
//     age: 32,
//     address: "10 Downing Street 10",
//   },
//   {
//     key: "2",
//     name: "John",
//     age: 42,
//     address: "10 Downing Street",
//   },
// ];

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//     key: "address",
//     // render: (string) => <p>{string}</p>,
//   },
// ];

const Table = ({ columns = [], dataSource = [] }) => {
  return (
    <div className="whitespace-nowrap overflow-x-auto">
      <table
        className="w-full border-2 border-gray-100"
        style={{ minWidth: "768px", borderCollapse: "collapse", borderSpacing: "0" }}
      >
        <thead>
          <tr className="text-left">
            {columns.map((col) => (
              <th key={col.key} className="p-3.5">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, index) => (
            <tr key={data.key}>
              {columns.map((col) => {
                return (
                  <td className="p-3.5">
                    {col.render ? col.render(dataSource[index][col.dataIndex]) : dataSource[index][col.dataIndex]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

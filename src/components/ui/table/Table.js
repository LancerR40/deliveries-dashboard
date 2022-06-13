const Table = ({ columns = [], dataSource = [] }) => {
  return (
    <div className="whitespace-nowrap overflow-x-auto">
      <table
        className="w-full border-2 border-gray-100"
        style={{ minWidth: "768px", borderCollapse: "collapse", borderSpacing: "0" }}
      >
        <thead>
          <tr className="text-left border-2 border-gray-100">
            {columns.map((col) => (
              <th key={col.key} className="p-3.5">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data, index) => (
            <tr key={data.key} className="border-2 border-gray-100">
              {columns.map((col) => {
                return (
                  <td className="p-3.5" key={col.key}>
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

export default function TableLoader() {
  return (
    <div className="overflow-x-auto table_scroll animate-pulse">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {[...Array(4)].map((_, i) => (
              <th key={i} className="px-4 py-2">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i}>
              <td className="px-4 py-2 ">
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

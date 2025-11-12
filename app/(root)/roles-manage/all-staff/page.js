import React from 'react';

const AllStaff = () => {
  const data = [
    { name: "haris", email: "test@gmail.com", phone: "123321", address: "bara gate" },
    { name: "haris", email: "beautifulislam209@gmail.com", phone: "03034343433", address: "bara gate" },
    { name: "tayyab", email: "babertayyab56@gmail.com", phone: "020200323746", address: "Deans" },
    { name: "Administrator", email: "admin@bakumia-react.com", phone: "03048994097", address: "Pakistan" },
    { name: "Ibrahim Jan", email: "admin@bakumia.com", phone: "031716161111", address: "Lahore" },
  ];

  return (
    <div className="overflow-hidden rounded-md border">
      {/* Heading Section */}
      <div className="px-4 py-2 text-base font-semibold border-b">
        All Staffs
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">{item.email}</td>
                <td className="py-2 px-4 border">{item.phone}</td>
                <td className="py-2 px-4 border">{item.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStaff;

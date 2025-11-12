"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const stockData = [
  {
    id: 1,
    image: "/images/box.png",
    name: "Kingpark Cylinder",
    category: "Gas",
    supplier: "Royal Traders",
    price: 1800,
    stock: 45,
  },
  {
    id: 2,
    image: "/images/box.png",
    name: "Hi Power Cylinder",
    category: "Tools",
    supplier: "Al-Madina Supply",
    price: 1200,
    stock: 20,
  },
  {
    id: 3,
    image: "/images/box.png",
    name: "Elmax Cylinder",
    category: "Hardware",
    supplier: "FastEquip",
    price: 950,
    stock: 12,
  },
  {
    id: 4,
    image: "/images/box.png",
    name: "IBM Cylinder",
    category: "Industrial",
    supplier: "TechGas Pvt Ltd",
    price: 2100,
    stock: 8,
  },
];

const Stock = () => {
  return (
    <div className="">
      <Card className="border rounded-md shadow-sm">
        <CardHeader className="border-b py-2 px-3">
          <CardTitle className="text-base font-semibold">
            Stock Product List
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <ScrollArea className="max-h-[65vh] rounded-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="border px-2 py-1 text-left font-medium w-12">
                      No.
                    </th>
                    <th className="border px-2 py-1 text-left font-medium">
                      Photo
                    </th>
                    <th className="border px-2 py-1 text-left font-medium">
                      Name
                    </th>
                    <th className="border px-2 py-1 text-left font-medium">
                      Category
                    </th>
                    <th className="border px-2 py-1 text-left font-medium">
                      Supplier
                    </th>
                    <th className="border px-2 py-1 text-center font-medium">
                      Price
                    </th>
                    <th className="border px-2 py-1 text-center font-medium">
                      Stock
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {stockData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="border px-2 py-1 text-center">
                        {index + 1}
                      </td>
                      <td className="border px-2 py-1">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={35}
                          height={35}
                          className="rounded"
                        />
                      </td>
                      <td className="border px-2 py-1">{item.name}</td>
                      <td className="border px-2 py-1">{item.category}</td>
                      <td className="border px-2 py-1">{item.supplier}</td>
                      <td className="border px-2 py-1 text-center">
                        Rs. {item.price}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stock;

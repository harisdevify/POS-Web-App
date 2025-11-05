"use client"

import Image from "next/image"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// Example static data
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
]

const Stock = () => {
  return (
    <div className="p-4">
      <Card className="border rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Stock Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[70vh] w-full overflow-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-muted/50 border-b">
                <tr className="text-left">
                  <th className="p-3 font-medium">No.</th>
                  <th className="p-3 font-medium">Photo</th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium">Supplier</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-md"
                      />
                    </td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{item.supplier}</td>
                    <td className="p-3">Rs. {item.price}</td>
                    <td className="p-3">{item.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

export default Stock

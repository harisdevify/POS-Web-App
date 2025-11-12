"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Plus } from "lucide-react"

const productsData = [
  { id: 1, name: "Kingpark Cylinder", price: 1800, image: "/images/box.png" },
  { id: 2, name: "Hi Power Cylinder", price: 1000, image: "/images/box.png" },
  { id: 3, name: "For Park Cylinder", price: 1000, image: "/images/box.png" },
  { id: 4, name: "IBM Cylinder", price: 1000, image: "/images/box.png" },
  { id: 5, name: "Elmax Cylinder", price: 1200, image: "/images/box.png" },
]

export default function Pos() {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState("")

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id)
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      )
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item
      )
    )
  }

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const filteredProducts = productsData.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
      {/* ---------- LEFT: POS Cart Table ---------- */}
      <Card className="border shadow-md rounded-xl">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Point of Sale</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
            <table className="w-full min-w-[600px] text-sm border-collapse">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-2 text-left font-semibold">Name</th>
                  <th className="p-2 text-center font-semibold w-16">Qty</th>
                  <th className="p-2 text-center font-semibold w-24">Price</th>
                  <th className="p-2 text-center font-semibold w-24">Subtotal</th>
                  <th className="p-2 text-center font-semibold w-16">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-center">
                      <Input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, e.target.value)}
                        className="w-16 text-center"
                      />
                    </td>
                    <td className="p-2 text-center">{item.price}</td>
                    <td className="p-2 text-center">{item.qty * item.price}</td>
                    <td className="p-2 text-center">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}

                {cart.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-muted-foreground"
                    >
                      No items in cart.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ---------- RIGHT: Products Table ---------- */}
      <Card className="border shadow-md rounded-xl">
        <CardHeader className="bg-muted/40 border-b rounded-t-xl">
          <CardTitle className="text-lg font-medium">Products List</CardTitle>
        </CardHeader>

        <div className="p-4 flex items-center gap-3 border-b">
          <Input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <CardContent className="p-0">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
            <table className="w-full min-w-[600px] text-sm border-collapse">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="p-2 text-left font-semibold">Photo</th>
                  <th className="p-2 text-left font-semibold">Name</th>
                  <th className="p-2 text-center font-semibold">Price</th>
                  <th className="p-2 text-center font-semibold w-16">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md border"
                      />
                    </td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2 text-center">{product.price}</td>
                    <td className="p-2 text-center">
                      <Button
                        size="icon"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

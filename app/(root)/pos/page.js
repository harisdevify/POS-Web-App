"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, Plus, Check } from "lucide-react"

const productsData = [
  { id: 1, name: "Kingpark Cylinder", price: 1800, image: "/images/box.png" },
  { id: 2, name: "Hi Power Cylinder", price: 1000, image: "/images/box.png" },
  { id: 3, name: "For Park Cylinder", price: 1000, image: "/images/box.png" },
  { id: 4, name: "IBM Cylinder", price: 1000, image: "/images/box.png" },
  { id: 5, name: "Elmax Cylinder", price: 1200, image: "/images/box.png" },
]

const Pos = () => {
  const [cart, setCart] = useState([])
  const [search, setSearch] = useState("")

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id)
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Left Side — POS Table */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Point of Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-b mb-2" />
          <ScrollArea className="max-h-[60vh]">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr className="text-left">
                  <th className="p-2">NAME</th>
                  <th className="p-2 w-16">QTY</th>
                  <th className="p-2 w-24">PRICE</th>
                  <th className="p-2 w-24">SUBTOTAL</th>
                  <th className="p-2 w-16">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-muted/30">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, e.target.value)}
                        className="w-16 text-center"
                      />
                    </td>
                    <td className="p-2">{item.price}</td>
                    <td className="p-2">
                      {item.qty * item.price}
                    </td>
                    <td className="p-2">
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
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right Side — Products List */}
      <Card className="border rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Products List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <Input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <ScrollArea className="max-h-[60vh]">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr className="text-left">
                  <th className="p-2">PHOTO</th>
                  <th className="p-2">NAME</th>
                  <th className="p-2">PRICE</th>
                  <th className="p-2 w-16 text-center">ACTION</th>
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
                        className="rounded-md"
                      />
                    </td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.price}</td>
                    <td className="p-2 text-center">
                      <Button
                        size="icon"
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="h-4 w-4 text-white" />
                      </Button>
                    </td>
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

export default Pos

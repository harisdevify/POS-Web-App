"use client"
import Link from "next/link"
import { useState, useCallback } from "react"
import Image from "next/image"
import Cropper from "react-easy-crop"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// ----------------------------- //
export default function Dashboard() {
  const [open, setOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [isCropping, setIsCropping] = useState(false)

  const products = [
    {
      id: 1,
      image: "/placeholder.png",
      name: "Wireless Mouse",
      category: "Accessories",
      stock: 120,
      buyingPrice: 900,
      sellingPrice: 1200,
      buyingDate: "2025-07-01",
      supplier: "LogiTech",
      status: "In Stock",
    },
    {
      id: 2,
      image: "/placeholder.png",
      name: "Bluetooth Keyboard",
      category: "Accessories",
      stock: 80,
      buyingPrice: 1100,
      sellingPrice: 1500,
      buyingDate: "2025-07-01",
      supplier: "KeyPro",
      status: "Low Stock",
    },
    {
      id: 3,
      image: "/placeholder.png",
      name: "USB-C Hub",
      category: "Electronics",
      stock: 0,
      buyingPrice: 1400,
      sellingPrice: 1800,
      buyingDate: "2025-07-01",
      supplier: "Kingpark",
      status: "Out of Stock",
    },
  ]

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  // --- Crop helpers ---
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setSelectedProduct((prev) => ({
        ...prev,
        preview: previewUrl,
      }))
      setIsCropping(true)
    }
  }

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg(
      selectedProduct.preview,
      croppedAreaPixels
    )
    setSelectedProduct((prev) => ({
      ...prev,
      preview: croppedImage,
    }))
    setIsCropping(false)
  }

  return (
    <div className="space-y-8 px-2 lg:px-4">
      {/* ---------- Stats Cards ---------- */}
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {/* Card 1 */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Paid</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <IconTrendingUp className="size-4" />
            </div>
          </CardFooter>
        </Card>

        {/* Card 2 */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Due</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              1,234
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingDown />
                -20%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Down 20% this period <IconTrendingDown className="size-4" />
            </div>
          </CardFooter>
        </Card>

        {/* Card 3 */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Complete Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              4.5%
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <IconTrendingUp />
                +4.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Steady performance increase <IconTrendingUp className="size-4" />
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* ---------- Data Table ---------- */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>New Products</CardTitle>
          <Link href="/products">
          <Button size="sm" variant="outline" className="bg-black text-white">
            View All Products
          </Button>
          </Link>
        </CardHeader>
        <CardFooter>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>${p.sellingPrice}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        p.status === "In Stock"
                          ? "text-green-600 border-green-600"
                          : p.status === "Low Stock"
                          ? "text-yellow-600 border-yellow-600"
                          : "text-red-600 border-red-600"
                      }
                    >
                      {p.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(p)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardFooter>
      </Card>

      {/* ---------- Edit Product Popup ---------- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <form className="space-y-4">
              {/* IMAGE UPLOAD + CROP */}
              <div className="flex flex-col items-center">
                {!isCropping ? (
                  <>
                    <Image
                      src={
                        selectedProduct.preview ||
                        selectedProduct.image ||
                        "/placeholder.png"
                      }
                      alt="Product"
                      width={100}
                      height={100}
                      className="rounded-md mb-2 border"
                    />
                    <Input
                      type="file"
                      accept="image/*"
                      className="w-full"
                      onChange={handleFileChange}
                    />
                  </>
                ) : (
                  <div className="relative w-full h-64 bg-black/50 rounded-md overflow-hidden">
                    <Cropper
                      image={selectedProduct.preview}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsCropping(false)}
                      >
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleCropSave}>
                        Crop
                      </Button>
                    </div>
                    <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-2/3"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* PRODUCT DETAILS */}
              <div>
                <Label>Product Name *</Label>
                <Input defaultValue={selectedProduct.name} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category *</Label>
                  <Input defaultValue={selectedProduct.category} />
                </div>
                <div>
                  <Label>Supplier *</Label>
                  <Input defaultValue={selectedProduct.supplier} />
                </div>
              </div>

              <div>
                <Label>Product Stock</Label>
                <Input type="number" defaultValue={selectedProduct.stock} />
              </div>

              <div>
                <Label>Buying Date</Label>
                <Input type="date" defaultValue={selectedProduct.buyingDate} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Buying Price *</Label>
                  <Input type="number" defaultValue={selectedProduct.buyingPrice} />
                </div>
                <div>
                  <Label>Selling Price *</Label>
                  <Input type="number" defaultValue={selectedProduct.sellingPrice} />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// 🧩 Helper: Create cropped image blob
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const fileUrl = URL.createObjectURL(blob)
      resolve(fileUrl)
    }, "image/jpeg")
  })
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener("load", () => resolve(img))
    img.addEventListener("error", (error) => reject(error))
    img.setAttribute("crossOrigin", "anonymous")
    img.src = url
  })
}

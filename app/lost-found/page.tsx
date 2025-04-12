"use client"

import type React from "react"
import { useState } from "react"
import { Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function LostFoundPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLibraryNotice, setShowLibraryNotice] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    location: "",
    description: "",
    contactInfo: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      toast({
        title: "Item reported successfully",
        description: "Your lost/found item has been reported.",
      })
      setIsSubmitting(false)
      setFormData({
        itemName: "",
        category: "",
        location: "",
        description: "",
        contactInfo: "",
      })
    }, 1500)
  }

  const lostItems = [
    {
      id: 1,
      name: "Blue Water Bottle",
      category: "Accessories",
      location: "Library",
      date: "2023-05-15",
      image: "/placeholder.svg?height=200&width=200&text=Water+Bottle",
    },
    {
      id: 2,
      name: "Black Laptop Bag",
      category: "Bags",
      location: "Cafeteria",
      date: "2023-05-14",
      image: "/placeholder.svg?height=200&width=200&text=Laptop+Bag",
    },
    {
      id: 3,
      name: "Silver Watch",
      category: "Accessories",
      location: "Gym",
      date: "2023-05-13",
      image: "/placeholder.svg?height=200&width=200&text=Watch",
    },
  ]

  const foundItems = [
    {
      id: 7,
      name: "Red Umbrella",
      category: "Accessories",
      location: "Bus Stop",
      date: "2023-05-15",
      image: "/placeholder.svg?height=200&width=200&text=Umbrella",
    },
    {
      id: 8,
      name: "Wireless Earbuds",
      category: "Electronics",
      location: "Student Center",
      date: "2023-05-14",
      image: "/placeholder.svg?height=200&width=200&text=Earbuds",
    },
  ]

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Lost & Found</h2>
            <p className="text-muted-foreground">Report or search for lost and found items on campus</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Report Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Report Lost/Found Item</DialogTitle>
                    <DialogDescription>Fill out the details of the item you lost or found</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="itemName" className="text-right">Item Name</Label>
                      <Input
                        id="itemName"
                        name="itemName"
                        value={formData.itemName}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                          <SelectItem value="documents">Documents</SelectItem>
                          <SelectItem value="keys">Keys</SelectItem>
                          <SelectItem value="bags">Bags</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="location" className="text-right">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="contactInfo" className="text-right">Contact Info</Label>
                      <Input
                        id="contactInfo"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleInputChange}
                        className="col-span-3"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for lost or found items..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="lost" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lost">Lost Items</TabsTrigger>
            <TabsTrigger value="found">Found Items</TabsTrigger>
          </TabsList>

          <TabsContent value="lost" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {lostItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="p-4">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-col space-y-1">
                        <span>Location: {item.location}</span>
                        <span>Date: {item.date}</span>
                        <Badge className="w-fit mt-1">{item.category}</Badge>
                      </div>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                    <Button className="w-full" onClick={() => setShowLibraryNotice(item.id)}>
                      I Found This
                    </Button>

                    {showLibraryNotice === item.id && (
                      <div className="w-full bg-yellow-50 p-3 border-l-4 border-yellow-500 text-yellow-800 rounded-md text-sm">
                        <div className="font-medium mb-1">📢 Found an Item?</div>
                        Please submit the item to the <strong>Library Office</strong>.
                        <Button variant="outline" className="mt-2 w-full" onClick={() => setShowLibraryNotice(null)}>
                          Close
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="found" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {foundItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="p-4">
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-col space-y-1">
                        <span>Location: {item.location}</span>
                        <span>Date: {item.date}</span>
                        <Badge className="w-fit mt-1">{item.category}</Badge>
                      </div>
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">This is Mine</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

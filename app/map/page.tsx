"use client"

import { useEffect, useState } from "react"
import { Building, MapPin, Search } from "lucide-react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mapContainerStyle = {
  width: "100%",
  height: "500px",
}

const center = {
  lat:22.8434, // Replace with your campus center latitude
  lng: 86.1025, // Replace with your campus center longitude
} 

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [buildingFilter, setBuildingFilter] = useState("all")
  const [busLocations, setBusLocations] = useState([
    { id: 1, position: { lat: 28.6142, lng: 77.2089 } },
    { id: 2, position: { lat: 28.6125, lng: 77.2101 } },
  ])

  // Optional: Simulate bus location updates (for Firebase, fetch new positions here)
  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocations((prev) =>
        prev.map((bus) => ({
          ...bus,
          position: {
            lat: bus.position.lat + (Math.random() - 0.5) * 0.0002,
            lng: bus.position.lng + (Math.random() - 0.5) * 0.0002,
          },
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const buildingCategories = [
    { id: "academic", name: "Academic" },
    { id: "administrative", name: "Administrative" },
    { id: "residential", name: "Residential" },
    { id: "recreational", name: "Recreational" },
    { id: "dining", name: "Dining" },
  ]

  const buildings = [
    { id: 1, name: "Main Building", category: "academic", location: "Central Campus", description: "Houses administration offices and main lecture halls." },
    { id: 2, name: "Science Center", category: "academic", location: "North Campus", description: "Home to science labs and research facilities." },
    { id: 3, name: "Library", category: "academic", location: "East Campus", description: "Main campus library with study spaces and resources." },
    { id: 4, name: "Student Center", category: "recreational", location: "Central Campus", description: "Hub for student activities and organizations." },
    { id: 5, name: "Dormitory A", category: "residential", location: "West Campus", description: "Freshman dormitory with shared facilities." },
    { id: 6, name: "Dormitory B", category: "residential", location: "West Campus", description: "Upperclassman dormitory with suite-style rooms." },
    { id: 7, name: "Sports Complex", category: "recreational", location: "South Campus", description: "Facilities for various sports and fitness activities." },
    { id: 8, name: "Cafeteria", category: "dining", location: "Central Campus", description: "Main dining hall serving breakfast, lunch, and dinner." },
    { id: 9, name: "Administration Building", category: "administrative", location: "East Campus", description: "Houses administrative offices and services." },
    { id: 10, name: "Engineering Building", category: "academic", location: "North Campus", description: "Home to engineering labs and classrooms." },
    { id: 11, name: "Arts Center", category: "academic", location: "South Campus", description: "Facilities for visual and performing arts." },
    { id: 12, name: "Health Center", category: "administrative", location: "Central Campus", description: "Provides health services to students and staff." },
  ]

  const filteredBuildings = buildings.filter(
    (building) =>
      (buildingFilter === "all" || building.category === buildingFilter) &&
      (searchQuery === "" ||
        building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        building.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        building.location.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campus Map</h2>
          <p className="text-muted-foreground">Navigate and explore the campus</p>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search buildings, facilities..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={buildingFilter} onValueChange={setBuildingFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Buildings</SelectItem>
              {buildingCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="map" className="space-y-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          {/* MAP VIEW */}
          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Campus Map</CardTitle>
                <CardDescription>Explore the campus and track live buses</CardDescription>
              </CardHeader>
              <CardContent>
                <LoadScript googleMapsApiKey="AIzaSyC82H2EEqC3nkm1Fx5XnC4oaA-jkBCzFeU">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={16}
                  >
                    {/* College Center */}
                    <Marker position={center} label="🏫" />

                    {/* Real-Time Bus Markers */}
                    {busLocations.map((bus) => (
                      <Marker key={bus.id} position={bus.position} label="🚌" />
                    ))}
                  </GoogleMap>
                </LoadScript>

                <div className="mt-4 flex flex-wrap gap-2">
                  {buildingCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant="outline"
                      size="sm"
                      className={buildingFilter === category.id ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => setBuildingFilter(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className={buildingFilter === "all" ? "bg-primary text-primary-foreground" : ""}
                    onClick={() => setBuildingFilter("all")}
                  >
                    All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LIST VIEW */}
          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredBuildings.map((building) => (
                <Card key={building.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      {building.name}
                    </CardTitle>
                    <CardDescription>{building.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{building.description}</p>
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        View on Map
                      </Button>
                      <Button variant="outline" size="sm">
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredBuildings.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No buildings found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search or filter to find buildings.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

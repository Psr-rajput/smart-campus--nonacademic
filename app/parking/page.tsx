"use client"

import { useState } from "react"
import { MapPin, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function ParkingPage() {
  const [selectedLot, setSelectedLot] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [reservationEnabled, setReservationEnabled] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Sample data for parking lots
  const parkingLots = [
    {
      id: "north",
      name: "North Lot",
      total: 120,
      available: 42,
      reserved: 10,
      distance: "5 min walk to Main Building",
    },
    { id: "south", name: "South Lot", total: 80, available: 15, reserved: 5, distance: "3 min walk to Library" },
    { id: "east", name: "East Lot", total: 60, available: 8, reserved: 2, distance: "2 min walk to Student Center" },
    { id: "west", name: "West Lot", total: 100, available: 30, reserved: 8, distance: "7 min walk to Sports Complex" },
  ]

  const filteredLots = selectedLot === "all" ? parkingLots : parkingLots.filter((lot) => lot.id === selectedLot)

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Parking</h2>
            <p className="text-muted-foreground">Find available parking spots on campus</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedLot} onValueChange={setSelectedLot}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select lot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lots</SelectItem>
                {parkingLots.map((lot) => (
                  <SelectItem key={lot.id} value={lot.id}>
                    {lot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="reservation-mode" checked={reservationEnabled} onCheckedChange={setReservationEnabled} />
          <Label htmlFor="reservation-mode">Enable Parking Reservation</Label>
        </div>

        <Tabs defaultValue="map" className="space-y-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campus Parking Map</CardTitle>
                <CardDescription>Live view of parking availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Interactive map will be displayed here</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {parkingLots.map((lot) => {
                    const availablePercentage = (lot.available / lot.total) * 100
                    let statusColor = "text-red-500"
                    if (availablePercentage > 50) {
                      statusColor = "text-green-500"
                    } else if (availablePercentage > 20) {
                      statusColor = "text-yellow-500"
                    }

                    return (
                      <Card key={lot.id} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <CardTitle className="text-base">{lot.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex justify-between items-center">
                            <span className={`text-2xl font-bold ${statusColor}`}>{lot.available}</span>
                            <span className="text-muted-foreground">/ {lot.total} spots</span>
                          </div>
                          <Progress value={availablePercentage} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {filteredLots.map((lot) => {
                const availablePercentage = (lot.available / lot.total) * 100
                let statusColor = "text-red-500"
                let statusBadge = "bg-red-100 text-red-800"
                let statusText = "Full"

                if (availablePercentage > 50) {
                  statusColor = "text-green-500"
                  statusBadge = "bg-green-100 text-green-800"
                  statusText = "Available"
                } else if (availablePercentage > 20) {
                  statusColor = "text-yellow-500"
                  statusBadge = "bg-yellow-100 text-yellow-800"
                  statusText = "Limited"
                }

                return (
                  <Card key={lot.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{lot.name}</CardTitle>
                        <Badge className={statusBadge}>{statusText}</Badge>
                      </div>
                      <CardDescription>{lot.distance}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Available Spots</p>
                            <p className={`text-2xl font-bold ${statusColor}`}>{lot.available}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total Capacity</p>
                            <p className="text-2xl font-bold">{lot.total}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Reserved</p>
                            <p className="text-2xl font-bold">{lot.reserved}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Capacity</p>
                          <Progress value={availablePercentage} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1 text-right">
                            {availablePercentage.toFixed(0)}% available
                          </p>
                        </div>
                        {reservationEnabled && <Button className="w-full">Reserve a Spot</Button>}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

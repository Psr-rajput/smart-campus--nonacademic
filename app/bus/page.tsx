"use client"

import { useState } from "react"
import { Bus, Clock, MapPin, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function BusPage() {
  const [selectedRoute, setSelectedRoute] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const busRoutes = [
    { id: "A", name: "Route A", color: "bg-red-500" },
    { id: "B", name: "Route B", color: "bg-blue-500" },
    { id: "C", name: "Route C", color: "bg-green-500" },
    { id: "D", name: "Route D", color: "bg-yellow-500" },
  ]

  const busStops = [
    { id: 1, name: "Main Gate", routes: ["A", "B", "C", "D"] },
    { id: 2, name: "Library", routes: ["A", "C"] },
    { id: 3, name: "Student Center", routes: ["A", "B", "D"] },
    { id: 4, name: "Engineering Building", routes: ["B", "C"] },
    { id: 5, name: "Sports Complex", routes: ["A", "D"] },
    { id: 6, name: "Dormitories", routes: ["A", "B", "C", "D"] },
    { id: 7, name: "Science Building", routes: ["B", "C"] },
    { id: 8, name: "Arts Center", routes: ["A", "D"] },
  ]

  const activeBuses = [
    { id: 1, route: "A", currentStop: "Main Gate", nextStop: "Library", eta: "2 min", capacity: "Low" },
    { id: 2, route: "A", currentStop: "Sports Complex", nextStop: "Dormitories", eta: "5 min", capacity: "Medium" },
    { id: 3, route: "B", currentStop: "Engineering Building", nextStop: "Science Building", eta: "3 min", capacity: "High" },
    { id: 4, route: "C", currentStop: "Library", nextStop: "Engineering Building", eta: "7 min", capacity: "Low" },
    { id: 5, route: "D", currentStop: "Arts Center", nextStop: "Student Center", eta: "4 min", capacity: "Medium" },
  ]

  const filteredBuses = selectedRoute === "all"
    ? activeBuses
    : activeBuses.filter(bus => bus.route === selectedRoute)

  const filteredStops: typeof busStops = selectedRoute === "all"
    ? busStops
    : busStops.filter(stop => stop.routes.includes(selectedRoute))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Bus Tracking</h2>
            <p className="text-muted-foreground">
              Track campus buses in real-time
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={selectedRoute} onValueChange={setSelectedRoute}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select route" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routes</SelectItem>
                {busRoutes.map(route => (
                  <SelectItem key={route.id} value={route.id}>
                    {route.name}
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

        <Tabs defaultValue="map" className="space-y-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Campus Bus Map</CardTitle>
                <CardDescription>Live locations of all campus buses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-md bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      Interactive map will be displayed here
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {busRoutes.map(route => (
                    <div key={route.id} className="flex items-center space-x-2">
                      <div className={`h-3 w-3 rounded-full ${route.color}`} />
                      <span className="text-sm">{route.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Active Buses</CardTitle>
                  <CardDescription>Currently operating buses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBuses.map(bus => (
                      <div key={bus.id} className="flex items-start space-x-4">
                        <div className={`mt-0.5 h-10 w-10 rounded-full flex items-center justify-center ${busRoutes.find(r => r.id === bus.route)?.color}`}>
                          <Bus className="h-5 w-5 text-white" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <p className="font-medium">Bus #{bus.id} - Route {bus.route}</p>
                            <Badge variant="outline" className="ml-2">{bus.capacity} Capacity</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Current: {bus.currentStop}</p>
                          <p className="text-sm text-muted-foreground">Next: {bus.nextStop} ({bus.eta})</p>
                        </div>
                      </div>
                    ))}
                    {filteredBuses.length === 0 && (
                      <p className="text-center text-muted-foreground py-4">
                        No active buses for the selected route
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bus Stops</CardTitle>
                  <CardDescription>All stops on campus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredStops.map(stop => (
                      <div key={stop.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{stop.name}</p>
                          <div className="flex space-x-1">
                            {stop.routes.map(routeId => (
                              <div
                                key={routeId}
                                className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium text-white ${busRoutes.find(r => r.id === routeId)?.color}`}
                              >
                                {routeId}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>
                            Next arrivals: {
                              filteredBuses
                                .filter(bus => bus.nextStop === stop.name)
                                .map(bus => `Route ${bus.route} (${bus.eta})`)
                                .join(", ") || "No upcoming buses"
                            }
                          </span>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bus List View</CardTitle>
                <CardDescription>
                  All active buses and their current status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBuses.map(bus => (
                    <Card key={bus.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${busRoutes.find(r => r.id === bus.route)?.color}`}>
                              <Bus className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                              <p className="font-medium">Bus #{bus.id} - Route {bus.route}</p>
                              <p className="text-sm text-muted-foreground">Current: {bus.currentStop}</p>
                              <p className="text-sm text-muted-foreground">Next: {bus.nextStop} ({bus.eta})</p>
                            </div>
                          </div>
                          <Badge variant="outline">{bus.capacity} Capacity</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bus Schedule</CardTitle>
                <CardDescription>Regular schedule for all campus bus routes</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="A" className="space-y-4">
                  <TabsList>
                    {busRoutes.map(route => (
                      <TabsTrigger key={route.id} value={route.id}>Route {route.id}</TabsTrigger>
                    ))}
                  </TabsList>
                  {busRoutes.map(route => (
                    <TabsContent key={route.id} value={route.id} className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Weekday Schedule</h3>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between"><span>First Bus</span><span>7:00 AM</span></div>
                            <div className="flex justify-between"><span>Last Bus</span><span>10:00 PM</span></div>
                            <div className="flex justify-between"><span>Frequency</span><span>Every 15 minutes</span></div>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-medium">Weekend Schedule</h3>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between"><span>First Bus</span><span>8:00 AM</span></div>
                            <div className="flex justify-between"><span>Last Bus</span><span>8:00 PM</span></div>
                            <div className="flex justify-between"><span>Frequency</span><span>Every 30 minutes</span></div>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-lg font-medium">Route Stops</h3>
                          <div className="mt-2 space-y-2">
                            {busStops
                              .filter(stop => stop.routes.includes(route.id))
                              .map(stop => (
                                <div key={stop.id} className="flex justify-between">
                                  <span>{stop.name}</span>
                                  <span className="text-muted-foreground">Stop #{stop.id}</span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

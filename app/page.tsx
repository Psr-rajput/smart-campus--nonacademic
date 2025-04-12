import { Bell, Bus, Calendar, Coffee, Flag, MapPin, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Canteen Queue</CardTitle>
                  <Coffee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5 min</div>
                  <p className="text-xs text-muted-foreground">Current wait time at Main Canteen</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Bus</CardTitle>
                  <Bus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3 min</div>
                  <p className="text-xs text-muted-foreground">Route A arriving at Main Gate</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Parking</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42 spots</div>
                  <p className="text-xs text-muted-foreground">Available in North Lot</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Events happening today</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Quick Access</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  <Link href="/canteen">
                    <Button variant="outline" className="h-24 w-full flex-col">
                      <Coffee className="mb-2 h-6 w-6" />
                      <span>Order Food</span>
                    </Button>
                  </Link>
                  <Link href="/issues">
                    <Button variant="outline" className="h-24 w-full flex-col">
                      <Flag className="mb-2 h-6 w-6" />
                      <span>Report Issue</span>
                    </Button>
                  </Link>
                  <Link href="/lost-found">
                    <Button variant="outline" className="h-24 w-full flex-col">
                      <Search className="mb-2 h-6 w-6" />
                      <span>Lost & Found</span>
                    </Button>
                  </Link>
                  <Link href="/bus">
                    <Button variant="outline" className="h-24 w-full flex-col">
                      <Bus className="mb-2 h-6 w-6" />
                      <span>Track Bus</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Notifications</CardTitle>
                  <CardDescription>You have 3 unread notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Badge className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 p-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Your food order is ready for pickup</p>
                        <p className="text-sm text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Badge className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 p-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Your issue report has been resolved</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Badge className="mt-0.5 h-2 w-2 rounded-full bg-blue-500 p-0" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">New event: Tech Symposium tomorrow</p>
                        <p className="text-sm text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events happening in the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">Tech Symposium {i}</p>
                          <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM • Main Auditorium</p>
                        </div>
                        <div className="ml-auto">
                          <Button variant="outline" size="sm">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Lost & Found</CardTitle>
                  <CardDescription>Recently reported items</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <img
                            src={`/placeholder.svg?height=40&width=40&text=Item${i}`}
                            alt={`Lost item ${i}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {i === 1 ? "Blue Water Bottle" : i === 2 ? "Black Laptop Bag" : "Silver Watch"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Found in {i === 1 ? "Library" : i === 2 ? "Cafeteria" : "Gym"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Your campus service usage over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Analytics dashboard coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>Your recent notifications from all services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?text=${i + 1}`} alt="Notification" />
                        <AvatarFallback>{i + 1}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i === 0
                            ? "Your food order is ready for pickup"
                            : i === 1
                              ? "Your issue report has been resolved"
                              : i === 2
                                ? "New event: Tech Symposium tomorrow"
                                : i === 3
                                  ? "Bus route A delayed by 5 minutes"
                                  : "Your lost item has been found"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {i === 0
                            ? "5 minutes ago"
                            : i === 1
                              ? "2 hours ago"
                              : i === 2
                                ? "Yesterday"
                                : i === 3
                                  ? "2 days ago"
                                  : "3 days ago"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

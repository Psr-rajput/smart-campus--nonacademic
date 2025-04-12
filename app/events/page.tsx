"use client"

import { useState } from "react"
import { Calendar, MapPin, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [congratulationVisible, setCongratulationVisible] = useState(false) // State for the congratulation card

  // Sample data for event categories
  const categories = [
    { id: "academic", name: "Academic" },
    { id: "social", name: "Social" },
    { id: "sports", name: "Sports" },
    { id: "cultural", name: "Cultural" },
    { id: "workshop", name: "Workshop" },
  ]

  // Sample data for events (added more events)
  const events = [
    {
      id: 1,
      title: "Tech Symposium",
      category: "academic",
      date: "2023-05-20",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium",
      description: "Annual technology symposium featuring guest speakers from leading tech companies.",
      organizer: "Computer Science Department",
      image: "/placeholder.svg?height=300&width=500&text=Tech+Symposium",
      attendees: 120,
    },
    {
      id: 2,
      title: "Spring Concert",
      category: "cultural",
      date: "2023-05-25",
      time: "7:00 PM - 10:00 PM",
      location: "Campus Amphitheater",
      description: "Annual spring concert featuring student bands and performers.",
      organizer: "Student Activities Board",
      image: "/placeholder.svg?height=300&width=500&text=Spring+Concert",
      attendees: 250,
    },
    {
      id: 3,
      title: "Basketball Tournament",
      category: "sports",
      date: "2023-05-27",
      time: "9:00 AM - 6:00 PM",
      location: "Sports Complex",
      description: "Inter-department basketball tournament with prizes for winners.",
      organizer: "Sports Committee",
      image: "/placeholder.svg?height=300&width=500&text=Basketball+Tournament",
      attendees: 180,
    },
    {
      id: 4,
      title: "Career Fair",
      category: "academic",
      date: "2023-06-02",
      time: "10:00 AM - 3:00 PM",
      location: "Student Center",
      description: "Connect with potential employers and explore career opportunities.",
      organizer: "Career Services",
      image: "/placeholder.svg?height=300&width=500&text=Career+Fair",
      attendees: 300,
    },
    {
      id: 5,
      title: "Movie Night",
      category: "social",
      date: "2023-06-05",
      time: "8:00 PM - 11:00 PM",
      location: "Outdoor Quad",
      description: "Outdoor movie screening with free popcorn and refreshments.",
      organizer: "Residence Life",
      image: "/placeholder.svg?height=300&width=500&text=Movie+Night",
      attendees: 150,
    },
    {
      id: 6,
      title: "AI Workshop",
      category: "workshop",
      date: "2023-06-10",
      time: "1:00 PM - 5:00 PM",
      location: "Engineering Building",
      description: "Hands-on workshop on artificial intelligence and machine learning.",
      organizer: "AI Research Group",
      image: "/placeholder.svg?height=300&width=500&text=AI+Workshop",
      attendees: 80,
    },
    {
      id: 7,
      title: "Hackathon 2023",
      category: "academic",
      date: "2023-06-15",
      time: "9:00 AM - 9:00 PM",
      location: "Engineering Building",
      description: "24-hour hackathon with exciting prizes and challenges for developers.",
      organizer: "Computer Science Society",
      image: "/placeholder.svg?height=300&width=500&text=Hackathon+2023",
      attendees: 200,
    },
    {
      id: 8,
      title: "Yoga Retreat",
      category: "social",
      date: "2023-06-18",
      time: "8:00 AM - 2:00 PM",
      location: "Campus Gardens",
      description: "A day of relaxation and mindfulness through yoga and meditation.",
      organizer: "Wellness Club",
      image: "/placeholder.svg?height=300&width=500&text=Yoga+Retreat",
      attendees: 100,
    },
  ]

  const filteredEvents = events.filter(
    (event) =>
      (categoryFilter === "all" || event.category === categoryFilter) &&
      (searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // RSVP function to show congratulation card
  const handleRSVP = () => {
    setCongratulationVisible(true)
    setTimeout(() => {
      setCongratulationVisible(false) // Hide the congratulation card after 3 seconds
    }, 3000)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex flex-col items-start justify-between space-y-2 md:flex-row md:items-center md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Events</h2>
            <p className="text-muted-foreground">Discover and RSVP to campus events</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge>{categories.find((c) => c.id === event.category)?.name}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          {event.date} • {event.time}
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    <div className="mt-4">
                      <p className="text-sm font-medium">Organized by:</p>
                      <p className="text-sm text-muted-foreground">{event.organizer}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium">{event.attendees} attending</p>
                      <div className="flex -space-x-2 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={`/placeholder.svg?text=${i + 1}`} />
                            <AvatarFallback>{i + 1}</AvatarFallback>
                          </Avatar>
                        ))}
                        {event.attendees > 5 && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                            +{event.attendees - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" onClick={handleRSVP}>
                      RSVP
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              {filteredEvents.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No events found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Try adjusting your search or filter to find events.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Congratulation Card */}
        {congratulationVisible && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-80 p-4 bg-green-600 text-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">🎉 RSVP Confirmed!</h3>
            <p>You have successfully joined the event!</p>
          </div>
        )}
      </div>
    </div>
  )
}

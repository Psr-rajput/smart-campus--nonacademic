"use client"

import type React from "react"

import { useState } from "react"
import { Camera, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function IssuesPage() {
  const { toast } = useToast()
  const [issueType, setIssueType] = useState("maintenance")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [priority, setPriority] = useState("medium")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Issue reported successfully",
        description: "Your issue has been submitted and will be addressed soon.",
      })
      setIsSubmitting(false)
      setIssueType("maintenance")
      setLocation("")
      setDescription("")
      setImage(null)
      setImagePreview(null)
      setPriority("medium")
    }, 1500)
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Issue Reporting</h2>
          <p className="text-muted-foreground">Report maintenance, cleanliness, or other campus issues</p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Report an Issue</CardTitle>
            <CardDescription>Fill out the form below to report an issue on campus</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="issue-type">Issue Type</Label>
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="cleanliness">Cleanliness</SelectItem>
                    <SelectItem value="safety">Safety Hazard</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    placeholder="Building/Room/Area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                    <span className="sr-only">Use current location</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (Optional)</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 relative">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <div className="w-full">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-md object-contain"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          setImage(null)
                          setImagePreview(null)
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click or drag and drop to upload an image</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <RadioGroup value={priority} onValueChange={setPriority} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Pencil, Save, Upload, X } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getUserProfile, updateUserProfile } from "@/lib/user-profile"
import { collegeTeams } from "@/lib/college-teams"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ProfilePage() {
  const initialProfile = getUserProfile()
  const [profile, setProfile] = useState(initialProfile)

  // Track which fields are being edited
  const [editing, setEditing] = useState({
    displayName: false,
    team: false,
    email: false,
    bio: false,
  })

  // Temporary values while editing
  const [tempValues, setTempValues] = useState({
    displayName: initialProfile.userName,
    team: initialProfile.teamName,
    email: initialProfile.email,
    bio: initialProfile.bio,
  })

  // Handle avatar upload
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)
      setProfile({
        ...profile,
        avatarUrl: imageUrl,
      })
      updateUserProfile({
        ...profile,
        avatarUrl: imageUrl,
      })
    }
  }

  // Toggle edit mode for a field
  const toggleEdit = (field: keyof typeof editing) => {
    setEditing({
      ...editing,
      [field]: !editing[field],
    })

    // Reset temp value if canceling edit
    if (editing[field]) {
      setTempValues({
        ...tempValues,
        [field]:
          field === "displayName"
            ? profile.userName
            : field === "team"
              ? profile.teamName
              : field === "email"
                ? profile.email
                : profile.bio,
      })
    }
  }

  // Save changes for a field
  const saveField = (field: keyof typeof editing) => {
    const updatedProfile = { ...profile }

    if (field === "displayName") {
      updatedProfile.userName = tempValues.displayName
    } else if (field === "team") {
      updatedProfile.teamName = tempValues.team
    } else if (field === "email") {
      updatedProfile.email = tempValues.email
    } else if (field === "bio") {
      updatedProfile.bio = tempValues.bio
    }

    setProfile(updatedProfile)
    updateUserProfile(updatedProfile)

    setEditing({
      ...editing,
      [field]: false,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={profile.userName} />
                <AvatarFallback className="text-3xl">{profile.userName.charAt(0)}</AvatarFallback>
              </Avatar>

              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 bg-[#e4002b] text-white px-4 py-2 rounded-md hover:bg-[#c00026] transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>Upload New Picture</span>
                </div>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </Label>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Display Name */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Button variant="ghost" size="sm" onClick={() => toggleEdit("displayName")}>
                    {editing.displayName ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </Button>
                </div>

                {editing.displayName ? (
                  <div className="flex gap-2">
                    <Input
                      id="display-name"
                      value={tempValues.displayName}
                      onChange={(e) => setTempValues({ ...tempValues, displayName: e.target.value })}
                    />
                    <Button onClick={() => saveField("displayName")} className="bg-[#e4002b] hover:bg-[#c00026]">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">{profile.userName}</div>
                )}
              </div>

              {/* Favorite Team */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="favorite-team">Favorite Team</Label>
                  <Button variant="ghost" size="sm" onClick={() => toggleEdit("team")}>
                    {editing.team ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </Button>
                </div>

                {editing.team ? (
                  <div className="flex gap-2">
                    <Select
                      value={tempValues.team}
                      onValueChange={(value) => setTempValues({ ...tempValues, team: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                      <SelectContent>
                        {collegeTeams.map((team) => (
                          <SelectItem key={team} value={team}>
                            {team}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => saveField("team")} className="bg-[#e4002b] hover:bg-[#c00026]">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">{profile.teamName}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Button variant="ghost" size="sm" onClick={() => toggleEdit("email")}>
                    {editing.email ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </Button>
                </div>

                {editing.email ? (
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={tempValues.email}
                      onChange={(e) => setTempValues({ ...tempValues, email: e.target.value })}
                    />
                    <Button onClick={() => saveField("email")} className="bg-[#e4002b] hover:bg-[#c00026]">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">{profile.email}</div>
                )}
              </div>

              {/* Bio */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Button variant="ghost" size="sm" onClick={() => toggleEdit("bio")}>
                    {editing.bio ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                  </Button>
                </div>

                {editing.bio ? (
                  <div className="space-y-2">
                    <Textarea
                      id="bio"
                      value={tempValues.bio}
                      onChange={(e) => setTempValues({ ...tempValues, bio: e.target.value })}
                      rows={5}
                    />
                    <Button onClick={() => saveField("bio")} className="bg-[#e4002b] hover:bg-[#c00026]">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50 min-h-[100px] whitespace-pre-wrap">
                    {profile.bio || "No bio provided."}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-[#0a0a0a] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} College Football Reporter
        </div>
      </footer>
    </div>
  )
}

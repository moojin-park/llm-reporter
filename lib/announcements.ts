// This file simulates an announcements service
// In a real application, this would fetch data from an API

export interface Announcement {
  id: string
  title: string
  date: string
  content: string
}

// Mock announcements data
const announcementsData: Announcement[] = [
  {
    id: "1",
    title: "New Feature: Player Statistics Tracking",
    date: "2025-05-08T12:00:00Z",
    content:
      "We're excited to announce our new player statistics tracking feature! Now you can track individual player stats across all games and generate comprehensive reports.",
  },
  {
    id: "2",
    title: "Upcoming Maintenance",
    date: "2025-05-05T12:00:00Z",
    content:
      "College Football Reporter will be undergoing scheduled maintenance on May 15th from 2:00 AM to 4:00 AM EST. The site may be temporarily unavailable during this time.",
  },
  {
    id: "3",
    title: "2025 Season Registration Open",
    date: "2025-04-28T12:00:00Z",
    content:
      "Registration for the 2025 college football season is now open! Create your leagues and invite friends to join before the season starts.",
  },
]

// Get all announcements
export function getAnnouncements(): Announcement[] {
  return [...announcementsData]
}

// Get a specific announcement
export function getAnnouncement(id: string): Announcement | undefined {
  return announcementsData.find((announcement) => announcement.id === id)
}

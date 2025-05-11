// This file simulates a user profile service
// In a real application, this would fetch data from an API or authentication service

export interface UserProfile {
  teamName: string
  userName: string
  avatarUrl: string
  email: string
  bio: string
  // Other user profile data would go here
}

// Simulate user profile storage
let userProfileData: UserProfile = {
  teamName: "Florida State Seminoles",
  userName: "John Doe",
  avatarUrl: "/placeholder.svg?height=200&width=200",
  email: "john.doe@example.com",
  bio: "College football enthusiast and Florida State fan since 2005. I've been to every home game for the past 10 years and love tracking player stats.",
}

// Simulate if user is logged in
// In a real app, this would check authentication state
let _isUserLoggedIn = true // Set to false to see the non-logged in view

// Callback to notify components of login state changes
let onLoginStateChange: (() => void) | null = null

// Register callback for login state changes
export function registerLoginStateCallback(callback: () => void) {
  onLoginStateChange = callback
}

// Simulate fetching the user profile
export function getUserProfile(): UserProfile {
  // In a real app, this would be an API call or context lookup
  return { ...userProfileData }
}

// Simulate updating the user profile
export function updateUserProfile(profile: UserProfile): void {
  // In a real app, this would be an API call
  userProfileData = { ...profile }
  console.log("Profile updated:", userProfileData)
}

// Check if user is logged in
export function isUserLoggedIn(): boolean {
  return _isUserLoggedIn
}

// Toggle login state (for demo purposes)
export function toggleLoginState(): void {
  _isUserLoggedIn = !_isUserLoggedIn
}

// Sign out function
export function signOut(): void {
  _isUserLoggedIn = false
  // Notify components of the state change
  if (onLoginStateChange) {
    onLoginStateChange()
  }
  // In a real app, this would also:
  // - Clear any auth tokens
  // - Clear any user data from localStorage/sessionStorage
  // - Call the backend to invalidate the session
}

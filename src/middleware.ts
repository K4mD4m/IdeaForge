export { default } from "next-auth/middleware"

// Configure which routes require authentication
export const config = {
    matcher: ["/submit", "/profile"],
}

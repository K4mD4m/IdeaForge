import { SessionProvider } from "next-auth/react"


// Root layout component wrapping the app with NextAuth's SessionProvider
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}


'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export const Navbar = () => {
    const { data: session } = useSession()

    return (
        <nav className="w-full px-6 py-4 flex justify-between items-center border-b bg-white shadow-sm">
            {/* Left side - Branding */}
            <div className="flex items-center space-x-6">
                <Link href="/" className="text-xl font-bold text-gray-800 hover:text-black transition">
                    IdeaForge
                </Link>
                <div className="hidden md:flex space-x-4">
                    <Link href="/ideas" className="text-sm font-medium text-gray-600 hover:text-black transition">
                        Explore Ideas
                    </Link>
                    {session && (
                        <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-black transition">
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>

            {/* Right side - Auth */}
            <div className="flex items-center space-x-4">
                {!session ? (
                    <Button variant="outline" onClick={() => signIn()}>
                        Login
                    </Button>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage src={session.user?.image ?? ''} />
                                <AvatarFallback>{session.user?.name?.charAt(0) ?? 'U'}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">Dashboard</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </nav>
    )
}

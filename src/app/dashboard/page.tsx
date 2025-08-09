'use client'

import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function DashboardPage() {
    const { data: session } = useSession()

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-6 pt-28 pb-16">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center md:flex-row md:items-center md:gap-10"
                >
                    <Card className="bg-[#1f1f2e]/80 backdrop-blur border border-white/5 shadow-xl w-full md:w-1/3">
                        <CardContent className="flex flex-col items-center md:items-start p-8">
                            <Avatar className="h-24 w-24 mb-4 ring-4 ring-purple-500/30">
                                <AvatarImage src={session?.user?.image || ''} />
                                <AvatarFallback>
                                    {session?.user?.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold text-white tracking-tight">
                                {session?.user?.name || 'User'}
                            </h2>
                            <p className="text-gray-400 text-sm mb-6">
                                {session?.user?.email || 'No email provided'}
                            </p>
                            <Link href="/ideas/new" className="w-full md:w-auto">
                                <Button className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white text-sm px-6 py-2 rounded-lg shadow-lg cursor-pointer">
                                    Add Idea
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Greeting / Info */}
                    <div className="text-center md:text-left mt-8 md:mt-0 max-w-lg">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Welcome back, {session?.user?.name?.split(' ')[0] || 'Creator'}!
                        </h1>
                        <p className="text-gray-400 leading-relaxed">
                            Your personal hub for creating, managing, and sharing ideas.
                            Add new projects, explore your creativity, and inspire others.
                        </p>
                    </div>
                </motion.div>

                {/* My Ideas Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold mb-6">My Ideas</h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Example Idea Card */}
                        <Card className="bg-[#1f1f2e]/80 border border-white/5 shadow-lg hover:shadow-purple-500/10 transition">
                            <CardContent className="p-6">
                                <h4 className="text-lg font-semibold mb-2 text-white">Idea Title</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Short description of the idea...
                                </p>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Category</span>
                                    <span>0 Likes</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Empty state */}
                        <div className="col-span-full text-center text-gray-500 text-sm">
                            No ideas yet. Click &quot;Add Idea&quot; to get started.
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    )
}


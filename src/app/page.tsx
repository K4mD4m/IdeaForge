"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Users, Rocket, ArrowDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function HomePage() {

  // Scroll to top on page load- fixed bug with entering site
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#111122] to-[#1a1a2e] text-gray-200">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#2d1b4e] animate-gradient" />
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,0,150,0.1),transparent_70%)] animate-pulse" />

        <h1 className="relative text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Ignite Your Creative Potential
        </h1>
        <p className="relative text-xl md:text-2xl text-gray-300 max-w-3xl mb-10">
          Connect, collaborate, and bring groundbreaking ideas to life with the support of a thriving global network.
        </p>
        <div className="relative flex flex-col sm:flex-row gap-4">
          <Link href="/ideas">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white cursor-pointer px-8 py-4 text-lg w-full sm:w-auto">
              Explore Ideas
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="lg" className="bg-cyan-400 hover:bg-cyan-500 text-black cursor-pointer px-8 py-4 text-lg w-full sm:w-auto">
              Submit Your Idea
            </Button>
          </Link>
        </div>

        {/* Bouncing Arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-6 text-cyan-400"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </motion.section>

      {/* Video Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative px-6 py-20 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f] flex flex-col md:flex-row items-center gap-12"
      >
        {/* Video */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 rounded-2xl overflow-hidden shadow-lg"
        >
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/creativity.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From Concept to Impact
          </h2>
          <p className="text-gray-400 mb-6">
            Transform sparks of inspiration into real-world projects with access to tools, insights, and an active creative network.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white cursor-pointer">
              Start Creating
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Lightbulb, title: "Fresh Perspectives", text: "Get inspired by projects from all over the world and discover new possibilities.", color: "text-purple-400" },
            { icon: Users, title: "Grow Together", text: "Collaborate with skilled creators, exchange feedback, and refine your ideas.", color: "text-cyan-400" },
            { icon: Rocket, title: "Launch Boldly", text: "Access the resources and confidence needed to turn concepts into reality.", color: "text-pink-400" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#1f1f33] border-none shadow-lg hover:scale-[1.02] transition-transform">
                <CardHeader>
                  <feature.icon className={`w-10 h-10 mb-2 ${feature.color}`} />
                  <CardTitle className="text-gray-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400">{feature.text}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collaboration Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="px-6 py-20 bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f] flex flex-col md:flex-row items-center gap-12"
      >
        {/* Text (left side) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 text-center md:text-right"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Collaborate Without Limits
          </h2>
          <p className="text-gray-400 mb-6">
            Build teams, share skills, and accelerate your projects with people as passionate as you are.
          </p>
          <Link href="/ideas">
            <Button size="lg" className="bg-cyan-400 hover:bg-cyan-500 text-black cursor-pointer">
              Discover Projects
            </Button>
          </Link>
        </motion.div>

        {/* Video (right side, same styling as first video section) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1 rounded-2xl overflow-hidden shadow-lg"
        >
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/collaboration.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.section>


      {/* How It Works */}
      <section className="px-6 py-20 bg-gradient-to-r from-[#161622] to-[#1d1d35]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            How It Works
          </motion.h2>
          <p className="text-gray-400">From idea to launch in three simple steps.</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { num: 1, title: "Share Your Idea", desc: "Post your concept and show the world your vision.", color: "bg-purple-500" },
            { num: 2, title: "Gather Feedback", desc: "Get insights and suggestions from creative minds.", color: "bg-cyan-500" },
            { num: 3, title: "Bring It to Life", desc: "Use the tools and support to make it real.", color: "bg-pink-500" }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-full ${step.color} text-white text-xl font-bold mx-auto mb-4`}>
                {step.num}
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-6 py-20 bg-gradient-to-r from-[#1a1a2e] to-[#0a0a0f] border-t border-purple-500/40 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to Launch Your Idea?
        </h2>
        <p className="mb-8 text-gray-400 max-w-2xl mx-auto">
          Join now and start building with a community that believes in your vision.
        </p>
        <Link href="/submit">
          <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white cursor-pointer px-8 py-4 text-lg">
            Get Started
          </Button>
        </Link>
      </motion.section>
    </main>
  )
}



export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gray-50">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Welcome to IdeaForge
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-6">
        A platform to share, discover, and bring ideas to life. Explore innovative concepts or post your own!
      </p>
      <a
        href="/ideas"
        className="inline-block px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
      >
        Explore Ideas
      </a>
    </main>
  )
}


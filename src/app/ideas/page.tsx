"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Idea = {
  id: string;
  title: string;
  description: string;
  category?: string | null;
  tags?: string[];
  createdById?: string;
  published?: boolean;
  upvotes?: number;
  commentsCount?: number;
  createdBy?: { id: string; name: string; image?: string | null };
};

const categories = ["Tech", "Marketing", "Design", "Business", "Other"];
const popularityFilters = [
  { id: "most-liked", label: "Most Liked" },
  { id: "most-commented", label: "Most Commented" },
];

export default function IdeasWall() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "popularity" | "category"
  >("all");
  const [activePopularity, setActivePopularity] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  function handleSelectFilter(
    type: "all" | "popularity" | "category",
    value?: string,
  ) {
    setActiveFilter(type);
    if (type === "popularity") {
      setActivePopularity(value || null);
      setActiveCategory(null);
    } else if (type === "category") {
      setActiveCategory(value || null);
      setActivePopularity(null);
    } else {
      setActivePopularity(null);
      setActiveCategory(null);
    }
  }

  const sortedIdeas = (() => {
    if (activeFilter === "popularity" && activePopularity === "most-liked") {
      // Sort by upvotes descending
      return [...ideas].sort((a, b) => (b.upvotes ?? 0) - (a.upvotes ?? 0));
    }
    if (
      activeFilter === "popularity" &&
      activePopularity === "most-commented"
    ) {
      // Sort by commentsCount descending
      return [...ideas].sort(
        (a, b) => (b.commentsCount ?? 0) - (a.commentsCount ?? 0),
      );
    }
    if (activeFilter === "category" && activeCategory) {
      // Filter by category
      return ideas.filter((idea) => idea.category === activeCategory);
    }
    // Default: no sorting/filtering
    return ideas;
  })();

  useEffect(() => {
    async function fetchIdeas() {
      setLoading(true);
      try {
        const res = await fetch("/api/ideas/public");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to fetch ideas");
        setIdeas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchIdeas();
  }, []);

  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-4 sm:px-6 lg:px-8 pt-24 pb-16 max-w-7xl mx-auto">
      {/* Sticky Filters Bar */}
      <motion.div
        className="sticky top-16 z-50 bg-[#12121c]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-md py-3 px-4 sm:px-5 flex flex-wrap gap-3 justify-center md:justify-start mb-8 max-w-full overflow-x-auto no-scrollbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* All */}
        <FilterButton
          active={activeFilter === "all"}
          onClick={() => handleSelectFilter("all")}
        >
          All Ideas
        </FilterButton>

        {/* Popularity group */}
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <span className="text-gray-400 uppercase tracking-widest text-xs font-semibold select-none">
            Popularity:
          </span>
          {popularityFilters.map(({ id, label }) => (
            <FilterButton
              key={id}
              active={activeFilter === "popularity" && activePopularity === id}
              onClick={() => handleSelectFilter("popularity", id)}
            >
              {label}
            </FilterButton>
          ))}
        </div>

        {/* Categories group */}
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <span className="text-gray-400 uppercase tracking-widest text-xs font-semibold select-none">
            Categories:
          </span>
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              active={activeFilter === "category" && activeCategory === cat}
              onClick={() => handleSelectFilter("category", cat)}
            >
              {cat}
            </FilterButton>
          ))}
        </div>
      </motion.div>

      {/* Ideas Grid */}
      {loading ? (
        <div className="col-span-full flex justify-center items-center py-16">
          <span className="text-gray-400 text-lg animate-pulse">
            Loading ideas...
          </span>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedIdeas.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No ideas found.
            </p>
          ) : (
            sortedIdeas.map((idea) => (
              <motion.article
                key={idea.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.05 * ideas.indexOf(idea),
                }}
                className="bg-[#1f1f2e]/90 rounded-xl border border-white/10 shadow-lg p-6 flex flex-col justify-between hover:scale-[1.03] hover:shadow-purple-600/40 transition-transform duration-300 cursor-pointer"
                aria-label={`Idea: ${idea.title}`}
              >
                <h3 className="text-xl font-semibold mb-2 leading-tight line-clamp-2">
                  {idea.title}
                </h3>
                <p className="text-gray-300 flex-grow mb-4 line-clamp-4">
                  {idea.description}
                </p>
                <div className="flex flex-wrap justify-between items-center text-xs text-gray-400 font-medium tracking-wide gap-2">
                  <span className="uppercase bg-purple-700/20 rounded-full px-3 py-1 select-none whitespace-nowrap">
                    {idea.category ?? "Uncategorized"}
                  </span>
                  <div className="flex gap-4">
                    <Stat icon="👍" label={`${idea.upvotes ?? 0}`} />
                    <Stat icon="💬" label={`${idea.commentsCount ?? 0}`} />
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </section>
      )}
    </main>
  );
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-colors duration-300 select-none
        ${
          active
            ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/50"
            : "bg-transparent text-gray-400 border-gray-600 hover:bg-purple-700 hover:text-white"
        }`}
      aria-pressed={active}
      type="button"
    >
      {children}
    </motion.button>
  );
}

function Stat({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-1 select-none text-sm text-gray-300">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

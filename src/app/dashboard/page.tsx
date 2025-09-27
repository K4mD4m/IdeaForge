"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

// Define the Idea type
type Idea = {
  id: string;
  title: string;
  description: string;
  category?: string | null;
  tags?: string[];
  createdById?: string;
  published?: boolean;
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const userId = session?.user?.id ?? "";
  const emailVerified = !!session?.user?.emailVerified;

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Define the state for ideas
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define the state for editing and creating ideas
  const [editing, setEditing] = useState<Idea | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Define the state for the form inputs
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    published: false,
  });

  // Helper function to safely parse JSON responses
  async function safeJson(res: Response) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  // Fetch ideas from the server (fixed)
  const fetchIdeas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ideas");
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data?.error || "Failed to fetch ideas");
      const my = (data as Idea[]).filter((i) => i.createdById === userId);
      setIdeas(my);
    } catch (err: unknown) {
      setError((err as Error).message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  // Handle idea delete
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this idea?")) return;
    try {
      const res = await fetch(`/api/ideas/${id}`, { method: "DELETE" });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data?.error || "Delete failed");
      setIdeas((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      alert("Delete error: " + (err as Error).message || err);
    }
  }

  // Handle idea save
  async function saveIdea(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const isEdit = !!editing;
      const url = isEdit ? `/api/ideas/${editing!.id}` : "/api/ideas";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category || null,
          tags: [],
          published: emailVerified ? form.published : false, // wymuszenie blokady
        }),
      });
      const data = await safeJson(res);
      if (!res.ok) throw new Error(data?.error || "Save failed");

      if (isEdit) {
        setIdeas((prev) => prev.map((it) => (it.id === data.id ? data : it)));
        setEditing(null);
      } else {
        setIdeas((prev) => [...prev, data]);
        setCreating(false);
      }
      setForm({ title: "", description: "", category: "", published: false });
    } catch (err: unknown) {
      alert("Save error: " + (err as Error).message || err);
    } finally {
      setSaving(false);
    }
  }

  // Open create idea modal
  function openCreate() {
    setForm({ title: "", description: "", category: "", published: false });
    setCreating(true);
  }

  // Open edit idea modal
  function openEdit(idea: Idea) {
    setForm({
      title: idea.title,
      description: idea.description,
      category: idea.category ?? "",
      published: idea.published ?? false,
    });
    setEditing(idea);
  }

  // Close modal
  function closeModal() {
    setCreating(false);
    setEditing(null);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0f] to-[#1a1a2e] text-white px-6 pt-28 pb-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:flex-row md:items-center md:gap-10"
        >
          <Card className="bg-[#1f1f2e]/80 backdrop-blur border border-white/5 shadow-xl w-full md:w-1/3">
            <CardContent className="flex flex-col items-center md:items-start p-8">
              <Avatar className="h-24 w-24 mb-4 ring-4 ring-purple-500/30">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl text-white font-bold tracking-tight">
                {session?.user?.name || "User"}
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                {session?.user?.email || "No email provided"}
              </p>
              <Button
                onClick={openCreate}
                className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white text-sm px-6 py-2 rounded-lg shadow-lg cursor-pointer"
              >
                Add Idea
              </Button>
            </CardContent>
          </Card>
          <div className="text-center md:text-left mt-8 md:mt-0 max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome back, {session?.user?.name?.split(" ")[0] || "Creator"}!
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Your personal hub for creating and managing ideas. Only you can
              see drafts here — publish them when ready.
            </p>
          </div>
        </motion.div>

        {/* My Ideas */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">My Ideas</h3>
            <div className="text-sm text-gray-400">
              {loading ? "Loading…" : `${ideas.length} ideas`}
            </div>
          </div>

          {error && <div className="mb-4 text-red-400">{error}</div>}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.length === 0 && !loading ? (
              <div className="col-span-full text-center text-gray-500 text-sm">
                No ideas yet. Click &quot;Add Idea&quot; to get started.
              </div>
            ) : (
              ideas.map((idea) => (
                <Card
                  key={idea.id}
                  className="bg-[#1f1f2e]/80 border border-white/5 shadow-lg hover:shadow-purple-500/10 transition"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg text-white font-semibold">
                        {idea.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="cursor-pointer"
                          variant="outline"
                          onClick={() => openEdit(idea)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="cursor-pointer"
                          variant="destructive"
                          onClick={() => handleDelete(idea.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {idea.description}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{idea.category ?? "No category"}</span>
                      <span>{idea.published ? "Published" : "Draft"}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </motion.section>
      </div>

      {/* Modal for Create/Edit */}
      {(creating || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.18 }}
            onSubmit={saveIdea}
            className="w-full max-w-2xl bg-[#0f1116] rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">
              {editing ? "Edit idea" : "Add new idea"}
            </h3>

            <label className="block text-sm text-gray-300 mb-2">Title</label>
            <input
              className="w-full mb-3 rounded-md bg-[#1b1b26] border border-white/6 px-3 py-2 text-white"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <label className="block text-sm text-gray-300 mb-2">
              Description
            </label>
            <textarea
              className="w-full mb-3 rounded-md bg-[#1b1b26] border border-white/6 px-3 py-2 text-white min-h-[120px]"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <label className="block text-sm text-gray-300 mb-2">
              Category (optional)
            </label>
            <input
              className="w-full mb-4 rounded-md bg-[#1b1b26] border px-3 py-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            {/* Publish toggle */}
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.published}
                disabled={!emailVerified}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
              />
              <span className={!emailVerified ? "text-gray-500" : ""}>
                Publish idea {!emailVerified && "(Verify email to enable)"}
              </span>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm cursor-pointer"
                onClick={closeModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-400 text-white cursor-pointer"
                disabled={saving}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </main>
  );
}

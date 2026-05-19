import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h1 className="text-2xl font-bold">Public Chat</h1>

        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white hover:text-black transition"
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className="px-4 py-2 rounded-lg bg-white text-black hover:opacity-90 transition"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h2 className="text-5xl md:text-6xl font-extrabold max-w-3xl leading-tight">
          Chat Publicly With Everyone Instantly
        </h2>

        <p className="mt-6 text-white/70 max-w-xl text-lg">
          Public Chat is a simple real-time chat platform where everyone can
          connect, talk, and share messages together.
        </p>

        <div className="flex items-center gap-4 mt-10">
          <Link
            href="/sign-up"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Get Started
          </Link>

          <Link
            href="/sign-in"
            className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  )
}

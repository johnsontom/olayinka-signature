"use client"

import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"

import { auth } from "../../firebase/config"

export default function AdminLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      router.push("/admin/dashboard")
    } catch (error) {
      alert("Invalid login credentials")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-10">
        <h1 className="text-4xl font-black text-center text-pink-600 mb-3">
          Admin Login
        </h1>

        <p className="text-center text-zinc-500 mb-8">
          Olayinka Signature Dashboard
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full bg-pink-50 border border-pink-200 rounded-2xl p-4 outline-none text-zinc-900 placeholder:text-zinc-400 focus:border-pink-500 transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-pink-50 border border-pink-200 rounded-2xl p-4 outline-none text-zinc-900 placeholder:text-zinc-400 focus:border-pink-500 transition"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-full font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  )
}
"use client"

import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isHome = pathname === "/"

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-pink-100 shadow-xl rounded-full px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="/"
          className="flex items-center gap-4"
        >
          <img
            src="/logo.png"
            alt="Olayinka Signature"
            className="w-32 h-32 object-contain scale-150 -my-6"
          />

          <div className="hidden md:block">
            <h1 className="text-xl font-black text-pink-600 leading-none">
              Olayinka Signature
            </h1>

            <p className="text-xs tracking-[0.3em] text-zinc-500 mt-1">
              LUXURY WIGS & HAIR
            </p>
          </div>
        </a>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-700">

          <a
            href="/collection"
            className="hover:text-pink-500 transition"
          >
            Collection
          </a>

          {isHome && (
            <>
              <a
                href="#videos"
                className="hover:text-pink-500 transition"
              >
                Videos
              </a>

              <a
                href="#about"
                className="hover:text-pink-500 transition"
              >
                About
              </a>
            </>
          )}
        </nav>

        {/* CTA */}
        <a
          href="https://wa.me/+447383459585"
          target="_blank"
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition shadow-lg shadow-pink-200"
        >
          Contact
        </a>
      </div>
    </header>
  )
}
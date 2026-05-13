"use client"

import { useEffect, useState } from "react"

import { collection, getDocs } from "firebase/firestore"

import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"

import { db } from "../firebase/config"

export default function CollectionPage() {
  const [wigs, setWigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] =
  useState("")

const [showFeatured, setShowFeatured] =
  useState(false)

const [showInStock, setShowInStock] =
  useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(
        collection(db, "products")
      )

      const products = querySnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      )

      setWigs(products)

      setLoading(false)
    }

    fetchProducts()
  }, [])

const filteredWigs = wigs.filter(
  (wig) => {

    const matchesSearch =
      wig.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )

    const matchesFeatured =
      showFeatured
        ? wig.featured
        : true

    const matchesStock =
      showInStock
        ? wig.inStock
        : true

    return (
      matchesSearch &&
      matchesFeatured &&
      matchesStock
    )
  }
)

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 text-zinc-900">

      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.4em] text-pink-500 text-sm mb-4 font-semibold">
              Full Collection
            </p>

            <h1 className="text-5xl md:text-6xl font-black mb-6">
              Luxury Wig Collection
            </h1>

            <p className="max-w-2xl mx-auto text-zinc-600 text-lg">
              Explore our complete collection of luxury wigs designed for elegance, beauty, and confidence.
            </p>
          </div>

<div className="mb-12 space-y-6">

  <input
    type="text"
    placeholder="Search wigs..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full bg-white border border-pink-100 rounded-2xl p-5 outline-none text-zinc-900 shadow-lg"
  />

  <div className="flex flex-wrap gap-4">

    <button
      onClick={() =>
        setShowFeatured(
          !showFeatured
        )
      }
      className={`px-6 py-3 rounded-full font-semibold transition ${
        showFeatured
          ? "bg-pink-600 text-white"
          : "bg-white text-zinc-700"
      }`}
    >
      Featured
    </button>

    <button
      onClick={() =>
        setShowInStock(
          !showInStock
        )
      }
      className={`px-6 py-3 rounded-full font-semibold transition ${
        showInStock
          ? "bg-pink-600 text-white"
          : "bg-white text-zinc-700"
      }`}
    >
      In Stock
    </button>

  </div>
</div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-white rounded-[2rem] overflow-hidden shadow-xl"
                >
                  <div className="h-[420px] bg-pink-100" />

                  <div className="p-7 space-y-4">
                    <div className="h-6 bg-pink-100 rounded w-2/3" />
                    <div className="h-4 bg-pink-100 rounded w-1/2" />
                    <div className="h-4 bg-pink-100 rounded w-1/3" />

                    <div className="h-12 bg-pink-200 rounded-full mt-6" />
                  </div>
                </div>
              ))
            ) : (
              filteredWigs.map((wig) => (
                <ProductCard
                  key={wig.id}
                  name={wig.name}
                  price={wig.price}
                  length={wig.length}
                  colour={wig.colour}
                  image={wig.image}
                  inStock={wig.inStock}
                  featured={wig.featured}
                />
              ))
            )}

          </div>
        </div>
      </section>
    </main>
  )
}
"use client"

import { useEffect, useState } from "react"
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore"

import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"


import { db, auth } from "../../firebase/config"

export default function DashboardPage() {
  const router = useRouter()
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {
      if (!user) {
        router.push("/admin/login")
      }
    }
  )

  return () => unsubscribe()
}, [])

  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "products")
    )

    const productList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setProducts(productList)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Delete this product?"
    )

    if (!confirmDelete) return

    try {
      await deleteDoc(doc(db, "products", id))
      fetchProducts()
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/admin/login")
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div>
            <h1 className="text-6xl font-black">
              Admin Dashboard
            </h1>

            <p className="text-zinc-400 mt-2 text-lg">
              Olayinka Signature Inventory
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href="/admin"
              className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-2xl font-bold transition"
            >
              Upload Product
            </a>

            <button
              onClick={handleLogout}
              className="bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 px-6 py-3 rounded-2xl font-bold transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <p className="text-zinc-400 mb-3">
              Total Products
            </p>

            <h2 className="text-6xl font-black text-pink-500">
              {products.length}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-pink-600 to-rose-500 rounded-3xl p-8">
            <p className="text-pink-100 mb-3">
              Inventory Status
            </p>

            <h2 className="text-4xl font-black">
              Active
            </h2>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <p className="text-zinc-400 mb-3">
              Dashboard
            </p>

            <h2 className="text-4xl font-black">
              Live
            </h2>
          </div>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="text-zinc-400">
            Loading products...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[350px] w-full object-cover"
                />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <h2 className="text-3xl font-black text-white">
                      {product.name}
                    </h2>

                    <span className="text-pink-500 font-black text-2xl">
                      {product.price}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <p className="text-zinc-300 text-lg">
                      <span className="font-bold text-white">
                        Length:
                      </span>{" "}
                      {product.length}
                    </p>

                    <p className="text-zinc-300 text-lg">
                      <span className="font-bold text-white">
                        Colour:
                      </span>{" "}
                      {product.colour}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
  onClick={() =>
    router.push(`/admin/edit/${product.id}`)
  }
  className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-2xl font-bold transition"
>
  Edit
</button>

                    <button
                      onClick={() =>
                        handleDelete(product.id)
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-bold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
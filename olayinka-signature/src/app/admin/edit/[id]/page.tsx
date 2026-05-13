"use client"

import { useEffect, useState } from "react"

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore"

import {
  onAuthStateChanged,
} from "firebase/auth"

import {
  useParams,
  useRouter,
} from "next/navigation"

import {
  db,
  auth,
} from "../../../firebase/config"

export default function EditProductPage() {
  const params = useParams()

  const router = useRouter()

  const id = params.id as string

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [length, setLength] = useState("")
  const [colour, setColour] = useState("")
  const [image, setImage] = useState("")

  const [inStock, setInStock] =
    useState(true)

  const [featured, setFeatured] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  /* PROTECT PAGE */
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          if (!user) {
            router.push("/admin/login")
          }
        }
      )

    return () => unsubscribe()
  }, [router])

  /* FETCH PRODUCT */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(
          db,
          "products",
          id
        )

        const docSnap =
          await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()

          setName(data.name)
          setPrice(data.price)
          setLength(data.length)
          setColour(data.colour)
          setImage(data.image)

          setInStock(
            data.inStock ?? true
          )

          setFeatured(
            data.featured ?? false
          )
        }

        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  /* UPDATE PRODUCT */
  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      const docRef = doc(
        db,
        "products",
        id
      )

      await updateDoc(docRef, {
        name,
        price,
        length,
        colour,
        image,
        inStock,
        featured,
      })

      alert(
        "Product updated successfully"
      )

      router.push(
        "/admin/dashboard"
      )
    } catch (error) {
      console.error(error)

      alert("Update failed")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Edit Product
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-6 bg-zinc-900 p-8 rounded-3xl border border-zinc-800"
        >

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Length"
            value={length}
            onChange={(e) =>
              setLength(e.target.value)
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Colour"
            value={colour}
            onChange={(e) =>
              setColour(e.target.value)
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl p-4 outline-none"
          />

          <div className="space-y-4">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) =>
                  setInStock(
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

              In Stock
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) =>
                  setFeatured(
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

              Featured Product
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 py-4 rounded-2xl font-bold transition"
          >
            Save Changes
          </button>

        </form>
      </div>
    </main>
  )
}
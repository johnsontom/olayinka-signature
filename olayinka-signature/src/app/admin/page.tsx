"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from "../firebase/config"


export default function AdminPage() {
    const router = useRouter()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [length, setLength] = useState("")
  const [colour, setColour] = useState("")
  const [image, setImage] = useState("")
  const [inStock, setInStock] =
  useState(true)

const [featured, setFeatured] =
  useState(false)
  
  const [uploading, setUploading] =
  useState(false)
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
const uploadImage = async (
  file: File
) => {
  try {
    setUploading(true)

    const formData = new FormData()

    formData.append("file", file)

    formData.append(
      "upload_preset",
      "olayinka_unsigned"
    )

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/de4clt7x4/image/upload",
      formData
    )

    setImage(response.data.secure_url)

    setUploading(false)
  } catch (error) {
    console.error(error)

    setUploading(false)

    alert("Image upload failed")
  }
}
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, "products"), {
  name,
  price,
  length,
  colour,
  image,
  inStock,
  featured,
  createdAt: Date.now(),
})
      

      alert("Product uploaded successfully")

      setName("")
      setPrice("")
      setLength("")
      setColour("")
      setImage("")
    } catch (error) {
      console.error(error)
      alert("Upload failed")
    }
  }

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl p-10">
        <h1 className="text-4xl font-black mb-8 text-center text-pink-600">
          Admin Upload
        </h1>

        <form onSubmit={handleUpload} className="space-y-6">
       <input
  type="text"
  placeholder="Wig Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full bg-pink-50 border border-pink-200 rounded-2xl p-4 outline-none text-zinc-900 placeholder:text-zinc-400 focus:border-pink-500 transition"
  required
/>

<input
  type="text"
  placeholder="Price"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  className="w-full bg-pink-50 border border-pink-200 rounded-2xl p-4 outline-none text-zinc-900 placeholder:text-zinc-400 focus:border-pink-500 transition"
  required
/>

<input
  type="text"
  placeholder="Length"
  value={length}
  onChange={(e) => setLength(e.target.value)}
  className="w-full bg-pink-50 border border-pink-200 rounded-2xl p-4 outline-none text-zinc-900 placeholder:text-zinc-400 focus:border-pink-500 transition"
  required
/>

<input
  type="text"
  placeholder="Colour"
  value={colour}
  onChange={(e) => setColour(e.target.value)}
  className="w-full bg-pink-50 border border-pink-200 rounded-2xl p-4 outline-none text-zinc-900 placeholder:text-zinc-400 focus:border-pink-500 transition"
  required
/>

<div className="space-y-4">

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        uploadImage(e.target.files[0])
      }
    }}
    className="w-full bg-pink-50 border border-pink-200 rounded-2xl p-4 outline-none text-zinc-900"
  />

  {uploading && (
    <p className="text-pink-600 font-semibold">
      Uploading image...
    </p>
  )}

  {image && (
    <img
      src={image}
      alt="Preview"
      className="w-full h-[300px] object-cover rounded-2xl"
    />
  )}
</div>
<div className="space-y-4">

  <label className="flex items-center gap-3 text-zinc-800 font-semibold">
    <input
      type="checkbox"
      checked={inStock}
      onChange={(e) =>
        setInStock(e.target.checked)
      }
      className="w-5 h-5"
    />

    In Stock
  </label>

  <label className="flex items-center gap-3 text-zinc-800 font-semibold">
    <input
      type="checkbox"
      checked={featured}
      onChange={(e) =>
        setFeatured(e.target.checked)
      }
      className="w-5 h-5"
    />

    Featured Product
  </label>
</div>
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-full font-semibold transition"
          >
            Upload Product
          </button>
        </form>
      </div>
    </main>
  )
}
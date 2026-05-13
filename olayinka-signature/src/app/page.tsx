"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"

import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import ProductCard from "./components/ProductCard"

import { db } from "./firebase/config"

export default function HomePage() {
  const [wigs, setWigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"))

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setWigs(products)
    setLoading(false)
  }

  fetchProducts()
}, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 text-zinc-900 overflow-hidden">    
<Navbar />
<Hero />
      {/* COLLECTION */}
      <section id="collection" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.4em] text-pink-500 text-sm mb-4 font-semibold">
              Featured Collection
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Signature Luxury Wigs
            </h2>

            <p className="max-w-2xl mx-auto text-zinc-600 text-lg">
              Carefully selected premium wigs designed for elegance, confidence,
              and luxury styling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
   {loading ? (
  Array.from({ length: 3 }).map((_, index) => (
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
  wigs.slice(0, 6).map((wig) => (
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
        <div className="text-center mt-16">
  <a
    href="/collection"
    className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white px-10 py-5 rounded-full font-bold text-lg transition shadow-xl shadow-pink-200"
  >
    View Full Collection
  </a>
</div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="py-24 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.4em] text-pink-500 text-sm mb-4 font-semibold">
              Video Showcase
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Wig Install Transformations
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-pink-100 bg-white p-4">
              <div className="aspect-video rounded-[1.5rem] overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://youtube.com/embed/0QQISWJ1zIc?si=FYaKPNwPi8KZ0jwm"
                  title="YouTube video player"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-pink-100 bg-white p-4">
              <div className="aspect-video rounded-[1.5rem] overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://youtube.com/embed/Xa-LuHkCmVw?si=IG6FkLaYgajtg4tm"
                  title="YouTube video player"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[0.4em] text-pink-500 text-sm mb-4 font-semibold">
            About The Brand
          </p>

          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Confidence In Every Strand
          </h2>

          <p className="text-zinc-600 text-lg leading-9 max-w-3xl mx-auto">
            Olayinka Signature is a luxury wig and hair brand focused on helping
            women feel elegant, confident, and beautiful through premium quality
            wigs designed with style and sophistication.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pink-600 text-white py-16 px-6 rounded-t-[3rem] mt-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl font-black mb-4">
              Olayinka Signature
            </h3>

            <p className="text-pink-100 max-w-md leading-8">
              Premium luxury wigs crafted for beauty, confidence, and timeless
              elegance.
            </p>
          </div>

          <div className="flex flex-wrap md:justify-end gap-4">
           <a
  href="https://instagram.com/olayinkasignaturehair"
  target="_blank"
  className="bg-white/20 hover:bg-white/30 transition px-6 py-3 rounded-full"
>
  Instagram
</a>

           <a
  href="https://tiktok.com/@olayinkasignature"
  target="_blank"
  className="bg-white/20 hover:bg-white/30 transition px-6 py-3 rounded-full"
>
  TikTok
</a>

         <a
  href="https://wa.me/+447383459585"
  target="_blank"
  className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-full"
>
  WhatsApp
</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

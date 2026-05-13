export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-36 pb-20 px-6 overflow-hidden"
    >
      <div className="absolute top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div className="relative overflow-hidden rounded-[3rem]">

          {/* IMAGE BACKGROUND */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/de4clt7x4/image/upload/v1778698851/ed0de419-a856-4179-b928-6de1bb536390_us85pw.jpg')",
            }}
          />

          {/* GLASS OVERLAY */}
          <div className="absolute inset-0 bg-white/30" />

          {/* CONTENT */}
          <div className="relative z-10 p-10 md:p-14">

            <div className="inline-flex items-center gap-2 bg-pink-100 border border-pink-200 rounded-full px-5 py-2 mb-6">
              <span className="w-2 h-2 bg-pink-500 rounded-full" />

              <p className="text-sm text-pink-700 font-medium">
                Premium Luxury Wig Brand
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 text-zinc-900">
              Luxury Hair
              <span className="block text-pink-600">
                That Turns Heads
              </span>
            </h1>

            <p className="text-zinc-600 text-lg leading-8 max-w-xl mb-10">
              Discover elegant premium wigs crafted to elevate your confidence,
              beauty, and everyday glam.
            </p>

            <div className="flex flex-wrap gap-4">

              <a
                href="/collection"
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold transition shadow-xl shadow-pink-300"
              >
                Shop Collection
              </a>

              <a
                href="https://instagram.com/olayinkasignaturehair"
                target="_blank"
                className="bg-white border border-pink-200 hover:border-pink-400 px-8 py-4 rounded-full font-semibold transition"
              >
                Instagram
              </a>

            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-300 to-rose-200 rounded-[3rem] blur-3xl opacity-40" />

          <div className="relative bg-white/40 backdrop-blur-xl border border-white/50 rounded-[3rem] p-6 shadow-2xl">
            <img
              src="https://res.cloudinary.com/de4clt7x4/image/upload/v1778698229/IMG_8565_j6f2af.jpg"
              alt="Luxury Wig Model"
              className="rounded-[2rem] h-[650px] w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
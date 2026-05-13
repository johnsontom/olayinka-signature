type ProductCardProps = {
  name: string
  price: string
  length: string
  colour: string
  image: string
  inStock?: boolean
  featured?: boolean
}

export default function ProductCard({
  name,
  price,
  length,
  colour,
  image,
  inStock = true,
  featured = false,
}: ProductCardProps) {
  return (
    <div className="group bg-white/70 backdrop-blur-xl border border-pink-100 rounded-[2rem] overflow-hidden shadow-xl hover:-translate-y-3 transition duration-500">

      <div className="relative overflow-hidden">

        {featured && (
          <div className="absolute top-4 left-4 z-10 bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
            FEATURED
          </div>
        )}

        {!inStock && (
          <div className="absolute top-4 right-4 z-10 bg-black text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
            OUT OF STOCK
          </div>
        )}

        <img
          src={image}
          alt={name}
          className="h-[420px] w-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-7">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-zinc-900">
            {name}
          </h3>

          <span className="text-pink-600 font-black text-xl">
            {price}
          </span>
        </div>

        <div className="space-y-2 text-zinc-600 mb-6">
          <p>
            <span className="font-semibold text-zinc-900">
              Length:
            </span>{" "}
            {length}
          </p>

          <p>
            <span className="font-semibold text-zinc-900">
              Colour:
            </span>{" "}
            {colour}
          </p>
        </div>

        {inStock ? (
         <a
  href={`https://wa.me/+447383459585?text=${encodeURIComponent(
    `Hi, I'm interested in this wig:

Name: ${name}
Price: ${price}
Length: ${length}
Colour: ${colour}

Please I would like to order.`
  )}`}
  target="_blank"
  className="w-full block text-center bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-full font-semibold transition shadow-lg shadow-pink-300"
>
  Order On WhatsApp
</a>
        ) : (
          <button
            disabled
            className="w-full bg-zinc-300 text-zinc-600 py-4 rounded-full font-semibold cursor-not-allowed"
          >
            Out Of Stock
          </button>
        )}
      </div>
    </div>
  )
}
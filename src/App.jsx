import { useState, useEffect, useRef } from 'react'

const PRODUCTS = [
  {
    id: 1,
    name: 'Obsidian Pro',
    tag: 'NEW',
    price: '₺4.850',
    img: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=700&q=85',
  },
  {
    id: 2,
    name: 'Aurora Classic',
    tag: 'FEATURED',
    price: '₺7.200',
    img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700&q=85',
  },
  {
    id: 3,
    name: 'Noir Edition',
    tag: 'LIMITED',
    price: '₺12.500',
    img: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=700&q=85',
  },
]

function useVisible(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-xl py-4 border-b border-zinc-900'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <span className="text-amber-400 font-black text-xl tracking-[0.35em] uppercase select-none">
          CHRONOS
        </span>

        <div className="hidden md:flex items-center gap-10">
          {['Collection', 'About Us', 'Stores', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-zinc-400 hover:text-white text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block text-xs tracking-[0.2em] uppercase border border-amber-400/60 text-amber-400 px-5 py-2.5 hover:bg-amber-400 hover:text-black transition-all duration-300">
            Cart
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/98 border-t border-zinc-900 px-6 py-8 flex flex-col gap-6">
          {['Collection', 'About Us', 'Stores', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-zinc-300 text-sm tracking-widest uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

function Hero() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=90"
          alt=""
          className={`w-full h-full object-cover transition-all duration-[2s] ${
            ready ? 'opacity-25 scale-100' : 'opacity-0 scale-105'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 w-full">
        <div className="max-w-3xl">
          <p
            className={`text-amber-400 text-xs tracking-[0.6em] uppercase mb-8 hidden-init ${
              ready ? 'fade-up' : ''
            }`}
          >
            2026 — New Collection
          </p>

          <h1
            className={`text-7xl md:text-[9rem] font-black text-white leading-[0.9] mb-8 hidden-init ${
              ready ? 'fade-up delay-100' : ''
            }`}
          >
            TIME
            <br />
            <span className="text-amber-400">CHOOSES</span>
            <br />
            <span className="text-white/30">YOU.</span>
          </h1>

          <p
            className={`text-zinc-400 text-base md:text-lg max-w-md mb-12 leading-relaxed hidden-init ${
              ready ? 'fade-up delay-200' : ''
            }`}
          >
            Watches that make every moment perfect. Design beyond time, crafted for the wrist.
          </p>

          <div
            className={`flex flex-wrap gap-4 hidden-init ${ready ? 'fade-up delay-300' : ''}`}
          >
            <button className="bg-amber-400 text-black font-black px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-amber-300 active:scale-95 transition-all duration-300">
              EXPLORE COLLECTION
            </button>
            <button className="border border-white/20 text-white/70 px-10 py-4 text-xs tracking-[0.3em] uppercase hover:border-white hover:text-white transition-all duration-300">
              DISCOVER US
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-zinc-600 text-xs tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div className="w-px h-full bg-gradient-to-b from-amber-400 to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  )
}

function Ticker() {
  const text = Array(8).fill('CHRONOS — LUXURY WATCHES — COLLECTION 2026 — ')

  return (
    <div className="bg-amber-400 py-4 ticker-wrap">
      <p className="ticker-content text-black font-black text-sm tracking-widest uppercase">
        {text.join('')}
      </p>
    </div>
  )
}

function Products() {
  const [ref, visible] = useVisible()

  return (
    <section id="collection" ref={ref} className="bg-zinc-950 py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-20 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-5">
            Featured Products
          </p>
          <div className="flex items-end justify-between">
            <h2 className="text-5xl md:text-7xl font-black text-white">COLLECTION</h2>
            <a
              href="#"
              className="hidden md:block text-xs text-zinc-500 hover:text-amber-400 tracking-widest uppercase transition-colors duration-300 border-b border-zinc-800 hover:border-amber-400 pb-1"
            >
              View All →
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              className={`group relative bg-zinc-900 overflow-hidden cursor-pointer transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: visible ? `${i * 150 + 200}ms` : '0ms' }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                <span className="absolute top-5 left-5 bg-amber-400 text-black text-xs font-black px-3 py-1.5 tracking-widest">
                  {product.tag}
                </span>
                <button className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black text-white text-xs tracking-widest uppercase px-8 py-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-400 hover:text-black whitespace-nowrap">
                  Add to Cart
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-white font-bold text-xl mb-3">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-black text-xl">{product.price}</span>
                  <span className="text-zinc-600 text-xs tracking-widest uppercase group-hover:text-white transition-colors duration-300">
                    View →
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 border border-transparent group-hover:border-amber-400/40 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Statement() {
  const [ref, visible] = useVisible()

  return (
    <section ref={ref} className="relative bg-black py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}
        >
          <p className="text-amber-400 text-xs tracking-[0.5em] uppercase mb-8">Why Chronos?</p>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.95] mb-8">
            NOT JUST A
            <br />
            LUXURY
            <br />
            WATCH —
            <br />
            <span className="text-amber-400">A STATEMENT.</span>
          </h2>
          <p className="text-zinc-500 leading-relaxed max-w-md">
            Each of our watches does more than tell time — it makes you feel it. Handcrafted,
            premium materials, lifetime guarantee.
          </p>
        </div>

        <div
          className={`grid grid-cols-2 gap-px bg-zinc-800 transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            ['250+', 'Products'],
            ['15K+', 'Happy Customers'],
            ['10', 'Years Experience'],
            ['48h', 'Shipping Time'],
          ].map(([num, label]) => (
            <div key={label} className="bg-zinc-950 p-10 flex flex-col gap-2">
              <p className="text-4xl font-black text-amber-400">{num}</p>
              <p className="text-zinc-500 text-xs tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const [ref, visible] = useVisible()

  return (
    <section ref={ref} className="bg-zinc-950 py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative overflow-hidden h-[500px] md:h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1548171916-c8fd5d4b6bcc?w=1400&q=85"
              alt="Featured Watch"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-transparent" />
            <div className="absolute inset-0 flex items-end p-12 md:p-20">
              <div>
                <span className="text-amber-400 text-xs tracking-[0.5em] uppercase block mb-4">
                  Season's Featured
                </span>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-4">PRESTIGE X1</h3>
                <p className="text-zinc-300 mb-8 max-w-xs leading-relaxed">
                  Titanium case, sapphire crystal, 300m water resistance.
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-amber-400 font-black text-3xl">₺24.900</span>
                  <button className="bg-amber-400 text-black font-black px-8 py-3 text-xs tracking-widest uppercase hover:bg-amber-300 transition-colors duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Newsletter() {
  const [ref, visible] = useVisible()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <section ref={ref} className="bg-amber-400 py-32 px-6">
      <div
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-black/60 text-xs tracking-[0.5em] uppercase mb-5">Exclusive Benefits</p>
        <h2 className="text-4xl md:text-6xl font-black text-black leading-tight mb-4">
          BE THE FIRST
          <br />
          TO SEE NEW ARRIVALS.
        </h2>
        <p className="text-black/60 mb-12 text-sm leading-relaxed">
          Pre-launch access, exclusive discounts and limited collections.
        </p>

        {sent ? (
          <p className="text-black font-black text-xl tracking-widest uppercase">
            Successfully Subscribed — Welcome!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-black/10 text-black placeholder-black/40 px-6 py-4 text-sm outline-none border border-black/20 focus:border-black/50 transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-black text-amber-400 font-black px-8 py-4 text-xs tracking-widest uppercase hover:bg-zinc-900 transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <span className="text-amber-400 font-black text-xl tracking-[0.35em] uppercase block mb-4">
              CHRONOS
            </span>
            <p className="text-zinc-600 text-sm leading-relaxed">Don't track time, live the moment.</p>
          </div>

          {[
            { title: 'Collection', links: ['New Arrivals', 'Men', 'Women', 'Limited'] },
            { title: 'Support', links: ['FAQ', 'Shipping', 'Returns', 'Warranty'] },
            { title: 'Follow Us', links: ['Instagram', 'Twitter', 'Pinterest', 'YouTube'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-xs tracking-widest uppercase mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-zinc-600 hover:text-amber-400 text-sm transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs">© 2026 Chronos. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-zinc-700 hover:text-zinc-400 text-xs transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Ticker />
      <Products />
      <Statement />
      <Featured />
      <Newsletter />
      <Footer />
    </div>
  )
}

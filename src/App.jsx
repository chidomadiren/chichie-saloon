import { useEffect, useState } from 'react'
import './App.css'

import heroLocal from './assets/hero.png'

const wigImages = Object.entries(
  import.meta.glob('./assets/wigs/*.jpg', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
const plaitedHairImages = Object.entries(
  import.meta.glob('./assets/plaited-hair/*.jpg', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
)
const getImageName = (path) =>
  path
    .split('/')
    .pop()
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

const consultationLink =
  'mailto:hello@chichiesaloon.com?subject=Consultation%20booking&body=Hello%2C%20I%27d%20like%20to%20schedule%20a%20consultation.'
const accountHelpLink =
  'mailto:hello@chichiesaloon.com?subject=Account%20access%20help&body=Hello%2C%20I%20need%20help%20with%20my%20account.'
const orderLink = (wig) =>
  `https://wa.me/26377106675?text=${encodeURIComponent(
    `Hello, I'd like to order ${wig.name} (${wig.style}) for ${wig.price}.`,
  )}`
const additionalWigPrices = ['$125', '$135', '$145', '$155', '$165']

const wigCollection = [
  {
    id: 1,
    name: 'Velvet Silk Wave',
    style: 'Brazilian Hair',
    price: '$120',
    accent: '#d88fd0',
    image: wigImages[0][1],
  },
  {
    id: 2,
    name: 'Golden Glam',
    style: 'HD Lace',
    price: '$150',
    accent: '#f4c48b',
    image: wigImages[1][1],
  },
  {
    id: 3,
    name: 'Midnight Luxe',
    style: 'Transparent Lace',
    price: '$180',
    accent: '#8ea6ff',
    image: wigImages[2][1],
  },
  {
    id: 4,
    name: 'Honey Bloom',
    style: 'Yaki Straight',
    price: '$135',
    accent: '#f7d9a5',
    image: wigImages[3][1],
  },
  {
    id: 5,
    name: 'Rose Royalty',
    style: 'Premium Closure',
    price: '$165',
    accent: '#f0a8bf',
    image: wigImages[4][1],
  },
  {
    id: 6,
    name: 'Satin Crown',
    style: 'Virgin Hair',
    price: '$200',
    accent: '#b7e4d1',
    image: wigImages[5][1],
  },
  {
    id: 7,
    name: 'Opal Dream',
    style: 'Lace Front',
    price: '$175',
    accent: '#e8d7f2',
    image: wigImages[6][1],
  },
  {
    id: 8,
    name: 'Cocoa Velvet',
    style: 'Silk Base',
    price: '$190',
    accent: '#f2d6c9',
    image:
      wigImages.find(([path]) =>
        path.toLowerCase().includes('chocolate') || path.toLowerCase().includes('bouncy'),
      )?.[1] ?? heroLocal,
  },
]

const klaiyiWig = wigImages.find(([path]) => path.includes('klaiyi-water-wave'))

const catalogWigs = [
  ...wigCollection.filter((wig) => wig.image !== klaiyiWig?.[1]),
  ...(klaiyiWig
    ? [
        {
          id: 'klaiyi-water-wave',
          name: 'Klaiyi Water Wave',
          style: 'Glueless Lace Front',
          price: '$160',
          accent: '#d88fd0',
          image: klaiyiWig[1],
        },
      ]
    : []),
  ...wigImages
    .filter(
      ([, image]) =>
        image !== klaiyiWig?.[1] &&
        !wigCollection.some((wig) => wig.image === image),
    )
    .map(([path, image], index) => ({
      id: path,
      name: getImageName(path),
      style: 'Wig',
      price: additionalWigPrices[index % additionalWigPrices.length],
      accent: '#d88fd0',
      image,
    })),
]

const highlights = [
  {
    title: 'Custom fitting',
    text: 'Precision consults to match your face shape and skin tone beautifully.',
  },
  {
    title: 'Flawless installation',
    text: 'Expert lace, closure and full install finishing with long-wear comfort.',
  },
  {
    title: 'Luxury care kit',
    text: 'Every order includes styling guidance, maintenance care, and glow tips.',
  },
]

const testimonials = [
  {
    name: 'Aisha M.',
    text: 'My lace install looked so natural and lasted weeks. The salon was patient, classy, and so detailed.',
  },
  {
    name: 'Nyasha R.',
    text: 'I ordered a wig for a weekend event and it looked like it was custom-made. The texture is gorgeous.',
  },
  {
    name: 'Tariro K.',
    text: 'The colors are beautiful and the styling is excellent. My hair looks expensive and healthy.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedProductId, setExpandedProductId] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % wigCollection.length)
    }, 2600)

    return () => clearInterval(timer)
  }, [])

  const activeWig = wigCollection[activeIndex]

  return (
    <div className="salon-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">C</div>
          <div>
            <span className="brand-name">Chichie Saloon</span>
            <small>Luxury Installations</small>
          </div>
        </div>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} id="main-navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#catalog" onClick={() => setMenuOpen(false)}>Catalog</a>
          <a href="#why-us" onClick={() => setMenuOpen(false)}>Why us</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        <div className="nav-actions">
          <a href={accountHelpLink} className="nav-button secondary">
            Account help
          </a>
          <a href={consultationLink} className="nav-button primary">
            Book by email
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">Premium Hair, Beautiful Finish</span>
            <h1>Turn heads with luxurious install wigs that feel naturally yours.</h1>
            <p>
              From soft silk waves to bold glam finishes, Chichie Saloon brings salon-level
              beauty with handcrafted wigs designed for comfort, shine, and confidence.
            </p>

            <div className="hero-actions">
              <a href="#catalog" className="primary large">
                Shop collection
              </a>
              <a href="#gallery" className="secondary large light">
                Explore styles
              </a>
            </div>

            <div className="hero-metrics">
              <div>
                <strong>12k+</strong>
                <span>happy clients</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>client rating</span>
              </div>
              <div>
                <strong>48h</strong>
                <span>dispatch time</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="floating-badge badge-top">New collection</div>
            <div className="floating-badge badge-bottom">Natural glow</div>

            <div className="wig-showcase" style={{ '--wig-accent': activeWig.accent }}>
              <div
                className="wig-main"
                style={{ backgroundImage: `url(${activeWig.image})` }}
                key={activeWig.id}
              />
            </div>

            <div className="style-card">
              <span className="style-tag">Best Seller</span>
              <h3>{activeWig.name}</h3>
              <div className="style-details">
                <span>{activeWig.style}</span>
                <strong>{activeWig.price}</strong>
              </div>
            </div>

            <div className="wig-selector" aria-label="Wig style selector">
              {wigCollection.map((wig, index) => (
                <button
                  key={wig.id}
                  type="button"
                  className={index === activeIndex ? 'selector active' : 'selector'}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${wig.name}`}
                  style={{ '--wig-accent': wig.accent }}
                >
                  <span className="dot" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-bar" aria-label="Brand trust points">
          <span>Premium quality</span>
          <span>Ethically sourced</span>
          <span>Expert styling</span>
          <span>Secure shipping</span>
        </section>

        <section className="features" id="why-us">
          <div className="section-heading">
            <span className="eyebrow">Why Chichie Saloon</span>
            <h2>Fashion-first wigs designed for every occasion.</h2>
          </div>

          <div className="feature-grid">
            {highlights.map((item) => (
              <article key={item.title} className="feature-card">
                <div className="feature-icon">✦</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="catalog" id="catalog">
          <div className="section-heading split">
            <div>
              <span className="eyebrow">Our catalog</span>
              <h2>Signature installs for a luxe everyday glow.</h2>
            </div>
            <a href="#gallery" className="secondary large">
              View all wigs
            </a>
          </div>

          <div className="product-grid">
            {catalogWigs.map((wig) => (
              <article key={wig.id} className="product-card">
                <div className="product-image">
                  <img src={wig.image} alt={wig.name} loading="lazy" />
                  <span className="product-badge">New</span>
                </div>
                <div className="product-body">
                  <div className="product-topline">
                    <span>{wig.style}</span>
                    <strong>{wig.price}</strong>
                  </div>
                  <h3>{wig.name}</h3>
                  <div className="product-actions">
                    <a
                      href={orderLink(wig)}
                      className="primary small"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Order ${wig.name} on WhatsApp`}
                    >
                      Buy now
                    </a>
                    <button
                      type="button"
                      className="ghost small"
                      aria-expanded={expandedProductId === wig.id}
                      aria-controls={`product-details-${wig.id}`}
                      onClick={() =>
                        setExpandedProductId((currentId) =>
                          currentId === wig.id ? null : wig.id,
                        )
                      }
                    >
                      {expandedProductId === wig.id ? 'Hide details' : 'Details'}
                    </button>
                  </div>
                  {expandedProductId === wig.id && (
                    <div className="product-details" id={`product-details-${wig.id}`}>
                      <p>
                        {wig.name} is a {wig.style.toLowerCase()} wig priced at {wig.price}.
                      </p>
                      <a href={consultationLink}>Ask us about fit and availability</a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="section-heading">
            <span className="eyebrow">Gallery</span>
            <h2>Browse wigs and plaited hair</h2>
          </div>

          <section className="asset-category" aria-labelledby="wigs-heading">
            <h3 id="wigs-heading">Wigs</h3>
            <div className="gallery-grid">
              {wigImages.map(([path, src]) => (
                <div key={path} className="gallery-item">
                  <img src={src} alt={getImageName(path)} loading="lazy" />
                </div>
              ))}
            </div>
          </section>

          <section className="asset-category" aria-labelledby="plaited-hair-heading">
            <h3 id="plaited-hair-heading">Plaited hair</h3>
            <div className="gallery-grid">
              {plaitedHairImages.map(([path, src]) => (
                <div key={path} className="gallery-item">
                  <img
                    src={src}
                    alt={
                      path.includes('instagram')
                        ? 'Instagram braided hair with curly lengths'
                        : getImageName(path)
                    }
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>
        </section>

        <section className="testimonials" id="reviews">
          <div className="section-heading">
            <span className="eyebrow">Testimonials</span>
            <h2>Real women, real confidence.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <div className="stars">★★★★★</div>
                <p>“{item.text}”</p>
                <div className="reviewer">
                  <span className="avatar">{item.name.charAt(0)}</span>
                  <strong>{item.name}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-card">
          <div>
            <span className="eyebrow">Ready to glow?</span>
            <h2>Book your next luxury install with Chichie Saloon.</h2>
          </div>
          <a
            href={consultationLink}
            className="primary large"
            aria-label="Schedule a consultation by emailing hello@chichiesaloon.com"
          >
            Schedule by email
          </a>
        </div>

        <div className="footer-meta">
          <span>© 2026 Chichie Saloon</span>
          <span>hello@chichiesaloon.com</span>
          <span>+263 7710 6675</span>
        </div>
      </footer>
    </div>
  )
}

export default App

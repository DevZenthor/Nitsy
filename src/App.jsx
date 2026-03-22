import { useState, useEffect, useRef } from "react";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

export default function App() {

  const [showTitle, setShowTitle] = useState(false);
  const [locked, setLocked] = useState(true);

  const profileRef = useRef(null);
  const galleryRef = useRef(null);
  const clientsRef = useRef(null);   // ✅ AJOUT
  const pricingRef = useRef(null);
  const bgVideoRef = useRef(null);

  // Apparition titre
  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Bloque scroll
  useEffect(() => {
    const body = document.body;

    if (locked) {
      body.style.position = "fixed";
      body.style.top = "0";
      body.style.width = "100%";
    } else {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
    }
  }, [locked]);

  const enterSite = () => {
    setLocked(false);
    setTimeout(() => {
      profileRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Effet vidéo souris
  const handleMouseMove = (e) => {
    const mx = e.clientX / window.innerWidth - 0.5;
    const my = e.clientY / window.innerHeight - 0.5;

    if (bgVideoRef.current) {
      bgVideoRef.current.style.transform =
        `translate(${mx * 30}px, ${my * 30}px) scale(1.1)`;
    }
  };

  return (
    <div onMouseMove={handleMouseMove}>

      {/* VIDEO BACKGROUND */}
      <video
        ref={bgVideoRef}
        src="https://ptfrdn6xrpxaxgcz.public.blob.vercel-storage.com/v.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="global-video"
      />

      <div className="global-overlay"></div>

      {/* NAVBAR */}
      {!locked && (
        <nav className="navbar">
          <div className="nav-logo">Nitsy</div>

          <div className="nav-links">

            <button onClick={() =>
              profileRef.current.scrollIntoView({ behavior: "smooth" })
            }>Profil</button>

            <button onClick={() =>
              galleryRef.current.scrollIntoView({ behavior: "smooth" })
            }>Galerie</button>

            {/* ✅ BOUTON CLIENTS */}
            <button onClick={() =>
              clientsRef.current.scrollIntoView({ behavior: "smooth" })
            }>Clients</button>

            <button onClick={() =>
              pricingRef.current.scrollIntoView({ behavior: "smooth" })
            }>Tarifs</button>

            <a
              href="https://discord.gg/GpfkxSUznf"
              target="_blank"
              className="nav-discord"
            >
              <FaDiscord /> Discord
            </a>

          </div>
        </nav>
      )}

      {/* HERO */}
      <section className="hero">
        <video
          src="https://ptfrdn6xrpxaxgcz.public.blob.vercel-storage.com/A.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        />
        <div className="hero-overlay"></div>

        <div className="hero-content">
          {showTitle && (
            <>
              <h1 className="hero-title">Portfolio de Nitsy</h1>
              <button onClick={enterSite} className="hero-button">
                Découvrir
              </button>
            </>
          )}
        </div>
      </section>

      {/* PROFIL */}
      <section ref={profileRef} className="profile-section">
        <div className="profile-card">

          <img src="/nitsy.jpg" className="profile-image" />

          <h2 className="profile-name">Nitsy</h2>

          <p className="profile-text">
            Graphiste spécialisé en miniatures, posters et logos.
          </p>

          <div className="social-section">

            <a href="https://x.com/NitsyFnbr" target="_blank" className="social-btn x">
              <FaXTwitter /> X / Twitter
            </a>

            <a href="https://discord.gg/GpfkxSUznf" target="_blank" className="social-btn discord">
              <FaDiscord /> Discord
            </a>

          </div>

        </div>
      </section>

      {/* GALERIE */}
      <section ref={galleryRef} className="gallery-section">
        <h2 className="gallery-title">Réalisations</h2>
        <Gallery />
      </section>

      {/* ================= CLIENTS ================= */}
      <section ref={clientsRef} className="clients-section">

        <h2 className="clients-title">Clients</h2>

        <ClientsSection />

      </section>

      {/* TARIFS */}
      <section ref={pricingRef} className="pricing-section">
        <h2 className="pricing-title">Tarifs</h2>

        <div className="pricing-cards">
          <PriceCard title="Miniature" price="6€ — 8€" img="/minia.jpeg" />
          <PriceCard title="Poster" price="5€ — 10€" img="/poster1.png" />
          <PriceCard title="Logo" price="3€ — 6€" img="/logo1.jpg" />
        </div>
      </section>

      {/* FOOTER */}
      {!locked && (
        <footer className="footer">

          <div className="footer-content">

            <div className="footer-left">
              <h3>Nitsy</h3>
              <p>Miniatures • Posters • Logos</p>
            </div>

            <div className="footer-social">
              <a href="https://x.com/NitsyFnbr" target="_blank"><FaXTwitter /></a>
              <a href="https://discord.gg/GpfkxSUznf" target="_blank"><FaDiscord /></a>
            </div>

          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} Nitsy — Tous droits réservés<br />
            <span className="dev-credit">Dev by Zenthor</span>
          </div>

        </footer>
      )}

    </div>
  );
}

//////////////////////////////////////////////////////////
// ================= CLIENTS COMPONENT =================
//////////////////////////////////////////////////////////

function ClientsSection() {

  const clients = [
    { name: "Jonax", img: "/jonax.jpg" },
    { name: "One Prodige", img: "/1P.jpg" },
    { name: "Wycker", img: "/wycker.jpg" }
   /* { name: "Hedra", img: "/hedra.jpg" }*/
  ];

  return (
    <div className="clients-grid">

      {clients.map((c, i) => (
        <div key={i} className="client-card">
          <img src={c.img} alt={c.name} />
          <p>{c.name}</p>
        </div>
      ))}

    </div>
  );
}

//////////////////////////////////////////////////////////
// ================= GALERIE =================
//////////////////////////////////////////////////////////

function Gallery() {

  const [filter, setFilter] = useState("all");

  const items = [ 
    { type: "mini", src: "/miniature1.png" }, 
    { type: "mini", src: "/miniature2.png" }, 
    { type: "mini", src: "/miniature3.png" }, 
    { type: "mini", src: "/miniature4.png" }, 
    { type: "mini", src: "/miniature5.png" }, 
    { type: "mini", src: "/miniature7.png" }, 
    { type: "poster", src: "/poster1.png" }, 
    { type: "poster", src: "/poster2.png" }, 
    { type: "poster", src: "/poster3.png" }, 
    { type: "poster", src: "/poster4.png" }, 
    { type: "poster", src: "/poster5.jpg" }, 
    { type: "logo", src: "/logo1.jpg" } 
  ];

  const filtered =
    filter === "all"
      ? items
      : items.filter(item => item.type === filter);

  return (
    <>
      <div className="gallery-filters">

        <button onClick={() => setFilter("all")}>Tout</button>
        <button onClick={() => setFilter("mini")}>Miniatures</button>
        <button onClick={() => setFilter("poster")}>Posters</button>
        <button onClick={() => setFilter("logo")}>Logos</button>

      </div>

      <div className="gallery-grid">
        {filtered.map((item, i) => (
          <div key={i} className={`gallery-item ${item.type}`}>
            <img src={item.src} alt={item.type} />
          </div>
        ))}
      </div>
    </>
  );
}

//////////////////////////////////////////////////////////
// ================= TARIFS =================
//////////////////////////////////////////////////////////

function PriceCard({ title, price, img }) {
  return (
    <div className="price-card">

      <img src={img} className="price-image" />

      <h3>{title}</h3>
      <p>{price}</p>

      <a
        href="https://discord.gg/GpfkxSUznf"
        target="_blank"
        className="order-button"
      >
        Commander
      </a>

    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

export default function App() {
  const [showTitle, setShowTitle] = useState(false);
  const [locked, setLocked] = useState(true);

  const profileRef = useRef(null);
  const pricingRef = useRef(null);

  // Apparition titre
  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Bloque scroll au début
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

  // Gradient interactif souris
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty("--x", `${x}%`);
    document.documentElement.style.setProperty("--y", `${y}%`);
  };

  return (
    <div onMouseMove={handleMouseMove}>

      {/* ===== NAVBAR (PAS SUR LA VIDÉO) ===== */}
      {!locked && (
        <nav className="navbar">

          <div className="nav-logo">Nitsy</div>

          <div className="nav-links">

            <button onClick={() =>
              profileRef.current.scrollIntoView({ behavior: "smooth" })
            }>
              Profil
            </button>

            <button onClick={() =>
              pricingRef.current.scrollIntoView({ behavior: "smooth" })
            }>
              Tarifs
            </button>

            <a
              href="https://discord.gg/GpfkxSUznf"
              target="_blank"
              rel="noreferrer"
              className="nav-discord"
            >
              Discord
            </a>

          </div>

        </nav>
      )}

      {/* ========= HERO VIDEO ========= */}
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

      {/* ========= PROFIL ========= */}
      <section ref={profileRef} className="profile-section">

        <div className="profile-card">

          <img src="/nitsy.jpg" alt="Nitsy" className="profile-image" />

          <h2 className="profile-name">Nitsy</h2>

          <p className="profile-text">
            Graphiste dans la création de miniatures et posters.
          </p>

          <div className="social-section">

            <a href="https://x.com/NitsyFnbr" target="_blank" rel="noreferrer" className="social-btn x">
              <FaXTwitter />
              <span>X / Twitter</span>
            </a>

            <a href="https://discord.gg/GpfkxSUznf" target="_blank" rel="noreferrer" className="social-btn discord">
              <FaDiscord />
              <span>Discord</span>
            </a>

          </div>

        </div>

      </section>

      {/* ========= TARIFS ========= */}
      <section ref={pricingRef} className="pricing-section">

        <h2 className="pricing-title">Tarifs</h2>

        <div className="pricing-cards">

          <PriceCard title="Miniature" price="6€ — 8€" img="/minia.jpeg" />
          <PriceCard title="Poster" price="5€ — 10€" img="/poster.jpeg" />
          <PriceCard title="Logo" price="3€ — 6€" img="/logo.jpeg" />

        </div>

      </section>

    </div>
  );
}

// ===== Carte Tarif =====
function PriceCard({ title, price, img }) {
  return (
    <div className="price-card">

      <img src={img} alt={title} className="price-image" />

      <h3>{title}</h3>
      <p>{price}</p>

      <a
        href="https://discord.gg/GpfkxSUznf"
        target="_blank"
        rel="noreferrer"
        className="order-button"
      >
        Commander
      </a>

    </div>
  );
}
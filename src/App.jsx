import { useState, useEffect, useRef } from "react";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

export default function App() {
  const [showTitle, setShowTitle] = useState(false);
  const [locked, setLocked] = useState(true);
  const profileRef = useRef(null);

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
      <section ref={profileRef} className="profile-section firefly-area">

        {/* 🌟 LUCIOLLES UNIQUEMENT ICI */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: 10 + Math.random() * 12 + "s",
            }}
          />
        ))}

        <div className="profile-card">

          <img src="/nitsy.jpg" alt="Nitsy" className="profile-image" />

          <h2 className="profile-name">Nitsy</h2>

          <p className="profile-text">
            Graphiste dans la création de miniatures et posters.
          </p>

          {/* RÉSEAUX */}
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
      <section className="pricing-section firefly-area">

        {/* 🌟 LUCIOLLES */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={"p" + i}
            className="firefly"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: 12 + Math.random() * 10 + "s",
            }}
          />
        ))}

        <h2 className="pricing-title">Tarifs</h2>

        <div className="pricing-cards">

          <PriceCard title="Miniature" price="6€ — 8€" img="/minia.jpg" />
          <PriceCard title="Poster" price="5€ — 10€" img="/poster.jpg" />
          <PriceCard title="Logo" price="3€ — 6€" img="/logo.jpg" />

        </div>

      </section>

    </div>
  );
}

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
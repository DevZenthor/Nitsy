import { useState, useEffect, useRef } from "react";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

export default function App() {
  const [showTitle, setShowTitle] = useState(false);
  const [locked, setLocked] = useState(true);

  const jungleRef = useRef(null);

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
      jungleRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>

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

      {/* ========= SECTION JUNGLE ========= */}
      <section ref={jungleRef} className="jungle-section">

        {/* Lianes décoratives */}
        <img src="/brodure.png" alt="" className="vine-top" />

        {/* Lucioles */}
        {Array.from({ length: 60 }).map((_, i) => (
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

        {/* PROFIL */}
        <div className="profile-card">

          <div className="profile-glow"></div>

          <img
            src="/nitsy.jpg"
            alt="Nitsy"
            className="profile-image"
          />

          <h2 className="profile-name">Nitsy</h2>

          <p className="profile-text">
            Graphiste dans la création de miniatures et posters.
          </p>

          {/* ===== RÉSEAUX ===== */}
          <div className="social-section">

            <h3 className="social-title">Réseaux</h3>

            <div className="social-icons">

              <a
                href="https://x.com/NitsyFnbr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://discord.gg/GpfkxSUznf"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaDiscord />
              </a>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
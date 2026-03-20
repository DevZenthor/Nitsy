import { useState, useEffect, useRef } from "react";

export default function App() {
  const [showTitle, setShowTitle] = useState(false);
  const [locked, setLocked] = useState(true);

  const jungleRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Bloque le scroll au début
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

        {/* Lianes */}
        <img src="/brodure.png" alt="" className="vine-top" />

        {/* ⭐ Lucioles seulement ici */}
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

        {/* Carte profil */}
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

        </div>

      </section>

    </div>
  );
}
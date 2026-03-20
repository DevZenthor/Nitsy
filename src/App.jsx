import { useState, useEffect, useRef } from "react";

export default function App() {
  const [showTitle, setShowTitle] = useState(false);
  const [locked, setLocked] = useState(true);
  const nextSectionRef = useRef(null);

  // ⏱️ Apparition du titre
  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // 🔒 Verrouillage total du scroll
  useEffect(() => {
    const body = document.body;

    if (locked) {
      body.style.position = "fixed";
      body.style.top = "0";
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    } else {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
    }
  }, [locked]);

  // 🔓 Entrer dans le site
  const enterSite = () => {
    setLocked(false);

    setTimeout(() => {
      nextSectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div>

      {/* ===== HERO VIDEO ===== */}
      <section className="hero">

        <video
          src="https://ptfrdn6xrpxaxgcz.public.blob.vercel-storage.com/A.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">

          {showTitle && (
            <>
              <h1 className="hero-title">
                Portfolio de Nitsy
              </h1>

              <button
                onClick={enterSite}
                className="hero-button"
              >
                Découvrir
              </button>
            </>
          )}

        </div>
      </section>

      {/* ===== SECTION NUIT ===== */}
      <section ref={nextSectionRef} className="night-section">

        {/* ✨ Lucioles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: 8 + Math.random() * 10 + "s",
            }}
          />
        ))}

        <div className="night-content">
          <h2>Bienvenue sur mon portfolio</h2>
        </div>

      </section>

    </div>
  );
}
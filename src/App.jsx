import { useState, useEffect } from "react";

const EMAILJS_PUBLIC_KEY = "3NHidGZTG3SujktwJ";
const EMAILJS_SERVICE_ID = "service_ku9uyrc";
const EMAILJS_TEMPLATE_ID = "fxp9rhr";

const COORDS = { lat: 18.4655, lng: -66.1057, label: "18.4655° N, 66.1057° W" };
const APPLE_MAPS = `https://maps.apple.com/?q=${COORDS.lat},${COORDS.lng}`;
const GOOGLE_MAPS = `https://www.google.com/maps?q=${COORDS.lat},${COORDS.lng}`;
const LIME = "#c8ff00";

const LogoSVG = () => (
  <img src="/logo.svg" alt="Secret Sets" style={{ width: "100%", maxWidth: "300px", display: "block", margin: "0 auto" }} />
);

export default function SecretSets() {
  const [step, setStep] = useState("main");
  const [form, setForm] = useState({ name: "", guests: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ejsReady, setEjsReady] = useState(false);

  useEffect(() => {
    if (window.emailjs) {
      setEjsReady(true);
    } else {
      const interval = setInterval(() => {
        if (window.emailjs) {
          setEjsReady(true);
          clearInterval(interval);
        }
      }, 100);
    }
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim() || !ejsReady) return;
    setSubmitting(true); setError("");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name.trim(),
        guests: form.guests,
        guest_label: form.guests === 1 ? "Just them" : `+${form.guests - 1} guest${form.guests - 1 > 1 ? "s" : ""}`,
      });
      setStep("done");
    } catch { setError("Something went wrong. Try again."); }
    finally { setSubmitting(false); }
  };

  const bold = { fontFamily: "'Arial Black', 'Franklin Gothic Heavy', Impact, sans-serif", fontStyle: "italic", fontWeight: 900 };

  const MapBtn = ({ label, url }) => (
    <a href={url} target="_blank" rel="noreferrer" style={{
      flex: 1, padding: "0.65rem",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "#ccc", textDecoration: "none",
      fontSize: "0.55rem", letterSpacing: "0.12em",
      textTransform: "uppercase", textAlign: "center",
      display: "block", transition: "all 0.2s",
      fontFamily: "'Arial Black', sans-serif",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = LIME; e.currentTarget.style.color = LIME; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#ccc"; }}
    >{label}</a>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a", color: "#f0ede6",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2.5rem 1.5rem", overflow: "hidden",
    }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "400px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem", width: "100%" }}>
          <LogoSVG />
        </div>

        {/* Event details */}
        <div style={{
          borderTop: `1px solid rgba(200,255,0,0.25)`,
          borderBottom: `1px solid rgba(200,255,0,0.25)`,
          padding: "1rem 0", marginBottom: "1.5rem",
          textAlign: "center",
        }}>
          <div style={{ ...bold, fontSize: "clamp(1.8rem, 9vw, 2.4rem)", color: LIME, lineHeight: 1 }}>
            beach rave
          </div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#888", textTransform: "uppercase", marginTop: "0.5rem" }}>
            Puerto Rico · Jun 13, 2026 · 6:30 PM
          </div>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#666", textTransform: "uppercase", fontStyle: "italic", marginTop: "0.25rem" }}>
            tunes by <span style={{ color: LIME, fontStyle: "normal" }}>Jahi</span>
          </div>
        </div>

        {/* MAIN */}
        {step === "main" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ border: `1px solid rgba(200,255,0,0.2)`, padding: "1.2rem", position: "relative" }}>
              <div style={{
                position: "absolute", top: "-9px", left: "16px",
                background: "#0a0a0a", padding: "0 6px",
                fontSize: "0.45rem", letterSpacing: "0.35em", color: LIME, textTransform: "uppercase",
              }}>Location</div>
              <div style={{
                ...bold, fontSize: "clamp(0.85rem, 3.5vw, 1rem)",
                color: LIME, letterSpacing: "0.05em",
                textAlign: "center", marginBottom: "0.9rem", fontStyle: "normal",
              }}>{COORDS.label}</div>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <MapBtn label="Apple Maps" url={APPLE_MAPS} />
                <MapBtn label="Google Maps" url={GOOGLE_MAPS} />
              </div>
            </div>
            <button onClick={() => setStep("rsvp")} style={{
              ...bold, background: LIME, color: "#0a0a0a",
              border: "none", cursor: "pointer",
              fontSize: "1rem", letterSpacing: "0.05em",
              textTransform: "lowercase", padding: "1rem", width: "100%",
            }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
            >rsvp →</button>
          </div>
        )}

        {/* RSVP */}
        {step === "rsvp" && (
          <div style={{ border: `1px solid rgba(200,255,0,0.2)`, padding: "1.5rem", position: "relative" }}>
            <div style={{
              position: "absolute", top: "-9px", left: "16px",
              background: "#0a0a0a", padding: "0 6px",
              fontSize: "0.45rem", letterSpacing: "0.35em", color: LIME, textTransform: "uppercase",
            }}>RSVP</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.48rem", letterSpacing: "0.3em", color: "#666", textTransform: "uppercase", marginBottom: "0.5rem" }}>Your Name</label>
                <input type="text" placeholder="First & Last" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#f0ede6", padding: "0.75rem 1rem",
                    fontFamily: "'Courier New', monospace", fontSize: "0.9rem",
                    outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = LIME}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.48rem", letterSpacing: "0.3em", color: "#666", textTransform: "uppercase", marginBottom: "0.5rem" }}>How many people (including you)?</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[1,2,3,4].map(n => (
                    <button key={n} onClick={() => setForm(f => ({ ...f, guests: n }))} style={{
                      flex: 1, padding: "0.75rem",
                      background: form.guests === n ? LIME : "transparent",
                      border: `1px solid ${form.guests === n ? LIME : "rgba(255,255,255,0.12)"}`,
                      color: form.guests === n ? "#0a0a0a" : "#f0ede6",
                      fontFamily: "'Arial Black', sans-serif", fontWeight: 900,
                      fontSize: "1rem", cursor: "pointer", transition: "all 0.15s",
                    }}>{n}</button>
                  ))}
                </div>
              </div>
              <button onClick={handleSubmit} disabled={!form.name.trim() || submitting} style={{
                ...bold, marginTop: "0.25rem",
                background: form.name.trim() ? LIME : "rgba(200,255,0,0.12)",
                color: form.name.trim() ? "#0a0a0a" : "#555",
                border: "none", cursor: form.name.trim() ? "pointer" : "not-allowed",
                fontSize: "1rem", letterSpacing: "0.05em",
                textTransform: "lowercase", padding: "1rem", width: "100%",
              }}>
                {submitting ? "locking you in..." : "lock in my spot"}
              </button>
              {error && (
                <div style={{ fontSize: "0.6rem", color: "#ff5555", textAlign: "center", border: "1px solid rgba(255,85,85,0.3)", padding: "0.6rem" }}>{error}</div>
              )}
              <button onClick={() => setStep("main")} style={{
                background: "transparent", border: "none", color: "#444",
                cursor: "pointer", fontFamily: "'Courier New', monospace",
                fontSize: "0.52rem", letterSpacing: "0.2em",
                textTransform: "uppercase", textDecoration: "underline",
              }}>← Back</button>
            </div>
          </div>
        )}

        {/* DONE */}
        {step === "done" && (
          <div style={{ border: `1px solid rgba(200,255,0,0.35)`, padding: "2rem 1.5rem", textAlign: "center" }}>
            <div style={{ ...bold, fontSize: "clamp(2rem, 10vw, 3rem)", color: LIME, marginBottom: "0.4rem" }}>you're in.</div>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "#666", textTransform: "uppercase", marginBottom: "1.2rem" }}>
              {form.guests === 1 ? "just you" : `you + ${form.guests - 1}`} · {form.name}
            </div>
            <div style={{ fontSize: "0.62rem", color: "#777", lineHeight: 1.9, marginBottom: "1.5rem" }}>
              Don't share the coordinates.<br />Bring good energy. See you there.
            </div>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <MapBtn label="Apple Maps" url={APPLE_MAPS} />
              <MapBtn label="Google Maps" url={GOOGLE_MAPS} />
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <span style={{ ...bold, fontSize: "0.65rem", color: "#222" }}>if you know, you know.</span>
        </div>
      </div>
    </div>
  );
}

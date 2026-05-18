import { useState, useEffect } from "react";

const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

const COORDS = { lat: 18.4655, lng: -66.1057, label: "18.4655° N, 66.1057° W" };
const APPLE_MAPS = `https://maps.apple.com/?q=${COORDS.lat},${COORDS.lng}`;
const GOOGLE_MAPS = `https://www.google.com/maps?q=${COORDS.lat},${COORDS.lng}`;

export default function SecretSets() {
  const [step, setStep] = useState("reveal");
  const [form, setForm] = useState({ name: "", guests: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(false);
  const [ejsReady, setEjsReady] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
      setEjsReady(true);
    };
    document.head.appendChild(script);
  }, []);

  const handleSubmit = async () => {
    if (!form.name.trim() || !ejsReady) return;
    setSubmitting(true);
    setError("");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name.trim(),
        guests: form.guests,
        guest_label: form.guests === 1 ? "Just them" : `+${form.guests - 1} guest${form.guests - 1 > 1 ? "s" : ""}`,
        reply_to: "secretsets.co@gmail.com",
      });
      setStep("done");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#f0ede6",
      fontFamily: "'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem",
      position: "relative",
      overflow: "hidden",
    }}>



      {/* Glow */}
      <div style={{
        position: "fixed", top: "-100px", left: "50%",
        transform: "translateX(-50%)",
        width: "600px", height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(210,255,0,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "420px" }}>

        {/* Top badge */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span style={{
            fontSize: "0.5rem", letterSpacing: "0.5em",
            color: "#d2ff00", textTransform: "uppercase",
            border: "1px solid rgba(210,255,0,0.3)",
            padding: "0.35rem 1rem",
            display: "inline-block",
          }}>Secret Sets</span>
        </div>

        {/* Title block */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            fontFamily: "'Arial Black', sans-serif",
            fontWeight: 900, fontSize: "clamp(2.5rem, 14vw, 5rem)",
            lineHeight: 0.88, letterSpacing: "-0.02em",
            textTransform: "uppercase", color: "#f0ede6",
          }}>
            <div style={{ fontSize: "0.28em", letterSpacing: "0.3em", color: "#888", fontWeight: 400, marginBottom: "0.5rem" }}>Pop-Up</div>
            Beach<br />
            <span style={{ color: "#d2ff00" }}>Rave</span>
          </div>
          <div style={{ marginTop: "1rem", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#666", textTransform: "uppercase" }}>
            Puerto Rico · June 13, 2026 · 6:30 PM
          </div>
          <div style={{ marginTop: "0.4rem", fontSize: "0.65rem", color: "#aaa", fontStyle: "italic" }}>
            Tunes by <span style={{ color: "#d2ff00", fontStyle: "normal", fontWeight: "bold" }}>DJ Jahi</span>
          </div>
        </div>

        {/* === LOCATION REVEAL === */}
        {step === "reveal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Location card */}
            <div style={{
              border: "1px solid rgba(210,255,0,0.2)",
              padding: "1.5rem",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", top: "-10px", left: "20px",
                background: "#0a0a0a", padding: "0 8px",
                fontSize: "0.48rem", letterSpacing: "0.3em",
                color: "#d2ff00", textTransform: "uppercase",
              }}>Location</div>

              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "clamp(0.9rem, 4vw, 1.2rem)",
                  color: "#d2ff00", letterSpacing: "0.1em",
                  marginBottom: "1.2rem",
                  padding: "0.8rem",
                  border: "1px solid rgba(210,255,0,0.15)",
                  background: "rgba(210,255,0,0.04)",
                }}>
                  {COORDS.label}
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a href={APPLE_MAPS} target="_blank" rel="noreferrer" style={{
                    flex: 1, padding: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#f0ede6", textDecoration: "none",
                    fontSize: "0.6rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", textAlign: "center",
                    transition: "border-color 0.2s, color 0.2s",
                    display: "block",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#d2ff00"; e.currentTarget.style.color = "#d2ff00"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#f0ede6"; }}
                  >
                    Apple Maps
                  </a>
                  <a href={GOOGLE_MAPS} target="_blank" rel="noreferrer" style={{
                    flex: 1, padding: "0.75rem",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#f0ede6", textDecoration: "none",
                    fontSize: "0.6rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", textAlign: "center",
                    transition: "border-color 0.2s, color 0.2s",
                    display: "block",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#d2ff00"; e.currentTarget.style.color = "#d2ff00"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#f0ede6"; }}
                  >
                    Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* RSVP CTA */}
            <button
              onClick={() => setStep("rsvp")}
              style={{
                background: "transparent", color: "#f0ede6",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer", padding: "1rem",
                fontFamily: "'Courier New', monospace",
                fontSize: "0.65rem", letterSpacing: "0.25em",
                textTransform: "uppercase",
                transition: "border-color 0.2s, color 0.2s",
                width: "100%",
              }}
              onMouseEnter={e => { e.target.style.borderColor = "#d2ff00"; e.target.style.color = "#d2ff00"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "#f0ede6"; }}
            >
              RSVP →
            </button>
          </div>
        )}

        {/* === RSVP FORM === */}
        {step === "rsvp" && (
          <div style={{
            border: "1px solid rgba(210,255,0,0.2)",
            padding: "1.5rem",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: "-10px", left: "20px",
              background: "#0a0a0a", padding: "0 8px",
              fontSize: "0.48rem", letterSpacing: "0.3em",
              color: "#d2ff00", textTransform: "uppercase",
            }}>RSVP</div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{
                  display: "block", fontSize: "0.5rem",
                  letterSpacing: "0.3em", color: "#666",
                  textTransform: "uppercase", marginBottom: "0.5rem",
                }}>Your Name</label>
                <input
                  type="text"
                  placeholder="First & Last"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#f0ede6", padding: "0.75rem 1rem",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.85rem", outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = "#d2ff00"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
                />
              </div>

              <div>
                <label style={{
                  display: "block", fontSize: "0.5rem",
                  letterSpacing: "0.3em", color: "#666",
                  textTransform: "uppercase", marginBottom: "0.5rem",
                }}>How many people (including you)?</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[1, 2, 3, 4].map(n => (
                    <button
                      key={n}
                      onClick={() => setForm(f => ({ ...f, guests: n }))}
                      style={{
                        flex: 1, padding: "0.75rem",
                        background: form.guests === n ? "#d2ff00" : "transparent",
                        border: `1px solid ${form.guests === n ? "#d2ff00" : "rgba(255,255,255,0.15)"}`,
                        color: form.guests === n ? "#0a0a0a" : "#f0ede6",
                        fontFamily: "'Arial Black', sans-serif",
                        fontWeight: 900, fontSize: "1rem",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                    >{n}</button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!form.name.trim() || submitting}
                style={{
                  marginTop: "0.5rem",
                  background: form.name.trim() ? "#d2ff00" : "rgba(210,255,0,0.15)",
                  color: form.name.trim() ? "#0a0a0a" : "#666",
                  border: "none", cursor: form.name.trim() ? "pointer" : "not-allowed",
                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: 900, fontSize: "0.7rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "1rem", width: "100%",
                  transition: "all 0.2s",
                }}
              >
                {submitting ? "Locking you in..." : "Lock In My Spot"}
              </button>

              {error && (
                <div style={{
                  fontSize: "0.6rem", letterSpacing: "0.1em",
                  color: "#ff5555", textAlign: "center",
                  border: "1px solid rgba(255,85,85,0.3)",
                  padding: "0.6rem",
                }}>{error}</div>
              )}

              <button
                onClick={() => setStep("reveal")}
                style={{
                  background: "transparent", border: "none",
                  color: "#555", cursor: "pointer",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.55rem", letterSpacing: "0.2em",
                  textTransform: "uppercase", textDecoration: "underline",
                }}
              >← Back</button>
            </div>
          </div>
        )}

        {/* === DONE === */}
        {step === "done" && (
          <div style={{
            border: "1px solid rgba(210,255,0,0.4)",
            padding: "2rem 1.5rem",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "'Arial Black', sans-serif",
              fontWeight: 900, fontSize: "2rem",
              color: "#d2ff00", marginBottom: "0.5rem",
            }}>You're In.</div>
            <div style={{
              fontSize: "0.6rem", letterSpacing: "0.2em",
              color: "#666", textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}>
              {form.guests === 1 ? "Just you" : `You + ${form.guests - 1}`} · {form.name}
            </div>
            <div style={{
              fontSize: "0.65rem", color: "#888",
              lineHeight: 1.8, marginBottom: "1.5rem",
            }}>
              Don't share the coordinates.<br />
              Bring good energy. See you there.
            </div>
            <div style={{
              display: "flex", gap: "0.75rem",
            }}>
              <a href={APPLE_MAPS} target="_blank" rel="noreferrer" style={{
                flex: 1, padding: "0.75rem",
                border: "1px solid rgba(210,255,0,0.3)",
                color: "#d2ff00", textDecoration: "none",
                fontSize: "0.55rem", letterSpacing: "0.15em",
                textTransform: "uppercase", textAlign: "center",
                display: "block",
              }}>Apple Maps</a>
              <a href={GOOGLE_MAPS} target="_blank" rel="noreferrer" style={{
                flex: 1, padding: "0.75rem",
                border: "1px solid rgba(210,255,0,0.3)",
                color: "#d2ff00", textDecoration: "none",
                fontSize: "0.55rem", letterSpacing: "0.15em",
                textTransform: "uppercase", textAlign: "center",
                display: "block",
              }}>Google Maps</a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <span style={{
            fontSize: "0.45rem", letterSpacing: "0.3em",
            color: "#333", textTransform: "uppercase",
          }}>If you know, you know.</span>
        </div>

      </div>
    </div>
  );
}

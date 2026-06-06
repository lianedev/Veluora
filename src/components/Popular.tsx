"use client"
import { useState, useEffect } from "react";

const perfumes = [
  { id: 1, name: "Oud Noir", sub: "Dark Amber & Resin", price: 285, orig: 320, rating: 4.9, rev: 2341, badge: "Best Seller", badgeStyle: { background: "#c9a84c", color: "#3d2800" }, notes: ["Oud", "Amber", "Musk"], intensity: "Intense", size: "50ml", desc: "A bold, resinous journey into the heart of ancient oud forests. Rich and complex." },
  { id: 2, name: "Lumière Blanche", sub: "White Florals & Vanilla", price: 195, orig: null, rating: 4.8, rev: 1876, badge: "New", badgeStyle: { background: "#1a1714", color: "#faf9f7" }, notes: ["Jasmine", "Tuberose", "Vanilla"], intensity: "Soft", size: "75ml", desc: "Ethereal white petals kissed by warm vanilla and the softest skin musk." },
  { id: 3, name: "Nuit Sauvage", sub: "Bergamot & Cedar", price: 240, orig: 270, rating: 4.7, rev: 3102, badge: "Fan Favorite", badgeStyle: { background: "#f0ebe2", color: "#6b5c44", border: "1px solid #d4cdc5" }, notes: ["Bergamot", "Cedar", "Vetiver"], intensity: "Fresh", size: "100ml", desc: "A crisp forested night — the snap of cold air through ancient cedars." },
  { id: 4, name: "Rose Éternelle", sub: "Rose Absolute & Patchouli", price: 320, orig: null, rating: 4.9, rev: 987, badge: "Limited", badgeStyle: { background: "#8b3a52", color: "#fef0f4" }, notes: ["Rose", "Patchouli", "Sandalwood"], intensity: "Rich", size: "50ml", desc: "The finest Bulgarian rose, deepened with earthy patchouli and warm sandalwood." },
];

const FILTERS = ["All", "Soft", "Fresh", "Rich", "Intense"];

function useBreakpoint() {
  const [bp, setBp] = useState("lg");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 480 ? "xs" : w < 768 ? "sm" : w < 1024 ? "md" : "lg");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

function Bottle({ dark }: { dark: boolean }) {
  const c = dark ? "rgba(201,168,76,0.9)" : "rgba(26,23,20,0.8)";
  return (
    <svg width="70" height="105" viewBox="0 0 90 130" fill="none">
      <rect x="37" y="2" width="16" height="10" rx="1" fill={c} opacity=".8" />
      <rect x="33" y="12" width="24" height="7" rx="1" fill={c} opacity=".6" />
      <rect x="22" y="19" width="46" height="7" rx="1" fill={c} opacity=".4" />
      <rect x="18" y="26" width="54" height="84" rx="4" fill={dark ? "rgba(0,0,0,0.2)" : "rgba(240,235,226,0.4)"} stroke={c} strokeWidth="1" />
      <ellipse cx="36" cy="50" rx="7" ry="16" fill={c} opacity=".06" />
      <text x="45" y="68" textAnchor="middle" fill={c} fontSize="7" fontFamily="Playfair Display,serif" fontStyle="italic" opacity=".8">Veloura</text>
      <text x="45" y="78" textAnchor="middle" fill={c} fontSize="5.5" fontFamily="sans-serif" opacity=".5" letterSpacing="2">PARFUM</text>
    </svg>
  );
}

export default function VelouraPopularSection() {
  const [activeId, setActiveId] = useState<number>(1);
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [wish, setWish] = useState<Set<number>>(new Set());
  const bp = useBreakpoint();

  const toggleCart = (id: number) => setCart(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleWish = (id: number) => setWish(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const active = perfumes.find(p => p.id === activeId);
  const list = perfumes.filter(p => filter === "All" || p.intensity === filter);

  const isMobile = bp === "xs" || bp === "sm";
  const isTablet = bp === "md";

  const gridCols = bp === "xs" ? "repeat(2, 1fr)" : bp === "sm" ? "repeat(2, 1fr)" : bp === "md" ? "repeat(3, 1fr)" : "repeat(4, 1fr)";
  const sectionPad = isMobile ? "48px 20px" : isTablet ? "60px 32px" : "72px 40px";
  const titleSize = isMobile ? "32px" : isTablet ? "44px" : "clamp(38px,5vw,58px)";

  return (
    <div style={{ fontFamily: "'Jost', sans-serif", background: "#faf9f7", color: "#1a1714", padding: sectionPad, width: "100%" }}>

      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: isMobile ? "flex-start" : "flex-end",
        justifyContent: "space-between",
        flexDirection: isMobile ? "column" : "row",
        marginBottom: isMobile ? 36 : 52,
        gap: isMobile ? 24 : 20,
      }}>
        <div>
          <p style={{ fontSize: 11, letterSpacing: ".35em", textTransform: "uppercase", color: "#2e2720", marginBottom: 10, fontWeight: 400 }}>
            The Collection
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: titleSize, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.02em", margin: 0 }}>
            Most loved<br /><em>by our clients</em>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", gap: 14, width: isMobile ? "100%" : "auto" }}>
          {/* Filters — scroll horizontally on mobile */}
          <div style={{
            display: "flex", gap: 6, flexWrap: isMobile ? "nowrap" : "wrap",
            justifyContent: isMobile ? "flex-start" : "flex-end",
            overflowX: isMobile ? "auto" : "visible",
            paddingBottom: isMobile ? 4 : 0,
            width: isMobile ? "100%" : "auto",
            WebkitOverflowScrolling: "touch",
          }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "6px 14px",
                border: `1px solid ${filter === f ? "#1a1714" : "#d4cdc5"}`,
                background: filter === f ? "#1a1714" : "transparent",
                color: filter === f ? "#faf9f7" : "#6b6158",
                fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "'Jost',sans-serif", fontWeight: 400,
                borderRadius: 0, whiteSpace: "nowrap", flexShrink: 0,
              }}>{f}</button>
            ))}
          </div>
          <button style={{
            fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase",
            background: "transparent", border: "none", borderBottom: "1px solid #1a1714",
            cursor: "pointer", fontFamily: "'Jost',sans-serif", paddingBottom: 2, color: "#1a1714",
          }}>
            View all fragrances
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 1, background: "#e8e3dc", border: "1px solid #e8e3dc", marginBottom: isMobile ? 36 : 56 }}>
        {list.map(p => {
          const isA = p.id === activeId;
          return (
            <div key={p.id} onClick={() => setActiveId(p.id)} style={{
              background: isA ? "#1a1714" : "#faf9f7",
              padding: isMobile ? "20px 14px 18px" : "28px 20px 24px",
              cursor: "pointer", position: "relative", display: "flex", flexDirection: "column",
              transition: "background .22s",
            }}>
              {/* Image area */}
              <div style={{
                width: "100%", aspectRatio: "3/4",
                background: isA ? "#2e2720" : "#f0ebe2",
                marginBottom: isMobile ? 12 : 18,
                display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
              }}>
                <span style={{
                  position: "absolute", top: 8, left: 8,
                  fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase",
                  padding: "3px 7px", fontWeight: 500, ...p.badgeStyle,
                }}>{p.badge}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
                  style={{
                    position: "absolute", top: 6, right: 8,
                    background: "transparent", border: "none", cursor: "pointer",
                    fontSize: 14, color: wish.has(p.id) ? "#c05070" : (isA ? "#8a7e72" : "#b0a89e"),
                  }}
                  aria-label="Wishlist"
                >
                  {wish.has(p.id) ? "♥" : "♡"}
                </button>
                <Bottle dark={isA} />
              </div>

              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 14 : 17, fontWeight: 700, color: isA ? "#f5f0e8" : "#1a1714", marginBottom: 2, letterSpacing: "-.01em", lineHeight: 1.2 }}>{p.name}</p>
              <p style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: isA ? "#8a7e72" : "#9a8c7e", marginBottom: isMobile ? 8 : 10, fontWeight: 300 }}>{p.sub}</p>

              {/* Notes — hide on xs to save space */}
              {bp !== "xs" && (
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                  {p.notes.map(n => (
                    <span key={n} style={{ fontSize: 9, padding: "2px 6px", border: `1px solid ${isA ? "#4a3e32" : "#d4cdc5"}`, color: isA ? "#b8a890" : "#6b6158", letterSpacing: ".05em" }}>{n}</span>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{ width: 9, height: 9, background: i <= Math.round(p.rating) ? "#c9a84c" : "#d4cdc5", clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)" }} />
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${isA ? "#3a3028" : "#e8e3dc"}`, marginTop: "auto" }}>
                <div>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 15 : 19, fontWeight: 700, color: isA ? "#f5f0e8" : "#1a1714" }}>${p.price}</span>
                  {p.orig && <span style={{ fontSize: 11, textDecoration: "line-through", color: "#b0a89e", marginLeft: 4 }}>${p.orig}</span>}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleCart(p.id); }}
                  aria-label="Add to cart"
                  style={{
                    width: 30, height: 30, borderRadius: "50%",
                    border: `1px solid ${cart.has(p.id) ? "#c9a84c" : (isA ? "#6a5e50" : "#d4cdc5")}`,
                    background: cart.has(p.id) ? "#c9a84c" : "transparent",
                    cursor: "pointer", fontSize: 15,
                    color: cart.has(p.id) ? "#3d2800" : (isA ? "#f5f0e8" : "#1a1714"),
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >{cart.has(p.id) ? "✓" : "+"}</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature strip */}
      {active && (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          background: "#1a1714",
          overflow: "hidden",
        }}>
          {/* Left panel */}
          <div style={{ padding: isMobile ? "32px 24px" : "40px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#9a8c7e", fontFamily: "'Jost',sans-serif", marginBottom: 10 }}>Featured fragrance</p>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 28 : "clamp(26px,3.5vw,40px)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.1, letterSpacing: "-.02em", marginBottom: 10 }}>
                {active.name.split(" ")[0]}<br />
                <em style={{ color: "#c9a84c" }}>{active.name.split(" ").slice(1).join(" ")}</em>
              </h3>
              <p style={{ fontSize: 13, color: "rgba(245,240,232,.5)", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>{active.desc}</p>
              <button style={{
                padding: isMobile ? "12px 24px" : "13px 32px",
                background: "#c9a84c", color: "#1a1714",
                fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase",
                border: "none", cursor: "pointer", fontWeight: 500,
                width: isMobile ? "100%" : "auto",
              }}>
                Discover {active.name}
              </button>
            </div>

            <div style={{ display: "flex", gap: isMobile ? 16 : 20, flexWrap: "wrap" }}>
              {[{ v: active.rating, l: "Rating" }, { v: active.rev.toLocaleString(), l: "Reviews" }, { v: active.size, l: "Size" }].map(s => (
                <div key={s.l} style={{ borderTop: "1px solid rgba(245,240,232,.1)", paddingTop: 14, minWidth: 60 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 20 : 26, fontWeight: 700, color: "#c9a84c", marginBottom: 3 }}>{s.v}</div>
                  <div style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,240,232,.35)", fontFamily: "'Jost',sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{
            background: "#221e18",
            padding: isMobile ? "28px 24px 32px" : "40px 36px",
            display: "flex", flexDirection: "column", gap: isMobile ? 20 : 28, justifyContent: "center",
            borderTop: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none",
          }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#9a8c7e", fontFamily: "'Jost',sans-serif", marginBottom: 12 }}>Scent profile</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {active.notes.map(n => (
                  <span key={n} style={{ fontSize: 10, padding: "4px 10px", border: "1px solid rgba(201,168,76,.4)", color: "#c9a84c", letterSpacing: ".08em", fontFamily: "'Jost',sans-serif" }}>{n}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#9a8c7e", fontFamily: "'Jost',sans-serif", marginBottom: 10 }}>Intensity</p>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {["Soft","Fresh","Rich","Intense"].map(l => (
                  <div key={l} style={{ width: 13, height: 13, borderRadius: "50%", background: l === active.intensity ? "#c9a84c" : "rgba(245,240,232,.12)", border: `1px solid ${l === active.intensity ? "#c9a84c" : "rgba(245,240,232,.2)"}` }} />
                ))}
                <span style={{ fontSize: 11, color: "rgba(245,240,232,.45)", letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif", marginLeft: 4 }}>{active.intensity}</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#9a8c7e", fontFamily: "'Jost',sans-serif", marginBottom: 10 }}>Price</p>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 28 : 34, fontWeight: 700, color: "#f5f0e8", display: "flex", alignItems: "baseline", gap: 8 }}>
                ${active.price}
                {active.orig && (
                  <span style={{ fontSize: 15, textDecoration: "line-through", color: "rgba(245,240,232,.3)", fontFamily: "'Jost',sans-serif" }}>${active.orig}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
"use client"
import { useState, useEffect } from "react";

const perfumes = [
  {
    id: 1, name: "Genial Attitude EDP 100ml",
    price: 45, orig: null, rating: 4.8,
    badge: "Best Seller", badgeStyle: { background: "#c9a84c", color: "#3d2800" },
    notes: ["Oud", "Amber", "Musk"], intensity: "Intense",
    imgBg: "#f5ede8", bottleAccent: ["#d4a0a0", "#c87878"],
  },
  {
    id: 2, name: "Sheer Beauty EDT 100ml",
    price: 45, orig: 60, rating: 4.7,
    badge: "New", badgeStyle: { background: "#1a1714", color: "#faf9f7" },
    notes: ["Bergamot", "Cedar", "Vetiver"], intensity: "Fresh",
    imgBg: "#e8edf5", bottleAccent: ["#7a8fa8", "#4a6a8a"],
  },
  {
    id: 3, name: "Shuhrah Perfume Men EDP 90ml",
    price: 45, orig: null, rating: 4.9,
    badge: null, badgeStyle: null,
    notes: ["Rose", "Patchouli", "Sandalwood"], intensity: "Rich",
    imgBg: "#f0f5e8", bottleAccent: ["#8aab70", "#5a8040"],
  },
  {
    id: 4, name: "Classic Gold EDT For Men 100ml",
    price: 45, orig: null, rating: 4.6,
    badge: "Limited", badgeStyle: { background: "#8b3a52", color: "#fef0f4" },
    notes: ["Jasmine", "Tuberose", "Vanilla"], intensity: "Soft",
    imgBg: "#f5eaf0", bottleAccent: ["#2a2a2a", "#c9a84c"],
  },
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

function BottleSVG({ body, cap }: { body: string; cap: string }) {
  return (
    <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
      <rect x="33" y="2" width="14" height="9" rx="1" fill={cap} opacity=".9" />
      <rect x="29" y="11" width="22" height="6" rx="1" fill={cap} opacity=".7" />
      <rect x="24" y="17" width="32" height="6" rx="1" fill={cap} opacity=".5" />
      <rect x="16" y="23" width="48" height="75" rx="3" fill={body} opacity=".22" stroke={body} strokeWidth="1" />
      <rect x="18" y="25" width="44" height="71" rx="2" fill={body} opacity=".12" />
      <ellipse cx="30" cy="45" rx="6" ry="14" fill="white" opacity=".18" />
      <text x="40" y="64" textAnchor="middle" fill={cap} fontSize="6" fontFamily="Playfair Display,serif" fontStyle="italic" opacity=".9">Veloura</text>
      <text x="40" y="73" textAnchor="middle" fill={cap} fontSize="4.5" fontFamily="sans-serif" opacity=".6" letterSpacing="1.5">PARFUM</text>
    </svg>
  );
}

export default function VelouraNewProducts() {
  const [filter, setFilter] = useState("All");
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [wish, setWish] = useState<Set<number>>(new Set());
  const bp = useBreakpoint();

  const toggleCart = (id: number) => setCart(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  const toggleWish = (id: number) => setWish(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const list = perfumes.filter(p => filter === "All" || p.intensity === filter);
  const isMobile = bp === "xs" || bp === "sm";
  const isTablet = bp === "md";

  const gridCols = bp === "xs" ? "repeat(2, 1fr)" : bp === "sm" ? "repeat(2, 1fr)" : bp === "md" ? "repeat(3, 1fr)" : "repeat(4, 1fr)";
  const sectionPad = isMobile ? "40px 16px 52px" : isTablet ? "52px 28px 60px" : "56px 32px 64px";

  return (
    <div style={{ background: "background: #fdfdfb", padding: sectionPad, fontFamily: "'Jost', sans-serif", width: "100%" }}>

      {/* Section title */}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: isMobile ? 28 : isTablet ? 34 : 40,
        fontWeight: 300,
        textAlign: "center",
        color: "#1a1714",
        marginBottom: isMobile ? 28 : 40,
        letterSpacing: "-.01em",
      }}>
        Our <em>Products</em>
      </h2>

      {/* Filters */}
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: isMobile ? 28 : 40, flexWrap: "wrap", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 4 : 0 }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "6px 16px",
            border: `0.5px solid ${filter === f ? "#1a1714" : "#c8c0b6"}`,
            background: filter === f ? "#1a1714" : "transparent",
            color: filter === f ? "#fff" : "#6b6158",
            fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: "'Jost',sans-serif", fontWeight: 400,
            borderRadius: 0, whiteSpace: "nowrap",
          }}>{f}</button>
        ))}
      </div>

      {/* Product grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: gridCols,
        border: "0.5px solid #e8e3dc",
        borderRight: "none",
        borderBottom: "none",
      }}>
        {list.map(p => {
          const inCart = cart.has(p.id);
          const inWish = wish.has(p.id);
          const [body, cap] = p.bottleAccent;

          return (
            <div key={p.id} style={{
              borderRight: "0.5px solid #e8e3dc",
              borderBottom: "0.5px solid #e8e3dc",
              background: "#fff",
              display: "flex", flexDirection: "column",
              paddingBottom: 20,
              transition: "background .18s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#faf9f7"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              {/* Image area */}
              <div style={{
                width: "100%", aspectRatio: "3/4",
                background: p.imgBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", marginBottom: isMobile ? 12 : 16, overflow: "hidden",
              }}>
                {p.badge && (
                  <span style={{
                    position: "absolute", top: 10, left: 10,
                    fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase",
                    padding: "3px 8px", fontWeight: 500, zIndex: 2,
                    ...p.badgeStyle,
                  }}>{p.badge}</span>
                )}
                <button
                  onClick={() => toggleWish(p.id)}
                  aria-label="Add to wishlist"
                  style={{
                    position: "absolute", top: 8, right: 10,
                    background: "transparent", border: "none", cursor: "pointer",
                    fontSize: 17, lineHeight: 1, padding: 4, zIndex: 2,
                    color: inWish ? "#c05070" : "#c8c0b6", transition: "color .15s",
                  }}
                >{inWish ? "♥" : "♡"}</button>

                <BottleSVG body={body} cap={cap} />
              </div>

              {/* Card body */}
              <div style={{ padding: "0 16px" }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                  {[1,2,3,4,5].map(i => (
                    <div key={i} style={{
                      width: 9, height: 9,
                      background: i <= Math.round(p.rating) ? "#c9a84c" : "#e0dbd4",
                      clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                    }} />
                  ))}
                </div>

                {/* Name */}
                <p style={{
                  fontSize: isMobile ? 10 : 12, fontWeight: 400,
                  letterSpacing: ".06em", textTransform: "uppercase",
                  color: "#1a1714", marginBottom: 8, lineHeight: 1.5,
                }}>{p.name}</p>

                {/* Notes — hidden on xs */}
                {bp !== "xs" && (
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                    {p.notes.map(n => (
                      <span key={n} style={{
                        fontSize: 9, padding: "2px 6px",
                        border: "0.5px solid #d4cdc5", color: "#8a8070",
                        letterSpacing: ".05em",
                      }}>{n}</span>
                    ))}
                  </div>
                )}

                {/* Price + cart */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <div>
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 18 : 22, fontWeight: 400, color: "#1a1714" }}>
                      ${p.price}
                    </span>
                    {p.orig && (
                      <span style={{ fontSize: 12, textDecoration: "line-through", color: "#b0a89e", marginLeft: 5, fontFamily: "'Jost',sans-serif" }}>
                        ${p.orig}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleCart(p.id)}
                    aria-label="Add to cart"
                    style={{
                      width: 34, height: 34, border: `0.5px solid ${inCart ? "#c9a84c" : "#c8c0b6"}`,
                      background: inCart ? "#c9a84c" : "transparent",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 0, color: inCart ? "#fff" : "#1a1714", fontSize: 16,
                      transition: "all .18s",
                    }}
                  >
                    {inCart ? "✓" : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
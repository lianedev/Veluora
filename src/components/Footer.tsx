"use client"
import { useState, useEffect } from "react";

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

const socialLinks = [
  { label: "Facebook",  icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
  { label: "TikTok",    icon: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" },
  { label: "Instagram", icon: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" },
  { label: "LinkedIn",  icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
  { label: "YouTube",   icon: "M22.54 6.42A2.78 2.78 0 0 0 20.6 4.46C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
  { label: "Snapchat",  icon: "M12 2C8.13 2 5 5.13 5 9c0 2.38.96 4.54 2.49 6.12L3 17l1 2 4-1.5c1.19.94 2.68 1.5 4.32 1.5 3.87 0 7-3.13 7-7S15.87 2 12 2z" },
];

const companyLinks = ["About Veloura", "Contact Us", "Careers", "Brands"];
const supportLinks = ["Help Center", "Track Order", "Shipping Info", "Returns", "How to Order", ];
const quickLinks   = [, "Sitemap", "My Orders", "Cart", ];

export default function VelouraFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const bp = useBreakpoint();
  const isMobile = bp === "xs" || bp === "sm";
  const isTablet  = bp === "md";

  const handleSubscribe = () => {
    if (email.includes("@")) { setSubmitted(true); setEmail(""); }
  };

  const pad = isMobile ? "0 16px" : isTablet ? "0 28px" : "0 40px";
  const linkStyle = { fontSize: 13, color: "#6b6158", textDecoration: "none", fontWeight: 300, fontFamily: "'Jost',sans-serif", lineHeight: 1 };

  return (
    <footer style={{ fontFamily: "'Jost',sans-serif", background: "#f7f5f1", color: "#1a1714", width: "100%" }}>

      {/* Top bar — Follow + Newsletter */}
     <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          padding: "28px 40px",
          borderBottom: "0.5px solid #ddd8d0",
          gap: isMobile ? 20 : 24,
          flexWrap: "wrap",
        }}
        >
        {/* Follow us */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap" }}>
            Follow Us
          </span>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {socialLinks.map(s => (
              <a key={s.label} href="#" aria-label={s.label} style={{ color: "#1a1714", lineHeight: 1, display: "flex" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", fontWeight: 500, whiteSpace: "nowrap" }}>
            Join Our Newsletter
          </span>
          <div style={{ display: "flex", alignItems: "center", border: "0.5px solid #c8c0b6", background: "#fff", overflow: "hidden", width: isMobile ? "100%" : "auto" }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubscribe()}
              placeholder={submitted ? "Thank you!" : "Email Address"}
              aria-label="Email address for newsletter"
              style={{
                border: "none", outline: "none", padding: "10px 16px",
                fontSize: 13, fontFamily: "'Jost',sans-serif", color: "#1a1714",
                background: "transparent", width: isMobile ? "100%" : 220,
              }}
            />
            <button
              onClick={handleSubscribe}
              aria-label="Subscribe"
              style={{
                width: 40, height: 40, background: "#1a1714", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Middle — brand + link columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "1.2fr 1fr 1fr" : "1.4fr 1fr 1fr 1fr",
        gap: isMobile ? "32px 24px" : 40,
        padding: `48px 40px 44px`,
        borderBottom: "0.5px solid #ddd8d0",
      }}>
        {/* Brand — span full row on mobile */}
        <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
          <div style={{
            fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700,
            letterSpacing: ".12em", textTransform: "uppercase", color: "#1a1714", marginBottom: 14,
          }}>Veloura</div>
          <p style={{ fontSize: 13, color: "#9a8c7e", lineHeight: 1.7, fontWeight: 300, maxWidth: 220 }}>
            Discover the beauty of fragrance with our collection of premium perfumes to enrich your everyday presence.
          </p>
        </div>

        {/* Company */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1714", marginBottom: 16, letterSpacing: ".02em" }}>Company</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {companyLinks.map(l => <li key={l}><a href="#" style={linkStyle}>{l}</a></li>)}
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1714", marginBottom: 16, letterSpacing: ".02em" }}>Help &amp; Support</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {supportLinks.map(l => <li key={l}><a href="#" style={linkStyle}>{l}</a></li>)}
          </ul>
        </div>

        {/* Quick Links — hidden on mobile to avoid overflow, merged into support */}
        {!isMobile && (
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#1a1714", marginBottom: 16, letterSpacing: ".02em" }}>Quick Links</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {quickLinks.map(l => <li key={l}><a href="#" style={linkStyle}>{l}</a></li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            padding: "18px 40px",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
        <span style={{ fontSize: 12, color: "#9a8c7e", letterSpacing: ".02em" }}>
          © 2026 Veloura, created By <a href="https://craftedpixels-kohl.vercel.app/" style={{ color: "#2e2720" }}>CraftedPixels</a> All rights reserved.
        </span>
        <nav aria-label="Legal links" style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms of Service"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#6b6158", textDecoration: "none", fontFamily: "'Jost',sans-serif" }}>{l}</a>
          ))}
        </nav>
      </div>

    </footer>
  );
}
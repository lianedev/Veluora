import Navbar from "../../src/components/Navbar";
import Footer from "../../src/components/Footer";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fdfdfb] text-[#2e2720] ">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-12">
        <div className="space-y-14 lg:space-y-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#6b6158]">
              Contact
            </p>
            <h1
              className={`${playfair.className} mt-6 text-4xl font-semibold tracking-tight sm:text-5xl`}
              style={{ fontFamily: playfair.style.fontFamily }}
            >
              Speak with the Veloura team.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#6b6158]">
              Whether you need fragrance advice, order support, or wholesale information, we’re here to help. Share your inquiry and we’ll respond within one business day.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[2rem] border border-[#e8e3dc] bg-white p-8 shadow-sm">
              <div className="text-lg font-semibold">Send us a message</div>
              <p className="mt-2 text-sm text-[#6b6158]">
                Fill out the form below and our customer care team will reply promptly.
              </p>

              <form className="mt-8 grid gap-6">
                <label className="grid gap-2 text-sm font-medium text-[#1a1714]">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-[#d4cdc5] bg-[#fbf7f1] px-4 py-3 text-sm text-[#2e2720] outline-none transition focus:border-[#2e2720] focus:ring-1 focus:ring-[#2e2720]/20"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-[#1a1714]">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-[#d4cdc5] bg-[#fbf7f1] px-4 py-3 text-sm text-[#2e2720] outline-none transition focus:border-[#2e2720] focus:ring-1 focus:ring-[#2e2720]/20"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-[#1a1714]">
                  <span>Message</span>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help you"
                    className="w-full rounded-2xl border border-[#d4cdc5] bg-[#fbf7f1] px-4 py-3 text-sm text-[#2e2720] outline-none transition focus:border-[#2e2720] focus:ring-1 focus:ring-[#2e2720]/20"
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-[#1a1714] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#2e2720]"
                >
                  Send message
                </button>
              </form>
            </div>

            <div className="space-y-8 rounded-[2rem] border border-[#e8e3dc] bg-[#faf6f0] p-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#6b6158]">
                  Contact details
                </p>
                <h2 className="mt-4 text-2xl font-semibold">We’re here to help.</h2>
              </div>

              <div className="space-y-6 text-sm text-[#6b6158]">
                <div>
                  <p className="font-semibold text-[#1a1714]">Customer care</p>
                  <p className="mt-3">support@veloura.com</p>
                  <p className="mt-1">(254) 700 000 000  </p>
                </div>

                <div>
                  <p className="font-semibold text-[#1a1714]">Boutique</p>
                  <p className="mt-3">Kenyatta Avenue, Nairobi</p>
                  <p className="mt-1">Mon – Fri, 9:00 AM – 6:00 PM</p>
                </div>

                <div>
                  <p className="font-semibold text-[#1a1714]">Quick support</p>
                  <ul className="mt-3 space-y-3">
                    <li>Order status & tracking</li>
                    <li>Returns & exchanges</li>
                    <li>Fragrance recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

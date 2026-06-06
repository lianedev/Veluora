import Navbar from "../src/components/Navbar";
import Landing from "../src/components/Landing";
import Popular from "../src/components/Popular";
import Models from "@/src/components/Models";
import NewProducts from "@/src/components/NewProduct";
import Footer from "@/src/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#fdfdfb] font-sans">
      <Navbar />
      <Landing />
      <Popular />
      <Models />
      {/* <CurvedLoop 
        marqueeText="essence ✦ elegance ✦ presence ✦ confidence ✦ luxury ✦"
        speed={2}
        curveAmount={0}
        direction="right"
        interactive
        className="text-[#1a1714] text-sm "
      />*/}
     <NewProducts />
     <Footer />

      
    </main>
  );
}
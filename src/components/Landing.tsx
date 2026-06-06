import Image from "next/image";
import Call from "../components/Call";

export default function Landing() {
  return (
    <div className="w-full h[-5vh]  relative">
      <Image
        src="/Hero-upscaled.jpg"
        alt="Veloura Hero"
        width={1280}
        height={720}
        priority
        className="w-full h-auto object-fit zoom-in "
      />
      
    </div>
  );
}
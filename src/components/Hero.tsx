import ScrollyCanvas from "./ScrollyCanvas";

export default function Hero() {
  return (
    <section id="hero" className="w-full relative">
      {/* The ScrollyCanvas handles its own 500vh height and sticky layout 
          for the actual hero visual and parallax text.
      */}
      <ScrollyCanvas />
    </section>
  );
}

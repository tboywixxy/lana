import Hero from "@/components/Hero";

export default function AboutPage() {
  return (
    <>
      <Hero />

      <section className="page-section">
        <div className="container narrow-container">
          <div className="page-heading center-heading">
            <p className="eyebrow">About us</p>
            <h1>Built for gym life, budget, and style</h1>
            <p className="page-subtext">
              LANA Active brings together quality new gym wear and carefully
              selected thrift pieces, plus workout accessories that perform. We
              keep shopping simple so you can focus on training.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
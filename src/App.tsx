import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { StepsSection } from "./components/StepsSection";
import { Simulator } from "./components/Simulator";
import { DnsSection } from "./components/DnsSection";
import { Finish } from "./components/Finish";
import { Footer } from "./components/Footer";
import { SubGate } from "./components/SubGate";

export default function App() {
  return (
    <div className="noise relative min-h-screen bg-void font-sans text-white antialiased">
      <SubGate />
      <Nav />
      <main>
        <Hero />
        <StepsSection />
        <Simulator />
        <DnsSection />
        <Finish />
      </main>
      <Footer />
    </div>
  );
}

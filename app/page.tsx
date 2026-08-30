import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { FuseProgress } from "@/components/fuse-progress";
import { LiveTicker } from "@/components/live-ticker";
import { Problem } from "@/components/problem";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Safety } from "@/components/safety";
import { Metrics } from "@/components/metrics";
import { Market } from "@/components/market";
import { Pricing } from "@/components/pricing";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { RegionProvider } from "@/components/region-context";

export default function Home() {
  return (
    <RegionProvider>
      <main className="relative">
        <Nav />
        <FuseProgress />
        <Hero />
        <LiveTicker />
        <Problem />
        <Features />
        <HowItWorks />
        <Safety />
        <Metrics />
        <Market />
        <Pricing />
        <CTA />
        <Footer />
      </main>
    </RegionProvider>
  );
}



// import { Nav } from "@/components/nav";
// import { Hero } from "@/components/hero";
// import { FuseProgress } from "@/components/fuse-progress";
// import { LiveTicker } from "@/components/live-ticker";
// import { Problem } from "@/components/problem";
// import { Features } from "@/components/features";
// import { HowItWorks } from "@/components/how-it-works";
// import { Safety } from "@/components/safety";
// import { Metrics } from "@/components/metrics";
// import { Market } from "@/components/market";
// import { Pricing } from "@/components/pricing";
// import { CTA } from "@/components/cta";
// import { Footer } from "@/components/footer";
// import { RegionProvider } from "@/components/region-context";

// export default function Home() {
//   return (
//     <RegionProvider>
//       <main className="relative">
//         <Nav />
//         <FuseProgress />
//         <Hero />
//         <LiveTicker />
//         <Problem />
//         <Features />
//         <HowItWorks />
//         <Safety />
//         <Metrics />
//         <Market />
//         <Pricing />
//         <CTA />
//         <Footer />
//       </main>
//     </RegionProvider>
//   );
// }

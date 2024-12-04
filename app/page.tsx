import Bento from "@/components/shared/Bento";
import { BusinessFocus } from "@/components/shared/BusinessFocus";
import { Create } from "@/components/shared/Create";
import { Footer } from "@/components/shared/Footer";
import { Hero } from "@/components/shared/Hero";
import { Navbar } from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Navbar />
        <Hero />
        <BusinessFocus/>
      </main>
     
        <Bento/>
        <Create/>
      <Footer />
    </>
  );
}

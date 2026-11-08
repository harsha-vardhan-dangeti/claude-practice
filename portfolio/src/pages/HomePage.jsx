import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import NowSnapshot from '../components/NowSnapshot';
import Contact from '../components/Contact';

// The home page is the one-scroll pitch: who, proof (live work), current
// role, then how to reach me — so a reviewer never has to hunt through tabs.
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <NowSnapshot />
      <Contact />
    </>
  );
}

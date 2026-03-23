import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Partners from '@/components/Partners';
import News from '@/components/News';
import History from '@/components/History';
import Gallery from '@/components/Gallery';
import Team from '@/components/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Team />
        <News />
        <History />
        <Gallery />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

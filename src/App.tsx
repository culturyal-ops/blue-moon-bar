import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Statement from './components/Statement';
import CurvedLoop from './components/CurvedLoop';
import BlueMoonTunnel from './components/BlueMoonTunnel';
import BarEditorial from './components/BarEditorial';
import Experience from './components/Experience';
import Food from './components/Food';
import Drinks from './components/Drinks';
import Evening from './components/Evening';
import Visit from './components/Visit';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Statement />
        <section className="experience-marquee">
          <CurvedLoop
            marqueeText="COLD GLASSES ✦ KERALA PLATES ✦ LONG EVENINGS ✦ "
            speed={1}
            curveAmount={75}
            direction="left"
            interactive={true}
            className="blue-moon-curved-text"
          />
        </section>
        <BlueMoonTunnel />
        <BarEditorial />
        <Experience />
        <Food />
        <Drinks />
        <Evening />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

export default App;

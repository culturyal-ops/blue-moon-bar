import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Statement from './components/Statement';
import CurvedLoop from './components/CurvedLoop';
import DomeGallerySection from './components/DomeGallerySection';
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
        <CurvedLoop
          marqueeText="KERALA PLATES ● COLD GLASSES ● LONG EVENINGS ● T.B. ROAD ● PALA ● "
          speed={1.5}
          curveAmount={70}
          direction="left"
          interactive={true}
        />
        <DomeGallerySection />
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

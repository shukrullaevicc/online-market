import './App.scss'
import { useLocation } from 'react-router-dom';
import Nav from './components/nav/Nav'
import RouteController from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import heroBG from './images/offer-banner.png'
import Card from './components/cards/Cards';
import WhyUs from './components/why-us/WhyUs';
import TopRated from './components/top-rated/TopRated';
import Footer from './components/footer/Footer';

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <Nav />
      {
        pathname === '/' && <img src={heroBG} alt="hero" className='hero-bg' />
      }
      {
        pathname === '/' && <Card />
      } 
      {
        pathname === '/' && <WhyUs />
      }
      {
        pathname === '/' && <TopRated />
      }
      {
        pathname === '/' && <Footer />
      }
      <RouteController />
      <ToastContainer />
    </>
  )
}

export default App

import './Footer.scss'
import logo from '../../images/logo.svg'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <img src={logo} alt="Tech Company Logo" />
          <ul className="footer__list">
            <li className="list__item"><a className="item__link" href="">Services</a></li>
            <li className="list__item"><a className="item__link" href="">About Us</a></li>
            <li className="list__item"><a className="item__link" href="">Custom Solutions</a></li>
            <li className="list__item"><a className="item__link" href="">Partners</a></li>
          </ul>
          <ul className="footer__list">
            <li className="list__item"><a className="item__link" href="">Case Studies</a></li>
            <li className="list__item"><a className="item__link" href="">Our Offices</a></li>
            <li className="list__item"><a className="item__link" href="">For Dealers</a></li>
            <li className="list__item"><a className="item__link" href="">Contact Us</a></li>
            <li className="list__item"><a className="item__link" href="">Configurator</a></li>
          </ul>
          <ul className="footer__list">
            <a className="item__link" href="tel:+380996384537">+998 (90) 960-57-91</a>
            <a className="footer__button" href="">Request a Consultation</a>
          </ul>
        </div>
      </div>
    </footer>

  )
}

export default Footer
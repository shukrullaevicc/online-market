import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import './Nav.scss'
import logo from '../../images/logo.svg'
import user from '../../images/user.png'
import home from '../../images/home.png'
import cart from '../../images/shopping-cart.png'
import heart from '../../images/heart.png'
import uzb from '../../images/uzbekistan.png'
import en from '../../images/usa.png'

const Nav = () => {
   const data = useTranslation();
   const { t, i18n } = useTranslation();

  return (
    <nav className='nav'>
      <div className="container">
         <div className='nav__wrapper'>
            <NavLink to='/' className='nav__logo'>
               <img src={logo} alt="" />
            </NavLink>
            <div className='nav__list'>
               <div className='list__item'>
                  <NavLink to='/auth' className='nav__link'>
                     <img className='nav__icon' src={user} alt="" />
                     <p className='item__text'>{t('user')}</p>
                  </NavLink>
               </div>
            </div>
            <select onChange={(e) => i18n.changeLanguage(e.target.value)} className='custom-select'>
               <option value="uz">UZB</option>
               <option value="en">ENGLISH</option>
            </select>
            <NavLink to='/favourite' className='nav__favourite'>
               <div className='favourite__count'>
                  {
                     localStorage.getItem('favouriteCount') ? <p>{localStorage.getItem('favouriteCount')}</p> : <p>0</p>
                  }
               </div>
               <img className='nav__icon' src={heart} alt="" />
            </NavLink>
            <NavLink to='/cart' className='nav__cart'>
               <div className='cart__count'>
                  {
                     localStorage.getItem('cartCount') ? <p>{localStorage.getItem('cartCount')}</p> : <p>0</p>
                  }
               </div>
               <img className='nav__icon' src={cart} alt="" />
            </NavLink>
         </div>
      </div>
    </nav>
  )
}

export default Nav
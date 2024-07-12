import './WhyUs.scss'
import { useTranslation } from 'react-i18next'
import shoes from '../../images/shoes.png'
import shipping from '../../images/shipping.svg'
import support from '../../images/support.svg'
import refund from '../../images/refund.svg'


const WhyUs = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className='shop-now'>
        <div className="container">
          <div className="show-now__wrapper">
            <div className='shop-now__content'>
              <h1 className='shop-now__title'>{t('shop now')}</h1>
              <p className='shop-now__text'>{t('shop now2')}</p>
              <button className='shop-now__btn'>{t('shop now3')}</button>
            </div>
            <img src={shoes} alt="" />
          </div>
        </div>
      </div>

      <div className='why-us'>
        <div className="container">
          <div className="why-us__cards">
            <div className='why-us__card'>
              <img src={shipping} alt="" />
              <h3 className='card__title'>{t('free Shipping')}</h3>
              <p className='card__text'>{t('free Shipping__text')}</p>
            </div>
            <div className='why-us__card'>
              <img src={refund} alt="" />
              <h3 className='card__title'>{t('100% REFUND')}</h3>
              <p className='card__text'>{t('100% REFUND__text')}</p>
            </div>
            <div className='why-us__card'>
              <img src={support} alt="" />
              <h3 className='card__title'>{t('support')}</h3>
              <p className='card__text'>{t('support__text')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhyUs
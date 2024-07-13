import { AiOutlineDelete, AiFillStar } from "react-icons/ai";
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import AppContext from '../../context/store';
import './Favourite.scss'

const Favourite = () => {
  const { t } = useTranslation();
  const [state, dispatch] = useContext(AppContext);
  const [storedProducts, setStoredProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('favouriteProducts'));
    setStoredProducts(storedProducts);
  }, []);

  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <AiFillStar key={index} />
    ));
  };

  // Add to favourite
  const handleRemoveFromFav = (id) => {
    const updatedProducts = storedProducts.filter(product => product.id !== id);
    setStoredProducts(updatedProducts);
    localStorage.setItem('favouriteProducts', JSON.stringify(updatedProducts));
    dispatch({ type: 'REMOVE_FROM_THE_FAVOURITE_LIST', id });
  };

  return (
    <div className='cards'>
      <div className="container">
        <h1 className="cards__title">{t('favoriteProduct')}</h1>
        <div className="cards__wrapper">
          {storedProducts.map((product) => (
            <div className='card' key={product.id}>
              <div className="card__img">
                <img src={product.image} alt={product.name} />
                <div className="card__icons">
                  <button onClick={() => handleRemoveFromFav(product.id)} className='product__remove'><AiOutlineDelete /></button>
                </div>
              </div>
              <div className="card__text">
                  <h3 className="card__title">{product.name}</h3>
                  <p className="card__rating">{renderStars(product.rating)}</p>
                  <div className="card__price-wrapper">
                    <p className="card__price">${product.price}</p>
                    <p className="card__discount">${product.price + 150}</p>
                    <p className='card__sale'>24% OFF</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favourite
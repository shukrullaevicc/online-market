import { useState, useEffect, useContext } from 'react';
import AppContext from '../../context/store';
import axios from '../../api';
import { useTranslation } from 'react-i18next'
import { AiFillStar } from "react-icons/ai"; 
import { Link } from "react-router-dom";
import { FaHeart } from 'react-icons/fa';
import './Cards.scss';

const Cards = () => {
  const { t, i18n } = useTranslation()
  const [state, dispatch] = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [favouriteCount, setFavouriteCount] = useState(() => {
    return JSON.parse(localStorage.getItem('favouriteCount')) || 0;
  }); // State for favourite count

  // Load products
  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem('favouriteCount', favouriteCount);
  }, [favouriteCount]); // Update localStorage whenever cartCount changes

  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <AiFillStar key={index} />
    ));
  };

  // Add to favourite
  const handleAddToFav = (product) => {
    let storedProducts = JSON.parse(localStorage.getItem('favouriteProducts')) || [];

    if(!storedProducts.some(p => p.id === product.id)) {
      storedProducts.push(product);
      localStorage.setItem('favouriteProducts', JSON.stringify(storedProducts));
      dispatch({ type: 'ADD_TO_THE_FAVOURITE_LIST', favourites: [product] });
      setFavouriteCount(favouriteCount + 1); // Increment cart count
    }
  };
  
  return (
    <div className='cards'>
      <div className="container">
        <h1 className="cards__title">{t('all products')}</h1>
        <div className="cards__wrapper">
          {products.map((product) => (
            <div className='card' key={product.id}>
              <div className="card__img">
                <img src={product.image} alt={product.name} />
                <div className="card__icons">
                  <button onClick={() => handleAddToFav(product)} className='icon'><FaHeart /></button>
                </div>
              </div>
              <div className="card__text">
                  <h3 className="card__title">{product.name}</h3>
                  <p className="card__rating">{renderStars(product.rating)}</p>
                  <div className="card__price-wrapper">
                    <p className="card__price">${product.price}</p>
                    <p className="card__discount">${(product.price * 1.24).toFixed(2)}</p>
                    <p className='card__sale'>24% OFF</p>
                  </div>
                  <Link to={`/single-page/${product.id}`}className="card__btn">{t('view details')}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
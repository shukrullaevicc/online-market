import axios from '../../api';
import { useEffect, useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import './TopRated.scss';
import { useTranslation } from 'react-i18next';

const TopRated = () => {
   const { t } = useTranslation();
   const [filteredProducts, setFilteredProducts] = useState([]);

   useEffect(() => {
      async function loadData() {
         try {
            const response = await axios.get('/products');
            const products = response.data;

            // Sort products by rating in descending order
            const sortedProducts = products.sort((a, b) => b.rating - a.rating);

            // Select the top 3 rated products
            const topRatedProducts = sortedProducts.slice(0, 3);

            setFilteredProducts(topRatedProducts);
         } 
         catch (error) {
            console.log(error);
         }
      }

      loadData();
   }, []);

   const renderStars = (rating) => {
      return Array.from({ length: rating }, (_, index) => (
        <AiFillStar key={index} />
      ));
   };

   return (
      <div className="top-rated">
         <div className="container">
            <div className="top-rated__wrapper">
               <h1>{t('top rated')}</h1>
               <div className='top-rated__cards'>
                  {
                     filteredProducts.map(product => (
                        <div className='top-rated__card' key={product.id}>
                           <img src={product.image} alt={product.name} />
                           <div className="top-rated__content">
                              <p className='top-rated__name'>{product.name}</p>
                              <p className="card__rating">{renderStars(product.rating)}</p>
                              <div className="card__price-wrapper">
                                 <p className="card__price">${product.price}</p>
                                 <p className="card__discount">${(product.price * 1.24).toFixed(2)}</p>
                              </div>
                           </div>
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default TopRated;
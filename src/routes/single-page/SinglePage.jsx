import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../api';
import { AiFillStar } from "react-icons/ai";
import './SinglePage.scss';

const SinglePage = () => {
  const data = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for product quantity
  const [cartCount, setCartCount] = useState(() => {
    return JSON.parse(localStorage.getItem('cartCount')) || 0;
  });

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`/products/${data.id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadData();
  }, [data]);

  useEffect(() => {
    localStorage.setItem('cartCount', cartCount);
  }, [cartCount]);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <AiFillStar key={index} />
    ));
  };

  const handleAddToCart = (product) => {
    let storedProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    const existingProductIndex = storedProducts.findIndex(p => p.id === product.id);

    if (existingProductIndex !== -1) {
      storedProducts[existingProductIndex].quantity += quantity;
    } else {
      storedProducts.push({ ...product, quantity });
      setCartCount(cartCount + 1);
    }

    localStorage.setItem('cartProducts', JSON.stringify(storedProducts));
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  return (
    <div className='single-page'>
      <div className="container">
        {product ? (
          <div className="single-page__wrapper">
            <div className="single-page__img">
              <img src={product.image} alt="product" />
            </div>
            <div className="single-page__contant">
              <h1 className="single-page__title">{product.name}</h1>
              <div className="single-page__rating-view">
                <p className="single-page__rating">{renderStars(product.rating)}</p>
                <p className="single-page__view">{product.numReviews} reviews</p>
              </div>
              <div className="single-page__price-wrapper">
                <p className="single-page__price">${product.price}</p>
                <p className="single-page__discount">${(product.price * 1.24).toFixed(2)}</p>
                <p className='single-page__sale'>24% OFF</p>
              </div>
              <div className='single-page__category'>
                <table>
                  <tbody>
                    <tr>
                      <td>Availability:</td>
                      <td>{product.countInStock > 0 ? 'In Stock:' : 'Out of Stock:'} {product.countInStock}</td>
                    </tr>
                    <tr>
                      <td>Brand:</td>
                      <td>{product.brand}</td>
                    </tr>
                  </tbody>
                </table>
                <p>Free shipping</p>
              </div>
              <div className='add-to-cart__wrapper'>
                <div className='add-to-cart'>
                  <button onClick={() => handleQuantityChange(-1)}><AiOutlineMinus /></button>
                  <p className="add-to-cart__count">{quantity}</p>
                  <button onClick={() => handleQuantityChange(1)}><AiOutlinePlus /></button>
                </div>
                <button onClick={() => handleAddToCart(product)} className='add-to-cart__btn'><CgShoppingCart /> Add To Cart</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SinglePage;
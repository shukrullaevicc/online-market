import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import './Cart.scss';
import x from '../../images/x.svg';

const Cart = () => {
  const { t } = useTranslation();
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    setCartProducts(storedProducts);
    calculateTotal(storedProducts);
  }, []);

  const calculateTotal = (products) => {
    const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotal(totalPrice);
  };

  const handleQuantityChange = (productId, delta) => {
    const updatedProducts = cartProducts.map(product => {
      if (product.id === productId) {
        const newQuantity = Math.max(1, product.quantity + delta);
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setCartProducts(updatedProducts);
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    calculateTotal(updatedProducts);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = cartProducts.filter(product => product.id !== productId);
    setCartProducts(updatedProducts);
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    calculateTotal(updatedProducts);
  };

  return (
    <div className="cart-page">
      <h1>{t('shopping cart')}</h1>
      <table>
        <thead>
          <tr>
            <th>{t('products')}</th>
            <th>{t('price')}</th>
            <th>{t('quantity')}</th>
            <th>{t('total')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map(product => (
            <tr key={product.id}>
              <td style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}><img src={product.image} alt="" width="50" height="50" style={{ objectFit: 'cover' }} /> {product.name}</td>
              <td>${product.price}</td>
              <td>
                <div className='quantity__wrapper'>
                  <button onClick={() => handleQuantityChange(product.id, -1)}><AiOutlineMinus /></button>
                  <p className='quantity'>{product.quantity}</p>
                  <button onClick={() => handleQuantityChange(product.id, 1)}><AiOutlinePlus /></button>
                </div>
              </td>
              <td>${(product.price * product.quantity).toFixed(2)}</td>
              <td>
                <button className='remove' onClick={() => handleRemoveProduct(product.id)}>
                  <img src={x} alt="" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <div className="summary-item">
          <span className="label">{t('Subtotal')}</span>
          <span className="value">${total.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span className="label">{t('Shipping Fee')}</span>
          <span className="value">$20</span>
        </div>
        <div className="summary-item total">
          <span className="label">{t('Total')}</span>
          <span className="value">${(total + 20).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
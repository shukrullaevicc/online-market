import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import './Cart.scss';

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
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={() => handleQuantityChange(product.id, -1)}><AiOutlineMinus /></button>
                {product.quantity}
                <button onClick={() => handleQuantityChange(product.id, 1)}><AiOutlinePlus /></button>
              </td>
              <td>${(product.price * product.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => handleRemoveProduct(product.id)}>{t('remove')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <p>{t('Subtotal')} ${total.toFixed(2)}</p>
        <p>{t('Shipping Fee')} $20</p>
        <p>{t('Total')} ${(total + 20).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
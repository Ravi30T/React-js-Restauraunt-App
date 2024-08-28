import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

import Navbar from '../Navbar'

import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  return (
    <div>
      <Navbar />
      <div className="cart-container">
        {cartList.length > 0 ? (
          <div className="cart-list-container">
            <h1> My Cart </h1>

            <div className="remove-button-container">
              <button
                type="button"
                className="remove-all-btn"
                onClick={removeAllCartItems}
              >
                Remove All
              </button>
            </div>
            <ul className="cart-items-list-container">
              {cartList.map(each => (
                <CartItem key={each.dishId} cartItemDetails={each} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty-cart-container">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png" />
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

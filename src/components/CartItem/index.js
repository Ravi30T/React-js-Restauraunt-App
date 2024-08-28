import {useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {cartItemDetails} = props
  const {dishImg, dishName, dishPrice, dishId, quantity, dishCurrency} =
    cartItemDetails

  const {incrementCartItemQuantity, decrementCartItemQuantity, removeCartItem} =
    useContext(CartContext)

  const onRemoveCartItem = () => {
    removeCartItem(dishId)
  }

  const onIncrementItem = () => {
    incrementCartItemQuantity(dishId)
  }

  const onDecrementItem = () => {
    decrementCartItemQuantity(dishId)
  }

  return (
    <li className="cart-item">
      <div className="cart-product-img-title-container">
        <img className="cart-product-image" src={dishImg} alt={dishName} />
        <p className="cart-product-title">{dishName}</p>
      </div>
      <div className="cart-item-details-container">
        <div className="cart-quantity-container">
          <button
            type="button"
            aria-label="BsDashSquare"
            className="quantity-controller-button"
            onClick={onDecrementItem}
            data-testid="minus"
          >
            -
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            aria-label="BsPlusSquare"
            className="quantity-controller-button"
            onClick={onIncrementItem}
            data-testid="plus"
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">
            {dishCurrency} {(quantity * dishPrice).toFixed(2)}
          </p>
        </div>
      </div>
      <button
        className="delete-button"
        aria-label="remove-all"
        type="button"
        onClick={onRemoveCartItem}
        data-testid="remove"
      >
        Remove
      </button>
    </li>
  )
}

export default CartItem

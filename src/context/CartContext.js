import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  updateCart: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  removeAllCartItems: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  onClickRemoveItem: () => {},
})

export default CartContext

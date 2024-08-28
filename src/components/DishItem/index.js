import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = props => {
  const {dishDetails} = props

  const {
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImg,
    dishCalories,
    dishCustomizations,
    dishAvailability,
    dishId,
  } = dishDetails

  // undefined !== dishDetails ? console.log(dishDetails) : console.log('false')

  const [quantity, setQuantity] = useState(0)
  const {addCartItem} = useContext(CartContext)
  const {cartList} = useContext(CartContext)
  const {removeCartItem} = useContext(CartContext)

  const onIncreaseQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const onDecreaseQuantity = () => {
    setQuantity(prevState => {
      if (prevState > 0) {
        const newQuantity = prevState - 1
        if (newQuantity === 0) {
          removeCartItem(dishId)
        }

        return newQuantity
      }
      return 0
    })
  }

  const onClickAddToCart = () => {
    addCartItem({...dishDetails, quantity})
  }

  const getQuantity = () => {
    const cartItem = cartList.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const renderControllerButton = () => (
    <div className="controller-container">
      <button className="button" type="button" onClick={onDecreaseQuantity}>
        -
      </button>
      <p className="quantity">{quantity}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  const dishMark = dishType === 1 ? 'non-veg-mark' : 'veg-mark'
  const dishMarkBorder = dishType === 1 ? 'non-veg-border' : 'veg-border'

  return (
    <li className="dish-item-container">
      <div className={dishMarkBorder}>
        <div className={dishMark} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderControllerButton()}
        {!dishAvailability && (
          <p className="not-availability-text text-danger">Not available</p>
        )}
        {dishCustomizations.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
        {quantity > 0 && (
          <button type="button" onClick={onClickAddToCart} className="add-to-cart-btn">
            ADD TO CART
          </button>
        )}
      </div>

      <div className="calories-container">
        <p className="dish-calories text-warning">{dishCalories} calories</p>
      </div>

      <div className="dish-img-container">
        <img className="dish-image" alt={dishName} src={dishImg} />
      </div>
    </li>
  )
}

export default DishItem

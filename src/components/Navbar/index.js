import {Link, withRouter} from 'react-router-dom'
import {useContext} from 'react'
import Cookies from 'js-cookie'
import {IoCartOutline} from 'react-icons/io5'
import CartContext from '../../context/CartContext'
import './index.css'

const Navbar = props => {
  const {cartList} = useContext(CartContext)
  const cartQuantity = cartList.length

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCartIcon = () => {
    const {history} = props
    history.replace('/cart')
  }

  return (
    <nav className="nav-bar">
      <div>
        <Link to="/" className="nav-heading-link-item">
          <h1 className="website-logo"> UNI Resto Cafe </h1>
        </Link>
      </div>

      <div className="cart-logout-btn-container">
        <div className="cart-icon-container">
          <button
            data-testid="cart"
            className="cart-btn"
            onClick={onClickCartIcon}
          >
            <IoCartOutline className="cart-icon" />
          </button>
          <div className="quantity-number-container">
            <p className="quantity-number"> {cartQuantity} </p>
          </div>
        </div>

        <div>
          <p> My Orders </p>
        </div>

        <div className="logout-btn-container">
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)

import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import Home from './components/Home'
import Cart from './components/Cart'
import './App.css'

// write your code here

class App extends Component {
  state = {cartList: []}

  addCartItem = dishItem => {
    const {cartList} = this.state

    const isDishItemExists = cartList.find(
      each => each.dishId === dishItem.dishId,
    )

    if (isDishItemExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dishItem.dishId
            ? {...item, quantity: item.quantity + dishItem.quantity}
            : item,
        ),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, dishItem],
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCart = cartList.filter(each => each.dishId !== id)
    this.setState({cartList: updatedCart})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    }))
  }

  removeAllCartItems = () => this.setState({cartList: []})

  add = dish => {
    const {cartList} = this.state

    // undefined !== dish ? console.log(dish) : console.log('false')

    let isAlreadyExists = false
    if (dish !== undefined) {
      isAlreadyExists = cartList.filter(item => {
        if (item.dishId === dish.dishId) {
          return true
        }
        return false
      })
    }

    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      }))
    } else {
      const newDish = {...dish, quantity: 1}
      this.setState(prevState => ({cartList: [...prevState.cartList, newDish]}))
    }
  }

  onRemoveItemFromCart = dish => {
    const {cartList} = this.state
    let isAlreadyExists
    if (dish !== undefined) {
      isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)
    }
    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartList: prevState.cartList
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          onClickRemoveItem: this.onRemoveItemFromCart,
          addCartItem: this.addCartItem,
          updateCart: this.updateCart,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        {' '}
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
/*
onClickAddItem: this.addItemToCart(),
          onClickRemoveItem: this.removeItemFromCart(),
          */

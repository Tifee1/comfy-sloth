import React, { useContext, useReducer, useEffect } from 'react'
import reducer from '../reducer/cartReducer'

const getLocalStorage = () => {
  let storage = localStorage.getItem('cart')
  if (storage) {
    storage = JSON.parse(localStorage.getItem('cart'))
  } else {
    storage = []
  }
  return storage
}

const CartContext = React.createContext()

const initialState = {
  cart: getLocalStorage(),
  shippingFee: 0,
  cartItems: 0,
  totalAmount: 0,
}
// CartProvider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Add Product To Cart
  const addProductToCart = (amount, color, product) => {
    dispatch({ type: 'ADD_TO_CART', payload: { amount, color, product } })
  }

  // Set CartItem Amount, Total Amount And Localstorage
  useEffect(() => {
    dispatch({ type: 'SET_TOTALS' })
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  // Increase and decrease amount
  const toggleAmount = (id, type, max) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type, max } })
  }

  // delete item from cart
  const deleteItem = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id })
  }

  // clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
        toggleAmount,
        deleteItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCartContext = () => {
  return useContext(CartContext)
}

export default useCartContext

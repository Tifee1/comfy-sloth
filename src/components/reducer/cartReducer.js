const reducer = (state, action) => {
  // Add to car
  if (action.type === 'ADD_TO_CART') {
    let newCart = []
    const { amount, color, product } = action.payload
    const { name, images, stock: max, id, price, shipping } = product

    const exist = state.cart.find((c) => c.id === id + color)
    // if item dosent exist
    if (!exist) {
      const newItem = {
        amount,
        color,
        name,
        image: images[0].url,
        max,
        id: id + color,
        price,
        shipping,
      }
      newCart = [...state.cart, newItem]
    }
    // if it exist
    else {
      newCart = state.cart.map((c) => {
        if (c.id === id + color) {
          return { ...c, amount: c.amount + amount }
        }
        return c
      })
    }
    return { ...state, cart: newCart }
  }

  // increase and decrease amount
  if (action.type === 'TOGGLE_AMOUNT') {
    const newCart = state.cart.map((c) => {
      if (c.id === action.payload.id) {
        // increase
        if (action.payload.type === 'inc') {
          let newAmount = c.amount + 1
          if (newAmount > action.payload.max) {
            newAmount = action.payload.max
          }
          return { ...c, amount: newAmount }
        }
        // decrease
        if (action.payload.type === 'dec') {
          let newAmount = c.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return { ...c, amount: newAmount }
        }
      }
      return c
    })
    return { ...state, cart: newCart }
  }

  // delete item from cart
  if (action.type === 'DELETE_ITEM') {
    const newCart = state.cart.filter((c) => c.id !== action.payload)
    return { ...state, cart: newCart }
  }

  // clear cart
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  // get cartitem amount,total amount and shipping fee
  if (action.type === 'SET_TOTALS') {
    const { cartItems, totalAmount, shippingFee } = state.cart.reduce(
      (total, item) => {
        total.cartItems += item.amount
        total.totalAmount += item.amount * item.price
        if (!item.shipping) {
          total.shippingFee += item.price * 0.13
          if (item.amount > 9) {
            total.shippingFee += item.price * 0.35
          }
        }
        return total
      },
      {
        cartItems: 0,
        totalAmount: 0,
        shippingFee: 0,
      }
    )

    return { ...state, cartItems, totalAmount, shippingFee }
  }

  throw new Error(`no matching '${action.type}' action type`)
}

export default reducer

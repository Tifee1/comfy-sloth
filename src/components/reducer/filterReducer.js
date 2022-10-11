const reducer = (state, action) => {
  // get products from product provider and get max price
  if (action.type === 'SET_ALL_PRODUCTS') {
    const price = action.payload.map((pri) => pri.price)
    const maxPrice = Math.max(...price)
    return {
      ...state,
      allProducts: action.payload,
      filteredProducts: action.payload,
      filter: { ...state.filter, price: maxPrice, max_price: maxPrice },
    }
  }

  // set grid view
  if (action.type === 'SET_GRID_VIEW') {
    return { ...state, gridView: true }
  }

  // set list view
  if (action.type === 'SET_LIST_VIEW') {
    return { ...state, gridView: false }
  }

  // set sort value
  if (action.type === 'SET_SORT') {
    return { ...state, sort: action.payload }
  }

  // set filter value
  if (action.type === 'SET_FILTER') {
    const { name, value } = action.payload
    return { ...state, filter: { ...state.filter, [name]: value } }
  }

  // clear filters
  if (action.type === 'CLEAR_FILTERS') {
    return {
      ...state,
      filter: {
        ...state.filter,
        search: '',
        category: 'all',
        company: 'all',
        color: 'all',
        price: state.filter.max_price,
        shipping: false,
      },
    }
  }

  // filter products
  if (action.type === 'FILTER_PRODUCTS') {
    const {
      filter: { search, category, company, color, price, shipping },
    } = state
    let temp = [...state.allProducts]
    // text filter
    if (search) {
      temp = temp.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    // category filter
    if (category !== 'all') {
      temp = temp.filter((c) => c.category === category)
    }
    // company filter
    if (company !== 'all') {
      temp = temp.filter((c) => c.company === company)
    }
    // price filter
    temp = temp.filter((c) => c.price <= price)
    // color filter
    if (color !== 'all') {
      temp = temp.filter((col) => {
        return col.colors.find((c) => c === color)
      })
    }
    // shipping filter
    if (shipping) {
      temp = temp.filter((c) => c.shipping === true)
    }
    return { ...state, filteredProducts: temp }
  }

  // sort products
  if (action.type === 'SORT_PRODUCTS') {
    const { filteredProducts } = state
    let temp2 = [...filteredProducts]
    // a-z
    if (state.sort === 'name-a') {
      temp2 = temp2.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    // z-a
    if (state.sort === 'name-z') {
      temp2 = temp2.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    // price lowest
    if (state.sort === 'price-lowest') {
      temp2 = temp2.sort((a, b) => {
        return a.price - b.price
      })
    }
    // price highest
    if (state.sort === 'price-highest') {
      temp2 = temp2.sort((a, b) => {
        return b.price - a.price
      })
    }
    return { ...state, filteredProducts: temp2 }
  }
  throw new Error(`no matching ${action.type} action type`)
}

export default reducer

const reducer = (state, action) => {
  if (action.type === 'OPEN_SIDEBAR') {
    return { ...state, isSidebarOpen: true }
  }
  if (action.type === 'CLOSE_SIDEBAR') {
    return { ...state, isSidebarOpen: false }
  }
  if (action.type === 'SET_LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'SET_DATA') {
    return { ...state, products: action.payload, loading: false }
  }
  if (action.type === 'SET_ERROR') {
    return { ...state, error: true, loading: false }
  }
  if (action.type === 'SINGLE_LOADING') {
    return { ...state, singleLoading: true, singleError: false }
  }
  if (action.type === 'CLEAR_ERROR') {
    return { ...state, singleError: false }
  }
  if (action.type === 'SET_SINGLE_PRODUCT') {
    return {
      ...state,
      singleProduct: action.payload,
      singleLoading: false,
    }
  }
  if (action.type === 'SET_SINGLE_ERROR') {
    return { ...state, singleError: true, singleLoading: false }
  } else throw new Error(`no matching '${action.type}' action type`)
}

export default reducer

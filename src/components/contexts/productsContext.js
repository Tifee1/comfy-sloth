import React, { useReducer, useContext, useEffect } from 'react'
import reducer from '../reducer/productsReducer'
import { products_url as url } from '../../utils/constants'
import axios from 'axios'

const ProductContext = React.createContext()

const initialState = {
  isSidebarOpen: false,
  products: [],
  loading: false,
  error: false,
  singleProduct: {},
  singleLoading: false,
  singleError: false,
}

// Product Provider
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // fetch data function
  const fetchData = async (url) => {
    dispatch({ type: 'SET_LOADING' })
    try {
      const response = await axios(url)
      const data = await response.data
      const editData = await data.map((item) => {
        return { ...item, price: item.price * 52 }
      })
      dispatch({ type: 'SET_DATA', payload: editData })
    } catch (error) {
      dispatch({ type: 'SET_ERROR' })
    }
  }

  // fetching data
  useEffect(() => {
    fetchData(`${url}`)
  }, [])

  // open and close sidebar
  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' })
  }
  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' })
  }

  // clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  // fetch single product function
  const fetchSingleProduct = async (url) => {
    dispatch({ type: 'SINGLE_LOADING' })
    try {
      const resp = await axios(url)
      const data = await resp.data
      const editData = { ...data, price: data.price * 52 }
      dispatch({ type: 'SET_SINGLE_PRODUCT', payload: editData })
    } catch (error) {
      dispatch({ type: 'SET_SINGLE_ERROR' })
    }
  }

  return (
    <ProductContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        clearError,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

const useProductContext = () => {
  return useContext(ProductContext)
}

export { ProductProvider, useProductContext }

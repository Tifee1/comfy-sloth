import React, { useReducer } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import reducer from '../reducer/filterReducer'
import { useProductContext } from './productsContext'

const getLocalStorage = () => {
  let storage = localStorage.getItem('view')
  if (storage) {
    storage = localStorage.getItem('view')
  } else {
    storage = true
  }
  return storage
}

const FilterContext = React.createContext()

const initialState = {
  allProducts: [],
  filteredProducts: [],
  gridView: getLocalStorage(),
  sort: 'name-a',
  filter: {
    search: '',
    category: 'all',
    company: 'all',
    color: 'all',
    max_price: 0,
    price: 0,
    min_price: 0,
    shipping: false,
  },
}

// Filter Provider
export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { products } = useProductContext()

  // get products from product provider
  useEffect(() => {
    dispatch({ type: 'SET_ALL_PRODUCTS', payload: products })
  }, [products])

  // filter and sort
  useEffect(() => {
    localStorage.setItem('view', state.gridView)
    dispatch({ type: 'FILTER_PRODUCTS' })
    dispatch({ type: 'SORT_PRODUCTS' })
  }, [state.filter, state.sort, state.gridView])

  // set list and gridview
  const setGridView = () => {
    dispatch({ type: 'SET_GRID_VIEW' })
  }
  const setListView = () => {
    dispatch({ type: 'SET_LIST_VIEW' })
  }

  // set sort value
  const setSort = (e) => {
    dispatch({ type: 'SET_SORT', payload: e.target.value })
  }

  // set filter values
  const changeFilter = (e) => {
    const name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    if (name === 'shipping') {
      value = e.target.checked
    }
    dispatch({ type: 'SET_FILTER', payload: { name, value } })
  }

  // clear filters
  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' })
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        setSort,
        changeFilter,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

const useFilterContext = () => {
  return useContext(FilterContext)
}

export default useFilterContext

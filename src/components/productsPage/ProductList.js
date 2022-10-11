import React from 'react'
import { Gridview, Listview } from './'
import useFilterContext from '../contexts/filterContext'

const ProductList = () => {
  const { filteredProducts: products, gridView } = useFilterContext()

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry no products matched your search.
      </h5>
    )
  }
  if (gridView) {
    return <Gridview products={products} />
  }
  if (!gridView) {
    return <Listview products={products} />
  }
}

export default ProductList

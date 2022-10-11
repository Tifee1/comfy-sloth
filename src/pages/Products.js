import React from 'react'
import styled from 'styled-components'
import { ProductList, Sort, Filter } from '../components/productsPage'
import { PageHero, Loading } from '../components'
import { useProductContext } from '../components/contexts/productsContext'

const Products = () => {
  document.title = 'Comfy Sloth || PRODUCTS'
  const { loading } = useProductContext()

  if (loading) {
    return <Loading />
  }
  return (
    <main>
      <PageHero title='products' />
      <Wrapper className='page'>
        <div className='section-center products'>
          <Filter />
          <div>
            <Sort />
            <ProductList />
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .products {
    display: grid;
    gap: 3rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 768px) {
    .products {
      grid-template-columns: 200px 1fr;
    }
  }
`

export default Products

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useProductContext } from '../contexts/productsContext'
import { Products } from './'
import { Error, Loading } from '../'

const FeaturedProducts = () => {
  const { products, loading, error } = useProductContext()

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const featuredProducts = products
    .filter((product) => product.featured === true)
    .slice(0, 3)

  return (
    <Wrapper className='section'>
      <div className='title'>
        <h2>featured products</h2>
        <div className='underline'></div>
      </div>
      <div className='section-center featured'>
        {featuredProducts.map((product) => {
          return <Products {...product} key={product.id} />
        })}
      </div>
      <Link to='/products' className='btn'>
        all products
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts

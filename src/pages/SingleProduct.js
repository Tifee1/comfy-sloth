import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useProductContext } from '../components/contexts/productsContext'
import { Error, Loading, PageHero } from '../components'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import { Stars, ProductImages } from '../components/singleProduct'
import { AddToCart } from '../components/cart'

const SingleProduct = () => {
  const {
    singleLoading,
    singleError,
    singleProduct,
    fetchSingleProduct,
    clearError,
  } = useProductContext()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    if (singleError) {
      setTimeout(() => {
        navigate('/')
        clearError()
      }, 3000)
    }
    // eslint-disable-next-line
  }, [singleError])

  if (singleLoading) {
    return <Loading />
  }
  if (singleError) {
    return <Error />
  }

  const {
    stock,
    price,
    images,
    reviews,
    stars,
    name,
    description,
    company,
    shipping,
  } = singleProduct
  document.title = `Comfy Sloth || ${name || '404'}`
  return (
    <Wrapper>
      <PageHero title={name} product={true} />

      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>
        <div className='product-center'>
          <ProductImages images={images} />

          <section className='content'>
            <h2>{name}</h2>

            <Stars stars={stars} reviews={reviews} />

            <h4 className='price'>{formatPrice(price)}</h4>
            <p className='description'>{description}</p>
            <p className='info'>
              <span>Available :</span>
              {stock ? `in stock (${stock} units)` : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU :</span>
              {id}
            </p>
            <p className='info'>
              <span>Brand :</span>
              {company}
            </p>
            <p className='info'>
              <span>Free Shipping :</span>
              {shipping ? 'yes' : 'no'}
            </p>
            <hr />

            {stock > 0 && <AddToCart product={singleProduct} />}
          </section>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`
export default SingleProduct

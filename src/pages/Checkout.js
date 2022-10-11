import React from 'react'
import useCartContext from '../components/contexts/cartContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { PageHero, Paystack } from '../components'

const Checkout = () => {
  document.title = 'Comfy Sloth || CHECKOUT'
  const { cart } = useCartContext()

  if (cart.length < 1) {
    return (
      <Wrapper className='page-100'>
        <div className='empty'>
          <h2>Your cart is empty</h2>
          <Link to='/products' className='btn'>
            fill it
          </Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        <Paystack />
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`
export default Checkout

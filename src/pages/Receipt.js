import React from 'react'
import styled from 'styled-components'
import { Navigate } from 'react-router-dom'
import useUserContext from '../components/contexts/useUserContext'
import { PageHero } from '../components'

const Receipt = () => {
  document.title = 'Comfy Sloth || RECEIPT'
  const { ref } = useUserContext()

  if (Object.keys(ref).length === 0) {
    return <Navigate to='/' />
  }
  return (
    <main>
      <PageHero title='receipt' />
      <Wrapper className='section-center section page'>
        <p className='info'>
          your order was successful with reference number:
          <span> {ref.reference}</span> and transaction number:{' '}
          <span>{ref.trans}</span>
          <br />
          <br />
          your order will be deliverd within <span>12days</span>.
        </p>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.main`
  .info {
    text-transform: capitalize;
    span {
      color: var(--clr-primary-5);
    }
  }

  @media (min-width: 992px) {
    .price {
      font-size: 1.25rem;
    }
  }
`

export default Receipt

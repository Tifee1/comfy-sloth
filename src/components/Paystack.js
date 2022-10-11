import React from 'react'
import styled from 'styled-components'
import { usePaystackPayment } from 'react-paystack'
import useCartContext from '../components/contexts/cartContext'
import useUserContext from '../components/contexts/useUserContext'
import { formatPrice } from '../utils/helpers'
import { useNavigate } from 'react-router-dom'

const Paystack = () => {
  const { totalAmount, shippingFee, clearCart } = useCartContext()
  const { user, setRef } = useUserContext()
  const navigate = useNavigate()

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email || user.name,
    amount: parseInt(totalAmount + shippingFee),
    publicKey: process.env.REACT_APP_PAYSTACK_TEST_PUBLIC,
  }

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setRef(reference)
    clearCart()
    setTimeout(() => {
      navigate('/receipt')
    }, 2000)
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }

  const PaystackComp = () => {
    const initializePayment = usePaystackPayment(config)
    return (
      <div>
        <button
          className='btn'
          onClick={() => {
            initializePayment(onSuccess, onClose)
          }}
        >
          Pay
        </button>
      </div>
    )
  }
  return (
    <Wrapper>
      <article>
        <h4>Hello, {user && user.name}</h4>
        <p>Your total is {formatPrice(totalAmount + shippingFee)}</p>
        <p>Test Card Number : 5078 5078 5078 5078 12</p>
        <p>Cvv: 081</p>
        <p>Pin: 1111</p>
      </article>
      <PaystackComp />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  /* Buttons and links */
  button {
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
`

export default Paystack

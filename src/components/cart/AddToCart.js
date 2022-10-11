import React, { useState } from 'react'
import styled from 'styled-components'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AmountButton } from '../singleProduct'
import useCartContext from '../contexts/cartContext'

const AddToCart = ({ product }) => {
  const { addProductToCart } = useCartContext()
  const { colors, stock } = product
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [amount, setAmount] = useState(1)

  const increase = () => {
    setAmount((old) => {
      let temp = old + 1
      if (temp > stock) {
        temp = stock
      }
      return temp
    })
  }
  const decrease = () => {
    setAmount((old) => {
      let temp = old - 1
      if (temp < 1) {
        temp = 1
      }
      return temp
    })
  }
  return (
    <Wrapper>
      <div className='colors'>
        <span>Colors:</span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={`${
                  color === selectedColor ? 'color-btn active' : 'color-btn'
                }`}
                style={{ background: color }}
                onClick={() => setSelectedColor(colors[index])}
              >
                {color === selectedColor && <FaCheck />}
              </button>
            )
          })}
        </div>
      </div>
      <div className='btn-container'>
        <AmountButton increase={increase} decrease={decrease} amount={amount} />
      </div>
      <Link
        to='/cart'
        className='btn'
        onClick={() => addProductToCart(amount, selectedColor, product)}
      >
        add to cart
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart

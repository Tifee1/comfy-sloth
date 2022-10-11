import React from 'react'
import styled from 'styled-components'
import useFilterContext from '../contexts/filterContext'
import { formatPrice, uniqueValues } from '../../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filter = () => {
  const { filter, changeFilter, allProducts, clearFilters } = useFilterContext()
  const {
    search,
    category,
    company,
    color,
    max_price,
    price,
    min_price,
    shipping,
  } = filter

  const uniCategories = uniqueValues(allProducts, 'category')
  const uniCompanies = uniqueValues(allProducts, 'company')
  const uniColors = uniqueValues(allProducts, 'colors', true)

  return (
    <Wrapper>
      <div className='content'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          {/* Search input */}
          <div className='form-control'>
            <input
              type='text'
              className='search-input'
              placeholder='search...'
              name='search'
              value={search}
              onChange={changeFilter}
            />
          </div>
          {/* Category filter */}
          <div className='form-control'>
            <h5>category</h5>
            {uniCategories.map((cat, index) => {
              return (
                <button
                  name='category'
                  key={index}
                  className={`${cat === category ? 'active' : null}`}
                  onClick={(e) => changeFilter(e)}
                >
                  {cat}
                </button>
              )
            })}
          </div>
          {/* Company filter */}
          <div className='form-control'>
            <h5>company</h5>
            <select
              name='company'
              className='company'
              value={company}
              onChange={(e) => changeFilter(e)}
            >
              {uniCompanies.map((com, index) => {
                return (
                  <option value={com} key={index}>
                    {com}
                  </option>
                )
              })}
            </select>
          </div>
          {/* colors */}
          <div className='form-control'>
            <h5>colors</h5>
            <div className='colors'>
              {uniColors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      value={c}
                      className={`${
                        c === color ? 'all-btn active' : 'all-btn'
                      }`}
                      key={index}
                      name='color'
                      onClick={(e) => changeFilter(e)}
                    >
                      {c}
                    </button>
                  )
                }

                return (
                  <button
                    style={{ background: c }}
                    className={`${
                      c === color ? 'color-btn active' : 'color-btn'
                    }`}
                    value={c}
                    key={index}
                    name='color'
                    onClick={(e) => changeFilter(e)}
                  >
                    {c === color && <FaCheck />}
                  </button>
                )
              })}
            </div>
          </div>
          {/* price */}
          <div className='form-control'>
            <h5>price</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              value={price}
              onChange={changeFilter}
              max={max_price}
              min={min_price}
            />
          </div>
          {/* Shipping */}
          <div className='form-control shipping'>
            <label htmlFor='shipping'>free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              value={shipping}
              onChange={changeFilter}
            />
          </div>
        </form>
        <button className='clear-btn' onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem;
    text-transform: capitalize;
    background: transparent;
    /* border: none; */
    border: 1px solid var(--clr-grey-5);
    border-radius: 5px;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    background: var(--clr-grey-4);
    color: var(--clr-grey-8);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filter

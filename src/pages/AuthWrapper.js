import React from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react'
import { Loading } from '../components'

const AuthWrapper = ({ children }) => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    )
  }

  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper

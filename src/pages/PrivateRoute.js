import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0()
  const myUser = isAuthenticated && user

  if (!myUser) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}

export default PrivateRoute

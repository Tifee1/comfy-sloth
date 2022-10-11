import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useContext } from 'react'
import { useState } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [ref, setRef] = useState({})

  const { isAuthenticated, user } = useAuth0()
  const myUser = isAuthenticated && user

  return (
    <UserContext.Provider value={{ myUser, user, ref, setRef }}>
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => {
  return useContext(UserContext)
}

export default useUserContext

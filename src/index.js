import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ProductProvider } from './components/contexts/productsContext'
import { FilterProvider } from './components/contexts/filterContext'
import { CartProvider } from './components/contexts/cartContext'
import { UserProvider } from './components/contexts/useUserContext'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_DOMAIN}
      clientId={process.env.REACT_APP_CLIENT_ID}
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <UserProvider>
        <ProductProvider>
          <FilterProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterProvider>
        </ProductProvider>
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
)

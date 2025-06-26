import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from '@pages/layout'
import myRoutes from './myRoutes.jsx'

import { store } from '@/redux/store'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
          {myRoutes.map((customRoute, index) => (
            <Route
              key={index}
              path={customRoute.path}
              index={customRoute.index}
              element={customRoute.element}
            />
          ))}  
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

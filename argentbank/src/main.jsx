import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "react-router";

import './index.css'
import store from '@/redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterProvider router={router} />
    </BrowserRouter>
  </Provider>,
)

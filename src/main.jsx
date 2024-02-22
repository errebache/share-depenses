import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./assets/sass/main.scss"
import router from "./router"
import { RouterProvider } from 'react-router-dom'
import i18n from './_config/i18n/i18n'


i18n.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} i18n={i18n}></RouterProvider>
  </React.StrictMode>,
)

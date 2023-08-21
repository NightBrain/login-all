import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import { UserAuthContextProvider } from './context/UserAuthContext.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

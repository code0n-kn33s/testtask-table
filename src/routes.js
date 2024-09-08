

import WrapPage from './pages/WrapPage'
import { Navigate } from 'react-router-dom'
import MainPage from './pages/main'

import Contacts from './pages/contacts'
import About from './pages/about'
import NotFound from './pages/NotFound'

export const routes = [
  {
    path: "/",
    element: <WrapPage />,
    children: [
      {
        path: "main",
        element: <MainPage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },

      {
        path: "",
        element: <Navigate to="/main" replace />,
      },
      {
        path: "*",
        element: <NotFound />,
      },

    ]
  },

]

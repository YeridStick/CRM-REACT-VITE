import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevosClientes , {action as nuevoClienteAction} from './pages/NuevosClientes'
import Index, { loader as clientesLoader } from './pages/Index'
import ErrorPages from './components/ErrorPages'
import { action as eliminarClienteAction } from './components/Cliente'

import './index.css'
import EditarCliente, { loader as editarClientesLoader, action as editarClienteAction } from './pages/EditarCliente'
//import EliminarCliente, {loader as eliminarClienteLoader, action as eliminarClienteAction} from './pages/EliminarCliente'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true, //Este es el componete que se va a utilizar 
        element: <Index/>,
        loader: clientesLoader,
        errorElement: <ErrorPages/>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevosClientes/>,
        action: nuevoClienteAction,
        errorElement: <ErrorPages/>
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente/>,
        loader: editarClientesLoader,
        action: editarClienteAction,
        errorElement: <ErrorPages/>
      },
      {
        path: "/clientes/:clienteId/eliminar",
        action: eliminarClienteAction,
        errorElement: <ErrorPages/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

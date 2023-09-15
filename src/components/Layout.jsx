import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()
  //console.log(location)
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-700 px-5 py-10 rounded-r-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white">CRM - React</h1>
        <nav className="mt-10">
          <Link 
            className={`text-2xl block mt-2 hover:text-blue-300 ${location.pathname === '/' ? "text-white" : "text-blue-300" }`}
            to={"/"}
          >Clientes</Link>
          <Link 
            className={`text-2xl block mt-2 hover:text-blue-300 ${location.pathname === '/clientes/nuevo' ? "text-white" : "text-blue-300" }`} 
            to={"/clientes/nuevo"}
          >Nuevo Cliente</Link>
        </nav>
      </aside>
      <main className="md:w-3/4 p-10 md:min-h-screen overflow-scroll bg-gray-100">
        <Outlet/>
      </main>
      
    </div>
  )
}

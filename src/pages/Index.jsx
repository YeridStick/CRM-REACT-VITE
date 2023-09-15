import React from 'react'
import { useLoaderData } from 'react-router-dom' //lo usamos para haceder al louder
import Cliente from '../components/Cliente';
import { ObtenerClientes } from '../data/ObtenerClientes';
//Similar a un useEfect
//Ciempre debe mostrarse en minisculas
//Siempre debe retorna algo
export function loader(){
  const clientes = ObtenerClientes()
  return clientes //siempre deben retorna algo asi sea basio 
}

export default function Index() {
  const clientes = useLoaderData();

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-700">Cliente</h1>
      <p className="mt-3">Administra tus Clientes</p>
      {
        clientes.length ? (
          <table className="w-full bg-white shadow rounded-xl mt-5 table-auto overflow-hidden">
            <thead className="bg-blue-700 text-white text-center rounded-lg">
              <tr>
                <th className="p-2">Cliente</th>
                <th className="p-2">Contacto</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody className="rounded-xl">
              {
                clientes.map(clienteElement=>{
                  return <Cliente  
                            key={clienteElement.id}
                            clienteElement={clienteElement}
                          />
                })
              }
            </tbody>
          </table>
        ):
        (
          <p className="font-black text-center text-2xl mt-10">No hay clientes</p>
        )
      }
    </div>
  )
}

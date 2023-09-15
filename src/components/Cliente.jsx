import React from 'react'
import { useNavigate, Form, redirect } from 'react-router-dom'
import { eliminarCliente } from '../data/ObtenerClientes'

export async function action({params}){
  await eliminarCliente(params.clienteId)
  //navigate es bueno para cuando usamos un boton

  return redirect('/')
}

export default function Cliente({ clienteElement }) {
  const navigate = useNavigate()
  const { id, nombre, telefono, email, empresa } = clienteElement
  return (
    <tr className='rounded-lg shadow w-full p-1.5'>
      <td className="text-left  shadow rounded-lg w-full p-1.5 text-gray-600">
        <div className="px-2 flex-1 font-bold text-xl">{nombre}</div>
        <div className="px-2 flex-1"><span className="font-bold">Empresa: </span> {empresa}</div>
      </td>
      <td className="text-left  shadow rounded-lg w-full p-1.5 text-gray-600">
        <div className="px-2 flex-1 whitespace-nowrap"><span className="font-bold">Tel:</span>  {telefono}</div>
        <div className="px-2 flex-1 whitespace-nowrap"><span className="font-bold">Email: </span> {email}</div>
      </td>
      <td className="text-center  shadow rounded-lg w-full">
        <div className="p-1 flex max-lg:flex-wrap items-center justify-center content-center gap-3">
          <button 
            onClick={()=>navigate(`/clientes/${id}/editar`)}
            className="px-2 py-1 font-bold rounded shadow text-blue-600 w-full"
          >Editar</button>
          <Form
            method='post'
            action={`/clientes/${id}/eliminar`}
            onSubmit={(e)=>{
              if (!confirm("¿Deseas eliminar este registro?")) {
                e.preventDefault()
              }
            }}
          >
            <button 
              className="px-2 py-1 font-bold rounded shadow text-rose-600 w-full"
            >Eliminar</button>
          </Form>
        </div>
      </td>
    </tr>
  )
}

import React from 'react'
import { ObtenerCliente, actualizarCliente } from '../data/ObtenerClientes'
import { Form, useActionData, useLoaderData, useNavigate, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'

export async function loader({ params }) {
  const cliente = await ObtenerCliente(params.clienteId);
  if (Object.values(cliente).length === 0) {
    throw new Response('',{
      status: 404,
      statusText: 'El cliente no fue encontrado'
    })
  }
  return cliente;
}

export async function action({ request, params}){
  // request es una petición de los datos recibidos en el formulario
  const formData = await request.formData(); // existe en el prototype
  const datos = Object.fromEntries(formData);
  const email = formData.get('email')

  // validación
  const errores = [];
  if (Object.values(datos).some((value) => value === '')) {
    errores.push("Todos los campos son obligatorios");
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)) {
    errores.push("El imal no es valido")
  }

  if (errores.length > 0) {
    return errores;
  }

  //Actulizar clienye (datos)
  await actualizarCliente(params.clienteId, datos)
  return redirect("/") 
  //navigate es bueno para cuando usamos un boton
}

export default function EditarCliente() {
  const navigate = useNavigate(-1)
  const cliente = useLoaderData()
  const errores = useActionData();

  return (
    <div className="container w-full h-full">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-700 px-2 py-1 rounded-lg shadow-lg text-white uppercase font-bold"
      >
        Volver
      </button>
      <div className="w-full mb-4">
        <h1 className="text-center font-black text-4xl text-blue-700">Editar Cliente</h1>
        <p className="text-center mt-3">A continuación podras modificar los datos de un cliente</p>
      </div>
      <Form
        method='post'
        noValidate
        className="bg-white shadow rounded-md w-4/5 mx-auto px-5 py-10"
      >
        {errores &&
          errores.length > 0 &&
          errores.map((error, index) => (
            <Error key={index}>{error}</Error>
          ))}
        <Formulario cliente={cliente}/>
        <input
          className="mt-5 w-full bg-blue-700 font-bold text-white text-lg"
          type="submit"
          value={"Guardar Cambios"}
        />
      </Form>
    </div>
  )
}

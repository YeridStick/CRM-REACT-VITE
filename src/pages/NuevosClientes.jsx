import React, { useState } from 'react'
import { useNavigate, Form, useActionData, redirect } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarClientes } from '../data/ObtenerClientes'

export async function action({ request }) {
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

  //agregarClinete(datos)
  await agregarClientes(datos)
  return redirect("/") 
  //navigate es bueno para cuando usamos un boton
}

export default function NuevosClientes() {
  // Redirección
  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <div className="container w-full h-full">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-700 px-2 py-1 rounded-lg shadow-lg text-white uppercase font-bold"
      >
        Volver
      </button>
      <div className="w-full mb-4">
        <h1 className="text-center font-black text-4xl text-blue-700">Nuevo Cliente</h1>
        <p className="text-center mt-3">Llena todos los campos para registrar un nuevo cliente</p>
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
        <Formulario />
        <input
          className="mt-5 w-full bg-blue-700 font-bold text-white text-lg"
          type="submit"
          value="Registrar Cliente"
        />
      </Form>
    </div>
  );
}

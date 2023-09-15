export async function ObtenerClientes() {
  //variables de entorno 
  /*
    VITE_API_URL = 'http://localhost:4000/clientes'
    VITE_DB_USUARIO = root
  */

  const respuesta = await fetch(import.meta.env.VITE_API_URL)
  const resultado = await respuesta.json()
  return resultado;
}

export async function ObtenerCliente(id) {
  const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
  const resultado = await respuesta.json()
  return resultado;
}

export async function agregarClientes(datos) {
  try {
    const respuesta = await fetch(import.meta.env.VITE_API_URL, {
      method: 'post',
      body: JSON.stringify(datos),//Son los datos que estamos enviando al servidor 
      headers: { //definimos que esta peticion es de tipo json 
        'Content-Type': 'application/json'
      }
    })
    await respuesta.json()
  } catch (error) {
    console.log(error)
  }
  return {}
}

export async function actualizarCliente (id, datos) {
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'put',
      body: JSON.stringify(datos),//Son los datos que estamos enviando al servidor 
      headers: { //definimos que esta peticion es de tipo json 
        'Content-Type': 'application/json'
      }
    })
    await respuesta.json()
  } catch (error) {
    console.log(error)
  }
  return {}
}
export async function eliminarCliente (id) {
  console.log("Eliminando.. " + id)
  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'delete'
    })
  } catch (error) {
    console.log(error)
  }
  return {}
}
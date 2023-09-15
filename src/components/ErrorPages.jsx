import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPages() {
  const Error = useRouteError()
  return (
    <div>
      <h1 className="font-black text-4xl text-blue-700">Cliente</h1>
      <p className="mt-3 text-center text-2xl font-semibold text-gray-600">Hubo un error</p>
      <p className="mt-3 text-center text-gray-600">{Error.message || Error.statusText}</p>
    </div>
  )
}
import React from 'react'

export default function Error({children}) {
  return (
    <div className="text-center mb-4 bg-rose-600 text-white font-bold uppercase rounded-md">
      {children}
    </div>
  )
}

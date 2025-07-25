'use client'

import React, { useEffect, useState } from 'react'

export default function FarmaciaPage() {
  const [farmacias, setFarmacias] = useState<Array<unknown>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Referer': 'https://hoppscotch.io',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const ordenadas = data.sort(
            (a, b) =>
              a.fk_region - b.fk_region ||
              a.comuna_nombre.localeCompare(b.comuna_nombre) ||
              a.localidad_nombre.localeCompare(b.localidad_nombre)
          )
          setFarmacias(ordenadas)
        } else {
          console.warn('Respuesta inesperada de la API de farmacias')
        }
      })
      .catch((error) => {
        console.error('Error al obtener farmacias desde el navegador:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {loading ? (
        <div className="text-center text-gray-500 py-6">🔄 Cargando farmacias de turno...</div>
      ) : farmacias.length === 0 ? (
        <div className="text-center text-gray-600 text-lg p-6 bg-yellow-50 border border-yellow-200 rounded-md shadow-sm">
          <p>No se encontraron farmacias de turno para la región y comuna seleccionadas en este momento.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border-yellow-200 border-2 rounded-md shadow-md mt-4">
          <table className="min-w-full bg-white text-black divide-y divide-gray-200 border border-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Comuna</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Localidad</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Farmacia</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Dirección</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Teléfono</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Horario</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Cierre</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {farmacias.map((farmacia, idx) => (
                <tr key={`${farmacia.local_nombre}-${idx}`}>
                  <td className="px-4 py-3">{farmacia.comuna_nombre}</td>
                  <td className="px-4 py-3">{farmacia.localidad_nombre}</td>
                  <td className="px-4 py-3">{farmacia.local_nombre}</td>
                  <td className="px-4 py-3">{farmacia.local_direccion}</td>
                  <td className="px-4 py-3">{farmacia.local_telefono}</td>
                  <td className="px-4 py-3">{farmacia.funcionamiento_dia}</td>
                  <td className="px-4 py-3">
                    {farmacia.funcionamiento_hora_apertura} - {farmacia.funcionamiento_hora_cierre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
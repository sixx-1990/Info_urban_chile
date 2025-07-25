import React from 'react';
import { ListaFarmacias } from '../../lib/api/farmacias_api';

export default async function FarmaciaPage() {
  let farmacias = [];

  try {
    const data = await ListaFarmacias();

    if (Array.isArray(data)) {
      // Ordenar por región, comuna y localidad
      farmacias = data.sort((a, b) =>
        a.fk_region - b.fk_region ||
        a.comuna_nombre.localeCompare(b.comuna_nombre) ||
        a.localidad_nombre.localeCompare(b.localidad_nombre)
      );
    } else {
      console.warn("Respuesta inesperada de farmacias_api");
    }
  } catch (error) {
    console.error('Error al obtener farmacias:', error);
  }

  return (
    <div>
      {farmacias.length === 0 ? (
        <div className="text-center text-gray-600 text-lg p-6 bg-yellow-50 border border-yellow-200 rounded-md shadow-sm">
          <p>No se encontraron farmacias de turno para la región y comuna seleccionadas en este momento.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border-yellow-200 border-2 rounded-md shadow-md">
          <table className="min-w-full bg-white text-black divide-y divide-gray-200 border border-gray-500">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comuna</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmacia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th colSpan={2} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora Cierre</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {farmacias.map((farmacia, idx) => (
                <tr key={`${farmacia.local_nombre}-${idx}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmacia.comuna_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmacia.localidad_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmacia.local_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmacia.local_direccion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmacia.local_telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmacia.funcionamiento_dia}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {farmacia.funcionamiento_hora_apertura} - {farmacia.funcionamiento_hora_cierre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
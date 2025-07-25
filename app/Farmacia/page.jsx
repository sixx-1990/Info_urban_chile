'use client'

import React, { useEffect, useState, useMemo } from 'react';
import { REGIONES_CHILE_BASICO, REGION_ORDER } from '../utils/regiones_chile'; // Make sure the path is correct

export default function FarmaciaPage() {
  const [farmacias, setFarmacias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedComuna, setSelectedComuna] = useState('');

  useEffect(() => {
    // Fetch data from the pharmacy API
    fetch('https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`¡Error HTTP! Estado: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFarmacias(data);
        } else {
          console.warn('Respuesta inesperada de la API de farmacias:', data);
          setError('Formato de datos inesperado de la API.');
        }
      })
      .catch((err) => {
        console.error('Error al obtener farmacias:', err);
        setError('No se pudieron cargar las farmacias. Por favor, inténtalo de nuevo más tarde.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Memoize unique regions from the pharmacy data, sorted geographically
  const uniqueRegions = useMemo(() => {
    const fkRegionIds = new Set(farmacias.map(f => parseInt(f.fk_region, 10)));

    const regionsWithData = Object.values(REGIONES_CHILE_BASICO)
      .filter(region => fkRegionIds.has(region.api_id))
      .sort((a, b) => REGION_ORDER.indexOf(a.api_id) - REGION_ORDER.indexOf(b.api_id));

    return regionsWithData;
  }, [farmacias]);

  // Memoize unique communes for the selected region
  const uniqueComunas = useMemo(() => {
    if (!selectedRegion) return [];

    const comunas = new Set(
      farmacias
        .filter(f => String(f.fk_region) === String(selectedRegion))
        .map(f => f.comuna_nombre)
    );
    return Array.from(comunas).sort();
  }, [farmacias, selectedRegion]);

  // Memoize the filtered list of pharmacies based on user selection
  const filteredFarmacias = useMemo(() => {
    let currentFarmacias = farmacias;

    if (selectedRegion) {
      currentFarmacias = currentFarmacias.filter(f => String(f.fk_region) === String(selectedRegion));
    }

    if (selectedComuna) {
      currentFarmacias = currentFarmacias.filter(f => f.comuna_nombre === selectedComuna);
    }

    return currentFarmacias;
  }, [farmacias, selectedRegion, selectedComuna]);

  // Handle region dropdown change
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setSelectedComuna(''); // Reset commune when region changes
  };

  // Handle commune dropdown change
  const handleComunaChange = (e) => {
    setSelectedComuna(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 font-sans bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-4 text-blue-700 leading-tight">
        Farmacias de Turno en Chile
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
        Encuentra la farmacia de turno más cercana en tu región y comuna.
      </p>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-blue-600 py-20 text-xl flex flex-col items-center justify-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p>Cargando farmacias de turno...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-xl relative max-w-2xl mx-auto shadow-md" role="alert">
          <strong className="font-bold block mb-2 text-xl">¡Ha ocurrido un error!</strong>
          <span className="block text-lg">{error}</span>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && farmacias.length > 0 && (
        <>
          {/* Filter Section */}
          <div className="mb-10 p-6 bg-white border border-blue-200 rounded-xl shadow-lg max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-5 text-blue-700">Filtrar Búsqueda</h2>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Region Selector */}
              <div className="flex-1">
                <label htmlFor="region-select" className="block text-base font-medium text-gray-700 mb-2">
                  Región:
                </label>
                <select
                  id="region-select"
                  className="block w-full px-4 py-2 text-base border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-white"
                  value={selectedRegion}
                  onChange={handleRegionChange}
                >
                  <option value="">Todas las Regiones</option>
                  {uniqueRegions.map((region) => (
                    <option key={region.api_id} value={region.api_id}>
                      {region.numero} - {region.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Commune Selector */}
              <div className="flex-1">
                <label htmlFor="comuna-select" className="block text-base font-medium text-gray-700 mb-2">
                  Comuna:
                </label>
                <select
                  id="comuna-select"
                  className="block w-full px-4 py-2 text-base border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out bg-white disabled:bg-gray-100 disabled:text-gray-500"
                  value={selectedComuna}
                  onChange={handleComunaChange}
                  disabled={!selectedRegion}
                >
                  <option value="">Todas las Comunas</option>
                  {uniqueComunas.map((comuna) => (
                    <option key={comuna} value={comuna}>
                      {comuna}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* No Results Message */}
          {filteredFarmacias.length === 0 && (selectedRegion || selectedComuna) && (
            <div className="text-center text-gray-700 text-xl p-8 bg-yellow-50 border border-yellow-200 rounded-xl shadow-md max-w-2xl mx-auto">
              <p className="font-semibold mb-2">¡Ups!</p>
              <p>No se encontraron farmacias de turno para los filtros seleccionados.</p>
              <p className="text-base text-gray-500 mt-2">Intenta cambiar tu selección de región o comuna.</p>
            </div>
          )}

          {/* Results Display */}
          {filteredFarmacias.length > 0 && (
            <>
              {/* Table for larger screens */}
              <div className="hidden md:block overflow-x-auto shadow-xl rounded-xl max-w-6xl mx-auto mt-8 border border-blue-100">
                <table className="min-w-full bg-white divide-y divide-gray-200">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Comuna</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Localidad</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Farmacia</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Dirección</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Horario</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredFarmacias.map((farmacia, idx) => (
                      <tr key={`${farmacia.local_id}-${idx}`} className="hover:bg-blue-50 transition duration-150 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{farmacia.comuna_nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{farmacia.localidad_nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-800">{farmacia.local_nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{farmacia.local_direccion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {farmacia.funcionamiento_hora_apertura} - {farmacia.funcionamiento_hora_cierre}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card layout for small screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden mt-8">
                {filteredFarmacias.map((farmacia, idx) => (
                  <div key={`${farmacia.local_id}-${idx}`} className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
                    <p className="font-bold text-xl mb-3 text-blue-700">{farmacia.local_nombre}</p>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p><span className="font-semibold text-gray-800">Comuna:</span> {farmacia.comuna_nombre}</p>
                      <p><span className="font-semibold text-gray-800">Dirección:</span> {farmacia.local_direccion}</p>
                      {farmacia.local_telefono && (
                        <p>
                          <span className="font-semibold text-gray-800">Teléfono:</span>{' '}
                          <a href={`tel:${farmacia.local_telefono}`} className="text-blue-500 hover:underline font-medium">
                            {farmacia.local_telefono}
                          </a>
                        </p>
                      )}
                      <p><span className="font-semibold text-gray-800">Horario:</span> {farmacia.funcionamiento_hora_apertura} - {farmacia.funcionamiento_hora_cierre}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
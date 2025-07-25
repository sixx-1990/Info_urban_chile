import React from 'react';
import { getMetroData } from '../../lib/api/metro_api';

function estadoGeneral(metroData) {
    const lineasAfectadas = metroData.lines.filter(line => line.issues === true);

    if (lineasAfectadas.length === 0) {
        return <h1 className="text-xl font-semibold text-green-700">
            Todas las líneas están operativas.
        </h1>
    }
    else {

        return <h1 className="text-xl font-semibold text-red-700">
            Hay un problema en la línea {lineasAfectadas.map(line => line.name).join(', ') }.
        </h1>;
    }

}

export default async function MetroPage() {
    const metroData = await getMetroData();

    var mensajeStatus = estadoGeneral(metroData);

    return (
         <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                Estado del Metro de Santiago
            </h1>

            {/* Muestra el mensaje general del estado de las líneas */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6 text-center">
             
                {mensajeStatus}
            </div>

            <p className="text-sm text-gray-600 mb-6 text-center">
                Última actualización: {new Date(metroData.time).toLocaleString('es-CL', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit', second: '2-digit',
                    hour12: true
                })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {metroData.lines.map((line) => (
                    <div
                        key={line.id}
                        className={`
                            p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg
                            ${line.issues === false ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}
                            border-l-4
                        `}
                    >
                        <h2 className="text-2xl font-bold mb-2 flex items-center">
                            {line.name}
                            <span className={`ml-3 px-3 py-1 text-sm font-semibold rounded-full
                                ${line.issues === false ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}
                            `}>
                                {line.issues === false ? 'OPERATIVA' : 'CON PROBLEMAS'}
                            </span>
                        </h2>
                        {line.issues === true && (
                            <p className="text-gray-700 mt-2">
                                Mensaje: <span className="font-medium">Problema detectado en esta línea.</span>
                            </p>
                        )}
                        {line.issues === false && (
                            <p className="text-gray-600 mt-2">Operación normal.</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center text-gray-600">
                <p className="text-sm">
                    Datos obtenidos de la API externa de Metro. La información puede variar.
                </p>
            </div>
        </div>
    )
}


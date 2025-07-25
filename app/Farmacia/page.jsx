import React from 'react';
import { ListaFarmacias } from '../../lib/api/farmacias_api';

export default async function FarmaciaPage() {
    let farmacias = await ListaFarmacias();

    farmacias =farmacias.sort((a, b) => {
        if (a.fk_region < b.fk_region) return -1;
        //if (a.comuna_nombre < b.comuna_nombre) return -1;
        //if (a.localidad_nombre < b.localidad_nombre) return -1;        

        return 0;
    });



    return (


        <div>
            {farmacias.length === 0 ? (
                <div className="text-center text-gray-600 text-lg p-6 bg-yellow-50 border border-yellow-200 rounded-md shadow-sm">
                    <p>No se encontraron farmacias de turno para la región y comuna seleccionadas en este momento.</p>
                </div>) :

                <div className="overflow-x-auto border-yellow-200 border-2 rounded-md shadow-md">
                    <table className="min-w-full bg-white text-black divide-y divide-gray-200   border border-gray-500">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Comuna
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Localidad
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Farmacia
                                </th>

                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Direccion
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Telefono
                                </th>
                                <th colSpan={2} scope="col" className="colspan-2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Horario
                                </th>

                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    hora Cierre
                                </th>


                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {farmacias.map((farmacia) => (
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {farmacia.comuna_nombre}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {farmacia.localidad_nombre}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {farmacia.local_nombre}
                                    </td>


                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {farmacia.local_direccion}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {farmacia.local_telefono}
                                    </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        { farmacia.funcionamiento_dia} 
                                        
                                    </td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        { farmacia.funcionamiento_hora_apertura + "  -  " + farmacia.funcionamiento_hora_cierre} 
                                        
                                    </td>
                                  
                                </tr>
                            ))}



                        </tbody>
                    </table>
                </div>

            }




        </div>



    )

};


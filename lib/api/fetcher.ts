import next from 'next';
import { unstable_cache as noStore } from 'next/cache';

export async function getData(endpoint: string) {
  try {
    const response = await fetch(endpoint, { next: { revalidate: 60 } });


    if (!response.ok) {
      throw new Error('Error al obtener los datos de la API');
    }
    return response.json();
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
  }
}

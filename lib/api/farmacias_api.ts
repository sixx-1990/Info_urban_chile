import { get } from 'http';
import { getData } from './fetcher';


const api_endpoint = 'https://midas.minsal.cl/farmacia_v2/WS/getLocalesTurnos.php';
let data: unknown;


async function getFarmaciasData() {

    try {
        data = await getData(api_endpoint, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0',       
                'Accept': 'application/json',
                'Referer': 'https://hoppscotch.io'
            }
        });

        return data;
    } catch (error) {
        console.error('Error fetching metro data:', error);
    }

    return data
}

export async function ListaFarmacias() {
    if (!data) await getFarmaciasData();
    console.log(data);
    return data;
}


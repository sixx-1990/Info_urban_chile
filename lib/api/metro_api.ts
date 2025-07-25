import { get } from 'http';
import {getData} from './fetcher';


const api_endpoint = 'https://api.xor.cl/red/metro-network'; 
var data : any;


export async function getMetroData() {

  try {
         data = await getData(api_endpoint);
        return data; 
    } catch (error) {
        console.error('Error fetching metro data:', error);
    }
}


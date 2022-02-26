import aspida from '@aspida/fetch';
import api from './api/$api';
import legacy from './legacy/$api';

export const client = api(aspida(fetch, { baseURL: process.env.SONOLUS_API }));
export const clientLegacy = legacy(aspida(fetch, { baseURL: process.env.SONOLUS_API }));

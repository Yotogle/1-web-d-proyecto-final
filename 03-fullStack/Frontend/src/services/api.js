import axios from 'axios';

export const api = axios.create({ 
  baseURL: 'https://1-web-d-proyecto-final-2cq2.vercel.app/appi',
  withCredentials: true 
});
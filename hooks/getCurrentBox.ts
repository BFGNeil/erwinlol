import * as SecureStore from 'expo-secure-store';
import CONFIG from '@/config';

export default async function getCurrentBox() {
    const response = await fetch(`${CONFIG.API_URL}/box/latest`);
    const data = await response.json();
    return data;
}
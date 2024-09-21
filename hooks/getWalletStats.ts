import * as SecureStore from 'expo-secure-store';
import CONFIG from '@/config';

export default async function getWalletStats() {
    const walletId = await SecureStore.getItemAsync('walletID');
    if (!walletId) {
        return;
    }
    const response = await fetch(`${CONFIG.API_URL}/wallet/${walletId}`);
    const data = await response.json();

    return data;
}
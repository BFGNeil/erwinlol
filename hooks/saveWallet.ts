import * as SecureStore from 'expo-secure-store';

export default async function saveWallet(walletID: string | undefined) {
    await SecureStore.setItemAsync('walletID', walletID || '');
  }
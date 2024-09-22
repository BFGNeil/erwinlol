import * as SecureStore from 'expo-secure-store';
import CONFIG from '@/config';

export default async function getWalletBoxes() {
    const walletId = await SecureStore.getItemAsync('walletID');
    if (!walletId) {
      return;
    }
    const response = await fetch(`${CONFIG.API_URL}/wallet/${walletId}/boxes`);
    const data = await response.json();

    const walletBoxes = {
      total: data.total,
      boxes: data.boxes.map((box: any) => {
        return {
          box_id: box.box_id,
          rewards: box.rewards,
          guesses: box.guesses,
          is_burned: box.is_burned,
          opened_at: box.opened_at,
          opener_wallet: box.opener_wallet,
          spawned_at: box.spawned_at,
          state: box.state,
          sate_str: box.state_str,
        };
      }
      )
    };

    return walletBoxes;
  }
import * as SecureStore from 'expo-secure-store';
import CONFIG from '@/config';

export default async function getLeaderboard() {
    const response = await fetch(`${CONFIG.API_URL}/leaderboard`);
    const data = await response.json();
    return data;
}
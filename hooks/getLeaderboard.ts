import * as SecureStore from 'expo-secure-store';
import CONFIG from '@/config';

export default async function getLeaderboard() {
    const response = await fetch(`${CONFIG.API_URL}/leaderboard`);

    /*
    response {"_bodyBlob": {"_data": {"__collector": [Object], "blobId": "ec38e635-3f60-4fc9-b0a2-fe3effc74cae", "offset": 0, "size": 8479}}, "_bodyInit": {"_data": {"__collector": [Object], "blobId": "ec38e635-3f60-4fc9-b0a2-fe3effc74cae", "offset": 0, "size": 8479}}, "bodyUsed": false, "headers": {"map": {"cf-cache-status": "DYNAMIC", "cf-ray": "8cc6f95a4bb2cd79-LHR", "content-type": "application/json", "date": "Wed, 02 Oct 2024 19:07:12 GMT", "nel": "{\"success_fraction\":0,\"report_to\":\"cf-nel\",\"max_age\":604800}", "report-to": "{\"endpoints\":[{\"url\":\"https:\\/\\/a.nel.cloudflare.com\\/report\\/v4?s=n1Pyf34WyxYbQunZMhqcKgPn4O9QDKntQhKR4V4hIHWMHcfUUvQQT%2BgmlFqEH1%2BocC%2FT3omzb%2Bs5nQkG3KFJnB3bgIpLncP%2BivIGuP2Lw4Rwd929O2fRVoSXXBrUb8Eqfw8BiQ%3D%3D\"}],\"group\":\"cf-nel\",\"max_age\":604800}", "server": "cloudflare"}}, "ok": true, "status": 200, "statusText": "", "type": "default", "url": "https://ewnscan.hexato.io/leaderboard"}
    */

    const data = await response.json();
    return data;
}
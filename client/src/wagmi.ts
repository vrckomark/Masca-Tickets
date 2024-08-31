
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Masca Tickets',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet],
});
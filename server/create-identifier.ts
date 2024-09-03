import { agent } from './veramo/setup.js';

async function main() {
  const identifier = await agent.didManagerCreate({ alias: 'vito' });
  console.log(`Novi identifikator ustvarjen`);
  console.log(JSON.stringify(identifier, null, 2));
}

main().catch(console.log);
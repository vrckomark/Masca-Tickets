import { agent } from './veramo/setup.js';

async function main() {
  const identifiers = await agent.didManagerFind();
  console.log(`Obstaja ${identifiers.length} identifikatorjev`);

  if (identifiers.length > 0) {
    identifiers.forEach((id) => {
      console.log(id);
      console.log('..................');
    });
  }
}

main().catch(console.log);

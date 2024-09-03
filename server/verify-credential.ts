import { agent } from './veramo/setup.js';

async function main() {
  const credential = {
    "credentialSubject": {
      "you": "Rock",
      "id": "did:web:example.com"
    },
    "issuer": {
      "id": "did:key:z6MkjxiDEqVhvAEbPUf3cYMMuQn6aD4phKqsje4vh8SfM3qa"
    },
    "type": [
      "VerifiableCredential"
    ],
    "@context": [
      "https://www.w3.org/2018/credentials/v1"
    ],
    "issuanceDate": "2024-09-03T11:32:13.000Z",
    "proof": {
      "type": "JwtProof2020",
      "jwt": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InlvdSI6IlJvY2sifX0sInN1YiI6ImRpZDp3ZWI6ZXhhbXBsZS5jb20iLCJuYmYiOjE3MjUzNjMxMzMsImlzcyI6ImRpZDprZXk6ejZNa2p4aURFcVZodkFFYlBVZjNjWU1NdVFuNmFENHBoS3FzamU0dmg4U2ZNM3FhIn0.ukeEh2GCUwTZ8-IW9tI_ez1ovh5FrIDAf9WOKpdHlj9wC6aCCAroOl9vkBFL8DECDLaDHacxz5kwqkLBIzBKCw"
    }
  };

  const result = await agent.verifyCredential({
    credential,
    verbose: true, // Ta možnost omogoča podrobnejši izpis o preverjanju
  });

  console.log(`Credential verified:`, result.verified);
  console.log('Verification result details:', result);
}

main().catch(console.log);
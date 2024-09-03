import { agent } from '../plugins/veramoAgent';

export const createVerifiableCredential = async (alias: string, subject: object) => {
  try {
    const identifier = await agent.didManagerGetByAlias({ alias });

    if (!identifier) {
      throw new Error(`Identifier with alias ${alias} not found`);
    }

    const verifiableCredential = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: identifier.did },
        credentialSubject: subject,
      },
      proofFormat: 'jwt',
    });

    return verifiableCredential;
  } catch (error) {
    throw new Error('Error creating verifiable credential: ' + error.message);
  }
};
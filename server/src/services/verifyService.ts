import { agent } from '../plugins/veramoAgent';

export const verifyCredential = async (credential: any) => {
  try {
    const result = await agent.verifyCredential({
      credential,
      verbose: true,
    });
    return result;
  } catch (error) {
    throw new Error(`Error verifying credential: ${error.message}`);
  }
};
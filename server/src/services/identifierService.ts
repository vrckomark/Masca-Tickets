// src/services/identifierService.ts
import { agent } from '../plugins/veramoAgent';

export const createIdentifier = async (alias: string) => {
  try {
    const identifier = await agent.didManagerCreate({ alias });
    return identifier;
  } catch (error) {
    throw new Error('Error creating identifier: ' + error.message);
  }
};

import {
    createAgent,
    IDIDManager,
    IResolver,
    IDataStore,
    IDataStoreORM,
    IKeyManager,
    ICredentialPlugin,
  } from '@veramo/core';
  import { DIDManager } from '@veramo/did-manager';
  import { KeyDIDProvider } from '@veramo/did-provider-key';
  import { KeyManager } from '@veramo/key-manager';
  import { KeyManagementSystem, SecretBox } from '@veramo/kms-local';
  import { CredentialPlugin } from '@veramo/credential-w3c';
  import { DIDResolverPlugin } from '@veramo/did-resolver';
  import { Resolver } from 'did-resolver';
  import { getResolver as keyDidResolver } from 'key-did-resolver';
  import {
    Entities,
    KeyStore,
    DIDStore,
    PrivateKeyStore,
    migrations,
    DataStore,
    DataStoreORM,
  } from '@veramo/data-store';
  import { DataSource } from 'typeorm';
  import dotenv from 'dotenv';

  dotenv.config();
  
  // Povezava na Supabase PostgreSQL bazo podatkov
  const dbConnection = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRESSQL_URL,
    synchronize: true,  // Samodejno ustvari in posodobi tabele
    migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities,
  }).initialize();
  
  export const agent = createAgent<
    IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
  >({
    plugins: [
      new KeyManager({
        store: new KeyStore(dbConnection),
        kms: {
          local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(process.env.KMS_SECRET_KEY))),
        },
      }),
      new DIDManager({
        store: new DIDStore(dbConnection),
        defaultProvider: 'did:key',
        providers: {
          'did:key': new KeyDIDProvider({
            defaultKms: 'local',
          }),
        },
      }),
      new DIDResolverPlugin({
        resolver: new Resolver({
          ...keyDidResolver(),
        }),
      }),
      new CredentialPlugin(),
      new DataStore(dbConnection),
      new DataStoreORM(dbConnection),
    ],
  });
  
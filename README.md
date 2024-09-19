# Masca Tickets dApp

Masca Tickets is a decentralized ticket management system built with blockchain technology, enabling users to buy, store, and verify tickets using their digital wallets. It also includes a QR code scanning feature for verifying ticket authenticity at events.

# Installation

## Prerequisites

    Node.js v18 or higher
    PostgreSQL
    MetaMask installed in your browser
    A DID (Decentralized Identifier) system (using Veramo)

```bash

cd client

pnpm install

pnpm dev

cd server

pnpm install

pnpm dev
```

Set up environment variables by creating a .env file in the server directory. You'll need to specify values for the following:

DATABASE_URL=your_postgres_database_url
Just create new supabase or other postgreSQL database...

KMS_SECRET_KEY=your_secret_key_for_key_management
'< you can generate a key by running `npx @veramo/cli config create-secret-key` in a terminal>'
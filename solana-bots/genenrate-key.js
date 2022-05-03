const solana = require('@solana/web3.js');

const keypair = new solana.Keypair();

console.log(keypair.publicKey.toBase58());
console.log([...keypair.secretKey.subarray()]);

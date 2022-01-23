const solana = require('@solana/web3.js');

(async () => {
  const account4 = await solana.PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      new solana.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
      new solana.PublicKey('8ARd2Fq9e2SrDXrYbWm83enq6eXbHtXkPsjQez8yk59B').toBuffer(),
    ],
    new solana.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
  );

  // 81BrwWd2ZLL1zM4TEwaLWxy2wBVPLjv9nWRTtnQcLNqQ
  console.log('metadata pubkey', account4[0].toBase58());

  const account8 = await solana.PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      new solana.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
      new solana.PublicKey('8ARd2Fq9e2SrDXrYbWm83enq6eXbHtXkPsjQez8yk59B').toBuffer(),
      Buffer.from('edition'),
    ],
    new solana.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
  );

  // 6Y3Bx4RgekTxFYQcaqKZK4i3kRvjWepHHSdJKamuEMBK
  console.log('edition pubkey', account8[0].toBase58());

  const account9 = await solana.PublicKey.findProgramAddress(
    [
      Buffer.from('wallet_limit'),
      // candy machine id
      new solana.PublicKey('CACJRw5TNd1AMC15QAunt8yMHAUBbcCKtoeQUWujrgQz').toBuffer(),
      // wallet address
      new solana.PublicKey('3CAnuYg2mWoNjxTq6WGFNgpfZeqMzPqZHN2V1qMrdVed').toBuffer(),
    ],
    new solana.PublicKey('CMY8R8yghKfFnHKCWjzrArUpYH4PbJ56aWBr4kCP4DMk'),
  );

  console.log('wallet limit info', account9[0].toBase58());
})();

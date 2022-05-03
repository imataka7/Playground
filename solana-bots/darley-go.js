const solana = require('@solana/web3.js');
const spl = require('@solana/spl-token');
const fs = require('fs');

(() => {
  const tx = new solana.Transaction();

  const json = fs.readFileSync('private-key.json');
  const privateKey = JSON.parse(json);

  // const newAccount = new solana.PublicKey();
  const myAccount = solana.Keypair.fromSecretKey(new Uint8Array(privateKey));
  const mintAccount = new solana.Keypair();
  const associatedAccount = new solana.Keypair();

  const candyMachine = new solana.PublicKey('2CMg4Q1Ed69CE1o5N1bSPX7bBVrJ73JHdJw2WnCt7rDa');
  const config = new solana.PublicKey('PkhzHs1kwiPhHqBVdJC9GwwdLiesCDRnVpAKdYzvC2s');
  const treasury = new solana.PublicKey('D4LiLYSJJVASqvrHGDqok5joTgPd6PtpuXrWY9ijfh7K');
  const edenCandyMachine = new solana.PublicKey('CMY8R8yghKfFnHKCWjzrArUpYH4PbJ56aWBr4kCP4DMk');

  // console.log(myAccount.publicKey.toBase58());
  // console.log(mintAccount.publicKey.toBase58());
  tx.add(solana.SystemProgram.createAccount({
    newAccountPubkey: mintAccount,
    fromPubkey: myAccount,
    lamports: 0.0014616 * solana.LAMPORTS_PER_SOL,
    programId: spl.TOKEN_PROGRAM_ID,
  }));

  tx.add(new solana.TransactionInstruction({
    data: Buffer.from('2EE2Hhoe8fVAYn7J5qwuayNmrEgmTPskLyszojv'),
    programId: new solana.PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'),
  }));


  tx.add(spl.Token.createInitMintInstruction(
    spl.TOKEN_PROGRAM_ID,
    mintAccount,
    0,
    myAccount,
    myAccount,
  ));

  tx.add(spl.Token.createAssociatedTokenAccountInstruction(
    spl.ASSOCIATED_TOKEN_PROGRAM_ID,
    new solana.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    mintAccount,
    associatedAccount,
  ))
})();
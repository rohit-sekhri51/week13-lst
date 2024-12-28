const { Token, mintTo, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, createTransferInstruction, 
    createTransferCheckedInstruction, 
    getMint,
    mintToChecked,
    burn} = require("@solana/spl-token")
const { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } = require("@solana/web3.js")

const bs58 = require("bs58");

// const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/UdrcqRr_16cAri1OpQhlkTjAilbXtQ6x");
const connection = new Connection("https://devnet.helius-rpc.com/?api-key=0da89612-6136-410f-8718-66f8e4b35d33");

const TOKEN_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

const payer = Keypair.fromSecretKey(
    bs58.decode(
      "2b4NebvH2seq5QyfPUk2uknRHWPeEMg7HCzV8DHTi8tieDVb18thkB7kL7LMyAv9UKNNsRF4kiw6UBy2k9m4VsKX"
    )
  );

 const mintAdd = new PublicKey("CAr31rwWVXh1EFxkuTSmEx7HsyU6CduboCN617U5ford");

 const mintTokens = async (fromAddress, amount) => {
  console.log("Minting");

  const fromPubKey = new PublicKey(fromAddress);

  const payTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintAdd,
    payer.publicKey,
    false);

    console.log("Between ATA");

  const recTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mintAdd,
    fromPubKey,
    false);
    
const payTokenAcc = payTokenAccount.address;
const recTokenAcc = recTokenAccount.address;

// Check if keys are valid
console.log("Payer Token Account: " + payTokenAcc.toString());
console.log('Receiver Token Account:', recTokenAcc.toString());
console.log('Mint Address:', mintAdd.toString());

  
    await mintToChecked(
      connection,
      payer,
      mintAdd,
      recTokenAcc,
      payer,
      amount * 1000000000,
      9
    );

    console.log("After mintTo");
 
}

 const burnTokens = async (fromAddress, toAddress, amount) => {
    console.log("Burning tokens");

    const payTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mintAdd,
      payer.publicKey,
      false);

    burn(
      connection,
      payer,
      payTokenAccount.address,
      mintAdd,
      payer,
      amount * 1000000000
    );

    console.log("Burned 3 tokens");

}

 const sendNativeTokens = async (fromAddress, toAddress, amount) => {

    const fromPubKey = new PublicKey(fromAddress);

        const payTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          payer,
          mintAdd,
          payer.publicKey,
          false);
      
        const recTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          payer,
          mintAdd,
          fromPubKey,
          false);

          
    const payTokenAcc = payTokenAccount.address;
    const recTokenAcc = recTokenAccount.address;

// Check if keys are valid
console.log("Payer Token Account: " + payTokenAcc.toString());
console.log('Receiver Token Account:', recTokenAcc.toString());
console.log('Mint Address:', mintAdd.toString());

console.log("Before Transfer");
// OR use transferChecked (recommended as it's safer)
const transferCheckedInstruction = createTransferCheckedInstruction(
    payTokenAcc,     // Source token account
    mintAdd,           // Token mint address
    recTokenAcc,   // Destination token account
    payer.publicKey,       // Owner of source account
    amount * 1000000000,                // Amount to transfer (in base units)
    9               // Number of decimals of the token
);
    
// Add instruction to transaction
const transaction = new Transaction().add(transferCheckedInstruction);
const latestBlockHash = await connection.getLatestBlockhash()

transaction.recentBlockhash = latestBlockHash.blockhash;
transaction.feePayer = payer.publicKey;
transaction.lastValidBlockHeight = latestBlockHash.lastValidBlockHeight + 150;


const txHash = await sendAndConfirmTransaction(
    connection, 
    transaction, 
    [payer],
    {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
    }
  );
    
    console.log("Transaction successful! Hash:", txHash);
    // console.log("New account created:", newAccountPubkey.publicKey.toBase58());
}

// sendNativeTokens();

module.exports = { mintTokens, burnTokens, sendNativeTokens };


/* 
Key differences:

mintTo(): Creates new tokens, requires mint authority
transfer()/transferChecked(): Moves existing tokens between accounts, requires owner authority

transferChecked() is recommended over transfer() because it validates the token mint and decimals, 
providing an extra layer of safety.
*/

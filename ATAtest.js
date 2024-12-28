const { getAssociatedTokenAddress, createTransferInstruction, 
    createTransferCheckedInstruction, 
    getMint,
    getAccount,
    getAssociatedTokenAddressSync,
    getOrCreateAssociatedTokenAccount} = require("@solana/spl-token")
const { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } = require("@solana/web3.js")
const jsonBigInt = require('json-bigint');
const bs58 = require("bs58");

const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/UdrcqRr_16cAri1OpQhlkTjAilbXtQ6x");

const TOKEN_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

const payer = Keypair.fromSecretKey(
    bs58.decode(
      "2b4NebvH2seq5QyfPUk2uknRHWPeEMg7HCzV8DHTi8tieDVb18thkB7kL7LMyAv9UKNNsRF4kiw6UBy2k9m4VsKX"
    )
  );

 const mintAdd = new PublicKey("CAr31rwWVXh1EFxkuTSmEx7HsyU6CduboCN617U5ford");

async function main() {

console.log("Entry");

// const tokenAccountPubkey = new PublicKey("BhdgqV429GtSosDutcbFjfCiSqmDL6EuEpcAQ24cyq86");

// const accountInfo = await connection.getParsedAccountInfo(tokenAccountPubkey);
// console.log("Account owner:", accountInfo.value.owner.toBase58());

 // works with argument as ATA 
 // It works only for TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA    , 
// Not for TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb (Token-2022)  , 5tocns6cELzbqppDsnMvWAvBZu2f5owhHGzBSnwUkQbu
// let tokenAccount = await getAccount(connection, tokenAccountPubkey);
// console.log(tokenAccount);

// const mintAddr = await getMint(connection,mintAdd);
// It works only for TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA    , C3VsJdHygVgSbDqMSktW651ZRrGUgmk8VkrUnAPDNJYM
// Not for TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb (Token-2022) , Ct5S4WeWhyyBr4yYUoS3a2PUZV9ZFewwTPXf7TUY3guD
// console.log("Payer Mint Account: " + mintAddr.address.toString());
//  console.log("Payer Mint Supply: " + mintAddr.supply);
//  console.log("Payer Mint Init: " + mintAddr.isInitialized);
//  console.log("Payer Mint Freeze Auth: " + mintAddr.freezeAuthority);

const payPK = new PublicKey("RSekpR9nXkrA3g7LqhzknyKG39W6waD14br2H4LZrWd");

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
      payPK,
      false
    );

    const payTokenAcc = payTokenAccount.address.toString();
    const recTokenAcc = recTokenAccount.address.toString();

console.log("Sender PubKey: " + payer.publicKey.toString());
console.log("Payer Mint: " + mintAdd);  

//console.log("Payer Token Account: " + jsonBigInt.stringify(payTokenAccount));
// console.log("Payer Token Account: " + JSON.stringify({ value: payTokenAccount.toString() }));
console.log("Sender ATA: " + payTokenAcc);
console.log("Rec ATA: " + recTokenAcc);

}

main();
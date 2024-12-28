// Get All Token Mint Addresses for a Wallet Address:
// In Solana, a wallet account address doesn’t directly store any specific token mint address, 
// as it can hold multiple token accounts, each associated with a different token mint. 
// However, you can list all the token accounts owned by a wallet and retrieve the mint addresses of the tokens 
// in those accounts.

const { Connection, PublicKey, clusterApiUrl } = require("@solana/web3.js");
const { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } = require("@solana/spl-token");

(async () => {
  // Connect to the Solana devnet (or switch to mainnet if needed)
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Replace with the wallet address you want to check
  const walletAddress = new PublicKey("DnDm1Aii8TAacpraLuv2HYqJHxGSCN4RdcRTe5Q1KjF7");

  // Get all token accounts owned by this wallet address
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    walletAddress,
    { programId: TOKEN_PROGRAM_ID }
  );
// It works only for TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA    , C3VsJdHygVgSbDqMSktW651ZRrGUgmk8VkrUnAPDNJYM
// Not for TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb (Token-2022) , Ct5S4WeWhyyBr4yYUoS3a2PUZV9ZFewwTPXf7TUY3guD

  console.log(`Token accounts for wallet ${walletAddress.toBase58()}:`);
  console.log("UnParsed ATA: "+ tokenAccounts.value[0]?.pubkey );       // ATA
  console.log("UnParsed Info: "+ tokenAccounts.value[0]?.account.data.parsed.info.tokenAmount.uiAmount ); // Token Balance
  
  // Iterate through each token account and print the mint address
  tokenAccounts.value.forEach((accountInfo) => {
    const tokenAccountData = accountInfo.account.data.parsed.info;
    const mintAddress = tokenAccountData.mint;                      // Mint
    console.log("Token Mint Address:", mintAddress);
    console.log("Token Mint Address:", tokenAccountData);
  });
})();

// Explanation
// walletAddress: Replace "YOUR_WALLET_ADDRESS" with the public key of the wallet whose token mints you want to list.
// connection.getParsedTokenAccountsByOwner: This method fetches all token accounts owned by the specified wallet. 
// Each token account contains information about a specific token, including its mint address.
// tokenAccountData.mint: The mint field inside each token account data structure represents the token mint address 
// for that particular token account.
// Important Points
// Multiple Tokens: A wallet can hold multiple tokens, so this code lists all token mint addresses associated with all 
// token accounts held by the wallet.
// Empty Wallets: If the wallet does not hold any tokens, tokenAccounts.value will be an empty array.
// This approach gives you all token mint addresses associated with any token accounts the wallet

const bs58 = require("bs58");
const {Keypair}= require("@solana/web3.js");

const base58String = '31UAtEo2yhsuUVTHFneV3YsvKJyAv9fixZ6Kw1fiayimYxK1B8iCdnagU1emoFwiDt65tTozvEz7kDsbeZo4m52H';

const secretKey = bs58.decode(base58String);
// console.log("secretKey is: " + secretKey);

// Create a Keypair from the secret key
const keypair = Keypair.fromSecretKey(secretKey);

console.log('Public Key:', keypair.publicKey.toBase58());
console.log('Secret Key:', bs58.encode(keypair.secretKey));
// console.log('Secret Key:', keypair.secretKey);
 console.log('Secret Key:', keypair);
// console.log('Secret Key:', keypair.publicKey);
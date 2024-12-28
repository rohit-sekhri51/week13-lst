// require('dotenv').config();

const {mintTokens, sendNativeTokens, burnTokens } = require("./mintToken");
const { PublicKey, Keypair } = require('@solana/web3.js');
const bs58 = require("bs58");

const express = require("express");
const app = express();

const heliusParamIn = { "nativeTransfers": [ { "amount":50,
     "fromUserAccount": "EgjMXWy9xbPpkemjkccJixXGVHRadae4gHQJwHcxZGcd", 
     "toUserAccount": "DnDm1Aii8TAacpraLuv2HYqJHxGSCN4RdcRTe5Q1KjF7" } ] }
     

const my_wallet = new PublicKey("DnDm1Aii8TAacpraLuv2HYqJHxGSCN4RdcRTe5Q1KjF7");

app.post('/helius', async(req, res) => {
    const incomingTx = heliusParamIn.nativeTransfers.find(x => x.toUserAccount == my_wallet);

    if(!incomingTx) {
        res.json({message: "Helius Tx Not Processed"});
    }

    const fromAddress = incomingTx.fromUserAccount;
    const toAddress = my_wallet;
    const amount = incomingTx.amount;
    const type = "received_native_token";

    if (type === "received_native_sol") {
        
        await mintTokens(fromAddress, amount);
    } else {
        // What could go wrong here?
        await burnTokens(fromAddress, toAddress, amount);
        // await sendNativeTokens(fromAddress, toAddress, amount);
    }

    res.send('Transaction successful');
});

app.get('/', async (req,res) => {
    res.send('Welcome to Helius LST');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
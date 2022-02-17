/*Write a web3 script to transfer ether from one address to another and also to display a balance of the 2 addresses 
in question before and after transfer. */


const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);
const address1 = "0x4285F08a57e718115d638861F7100ff1BE782301";
const address2 = "0x9CbB29A38FF7751e3Ac04Bd3DEf1529EB22d5D22";
const pvtkey1 = Buffer.from(
  "0d109c1961c0d248d3a5085315d68fc2665fd6826a449027a1b17b560c8a875a",
  "hex"
);
const pvtkey2 = Buffer.from(
  "529f97fc12ce5cbd659cea23c41fb3c5d713835dfc9fff404db3d4c76485d759",
  "hex"
);

const balances = async () => {
  const balanceFrom = web3.utils.fromWei(
    await web3.eth.getBalance(address1),
    "ether"
  );
  const balanceTo = await web3.utils.fromWei(
    await web3.eth.getBalance(address2),
    "ether"
  );

  console.log(`The balance of ${address1} is: ${balanceFrom} ETH.`);
  console.log(`The balance of ${address2} is: ${balanceTo} ETH.`);
};

console.log("BALANCE BEFORE TRANSACTION");
balances();

web3.eth.getTransactionCount(address2, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: address1,
    value: web3.utils.toHex(web3.utils.toWei("0.05", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };
  const tx = new Tx(txObject, { chain: "rinkeby" });
  tx.sign(pvtkey2);
  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");
  web3.eth
    .sendSignedTransaction(raw, (err, txHash) => {
      console.log("err:", err);
      console.log("txHash:", txHash);
    })
    .on("receipt", () => {
      console.log("BALANCE AFTER TRANSACTION");
      balances();
    });
});

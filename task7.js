/*
Create a script to send a transaction with a very low gas price and then create a script to speed up or 
cancel that transaction.


It’s technically possible to cancel a transaction, but highly unlikely. Essentially, the only way to do so 
would be to try to send another transaction using the same account/nonce combination and hope it gets mined 
before the transaction you want to cancel is mined.
*/

const axios = require("axios");
const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);
const address1 = "0x4285F08a57e718115d638861F7100ff1BE782301";
const address2 = "0x9CbB29A38FF7751e3Ac04Bd3DEf1529EB22d5D22";
const pvtkey1 =
  "46cfaed639fa1c45f7128ef6f39026691827c147716f46c79a60a3b8b10c91dc";
const pvtkey2 =
  "529f97fc12ce5cbd659cea23c41fb3c5d713835dfc9fff404db3d4c76485d759";

const user1 = web3.eth.accounts.wallet.add(pvtkey1);
const user2 = web3.eth.accounts.wallet.add(pvtkey2);

const amount = web3.utils.toHex(web3.utils.toWei("0.2", "ether"));

const tokenAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //LINK ADDRESS
const { abi } = require("./abi/ERC20Abi.json"); //erc20 abi
const contract = new web3.eth.Contract(abi, tokenAddress);

const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10
    }
    return prices;
}

const speedUpTransaction = async () => {
    let nonce = await web3.eth.getTransactionCount(address1);
    let gasPrices = await getCurrentGasPrices();

    let txObject = {
        from: user1.address,
        nonce,
        gasLimit: 210000,
        gasPrice: gasPrices.high * 1000000000,
    }
    let res = contract.methods.transfer(address2, amount).send(txObject, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the fast transaction: ", res);
      })
    console.log('Speeded Tx', res);

}

const sendLowGasTransaction = async () => { 
    let nonce = await web3.eth.getTransactionCount(address1);
    let txObject = {
        from: user1.address,
        nonce,
        gasLimit: 210000,
        gasPrice: web3.utils.toWei("10", "gwei"),
      }
    
    let res = await contract.methods.transfer(address2, amount).send(txObject, function (err, res) {
        if (err) {
          console.log("An error occured", err);
          return;
        }
        console.log("Hash of the slow transaction: ", res);
      })
    console.log('Slow TX', res);

}

const txRace = async () => { 
    sendLowGasTransaction(); //Transaction will not mined within 750 seconds or 12.5 minutes
    await speedUpTransaction();
}

txRace();



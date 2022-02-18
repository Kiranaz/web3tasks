/* Write a web3 script to interact with an ERC20 token contract and execute its transfer,transferFrom, approve, 
allowance and balanceOf functions. */

const Web3 = require("web3");
var Tx = require("ethereumjs-tx").Transaction;
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);
const address1 = "0x4285F08a57e718115d638861F7100ff1BE782301";
const address2 = "0x9CbB29A38FF7751e3Ac04Bd3DEf1529EB22d5D22";
// const pvtkey1 = Buffer.from(
//   "0d109c1961c0d248d3a5085315d68fc2665fd6826a449027a1b17b560c8a875a",
//   "hex"
// );
const pvtkey1 = "46cfaed639fa1c45f7128ef6f39026691827c147716f46c79a60a3b8b10c91dc";
const pvtkey2 = "529f97fc12ce5cbd659cea23c41fb3c5d713835dfc9fff404db3d4c76485d759";
// const pvtkey2 = Buffer.from(
//   "529f97fc12ce5cbd659cea23c41fb3c5d713835dfc9fff404db3d4c76485d759",
//   "hex"
// );

const user1 = web3.eth.accounts.wallet.add(pvtkey1);
const user2 = web3.eth.accounts.wallet.add(pvtkey2);

console.log('user1', user1)

// const tokenAddress = "0x031a9dD354B964A90Fd82951119612ADca3EAa82"; //DAFI ADDRESS
const tokenAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //LINK ADDRESS
const { abi } = require("./abi/ERC20Abi.json"); //erc20 abi
const smart_contract_interface = new web3.eth.Contract(abi, tokenAddress);



const getBalance = () => {
    smart_contract_interface.methods.balanceOf(address1).call(function (err, res) {
      if (res) {
        console.log("The balance is: ", res);
        // return;
      } else {
        console.log("An error occured bhai", err);
      }
    });
};
const transferTokens = async () => {
    try {
        const amount = web3.utils.toWei('5', 'ether')
        console.log(amount)
        smart_contract_interface.methods
        .transfer(address2, amount)
        .send({ from: user1.address, gas: "96000" }, function (err, res) {
          if (err) {
            console.log("An error occured", err);
            return;
          }
          console.log("Hash of the transaction: ", res);
        });
    } catch (e) {
      console.log(e);
    }
};
getBalance();
transferTokens();

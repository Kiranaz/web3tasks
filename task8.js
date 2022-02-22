/*
Create a script that fetches all transactions executed by an address.
*/
// Best way is to use etherscan.io api

const Web3 = require("web3");
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);
const address1 = "0x4285F08a57e718115d638861F7100ff1BE782301";

const getAllTransactionsByAddress = async () => {
    let endBlockNumber = await web3.eth.getBlock('latest');
    let startBlockNumber = endBlockNumber.number-1000; //10213973
    console.log("Searching for transactions to/from account \"" + address1 + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber.number);
    for (let i = startBlockNumber; i <= endBlockNumber.number; i++) {
        console.log("Searching block " + i);
        let block = await web3.eth.getBlock(i, true);
        if (block != null && block.transactions != null) {
          block.transactions.forEach( function(e) {
            if (address1 == "*" || address1 == e.from || address1 == e.to) {
              console.log("  tx hash          : " + e.hash + "\n"
                + "   nonce           : " + e.nonce + "\n"
                + "   blockHash       : " + e.blockHash + "\n"
                + "   blockNumber     : " + e.blockNumber + "\n"
                + "   transactionIndex: " + e.transactionIndex + "\n"
                + "   from            : " + e.from + "\n" 
                + "   to              : " + e.to + "\n"
                + "   value           : " + e.value + "\n"
                + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
                + "   gasPrice        : " + e.gasPrice + "\n"
                + "   gas             : " + e.gas + "\n"
                + "   input           : " + e.input);
            }
          })
        }
      }
}

getAllTransactionsByAddress();
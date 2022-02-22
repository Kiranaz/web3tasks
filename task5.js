/*Create a function that takes tx-hash as input and outputs whether the transaction is confirmed or failed, 
if confirmed display the amount of tx_fees incurred.
*/ 

const Web3 = require('web3')
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);

const txnHash =
  "0x2f6189726e3d5e3b1e56f2dbca7f1ae60d21dc29e91a7fbb8004c8dbf1fc8587";

web3.eth.getTransactionReceipt(txnHash, function (err, res) {
  try {
    console.log(res);
    if (!res.status) {
      console.log(
        "Unsuccessful transaction."
      );
    } else {
      console.log(
        "Gas used to execute this transaction: ",
        web3.utils.fromWei(
          (
            res.gasUsed * web3.utils.hexToNumber(res.effectiveGasPrice)
          ).toString()
        )
      );
    }
  } catch  (error) {
    console.log("Error -> ", error);
  }
});
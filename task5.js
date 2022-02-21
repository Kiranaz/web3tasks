/*Create a function that takes tx-hash as input and outputs whether the transaction is confirmed or failed, 
if confirmed display the amount of tx_fees incurred.
*/ 

const Web3 = require('web3')
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);

const txnHash =
  "0x97183b6e287d2ff4dae83d97af45a2d3f595285976a106c289e0042c431b4793";

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
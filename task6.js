/*Create a function that takes tx_hash of an erc20 transfer and determines how many erc20 tokens were transferred 
along with the sender and receiver.
*/ 

const Web3 = require('web3')
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);

const txnHash =
  "0x10d533e3bdad927cc3470c7132ca72389bb213bcd2d133e41a811b645ae8b122";

web3.eth.getTransaction(txnHash, function (err, res) {
    try {
        let methodSign = "0x" + res.input.slice(10);
        let params = web3.eth.abi.decodeParameters(
          ["address", "uint256"],
          methodSign
        );
        console.log(params);
        console.log(
            `Receiver ${params[0]} received ${web3.utils.fromWei(params[1])} tokens from Sender :${res.from}`
        );
  } catch (error) {
    console.log("Error -> ", error);
  }
});


/*

https://medium.com/@codetractio/inside-an-ethereum-transaction-fa94ffca912f

0xa9059cbb000000000000000000000000dfbc84ccac430f2c0455c437adf417095d7ad68e0000000000000000000000000000000000000000000000158b5ff8fb42b95000

0xa9059cbb

This is the hash of the method signature. The first 32 bit a9059cbb is the first 32 bit of the hash of the function. In this case the function is transfer(address _to, uint256 _value) and its hash is
console.log(web3.sha3('transfer(address,uint256)'));
//0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b

000000000000000000000000dfbc84ccac430f2c0455c437adf417095d7ad68e

This is the address where the tokens are being sent.

0000000000000000000000000000000000000000000000158b5ff8fb42b95000

This is the amount (in Hex) and is the value you are looking for. In this example, this comes out to 397.424645 tokens.
*/ 
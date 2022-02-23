/*
Create a script that calculates the current number of token holders of a particular token.
*/
const axios = require("axios");
const Web3 = require("web3");
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);

const tokenAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //LINK ADDRESS
const { abi } = require("./abi/ERC20Abi.json"); //erc20 abi
const contract = new web3.eth.Contract(abi, tokenAddress);

const tokenHolders = async () => {

  let addressesMadeTxUsingToken = [];
  let count = 0;
    // let apikey = "UBY73PQ1HIHCY9D5348318DFK92ZIP723E";
    // let latestBlock = await web3.eth.getBlockNumber()
    // let transactions = await axios.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${tokenAddress}&startblock=0&endblock=${latestBlock}&page=1&offset=3&sort=asc&apikey=${apikey}`);
    // let res = await web3.eth.getTransactionReceipt(transactions.data.result[0].hash); //first transaction for the given contract address will definitely be of its own creation

    // console.log('fromBlock--->', res.blockNumber); //2746114 -- first block having LINK token
    
     let res = await contract.getPastEvents('Transfer', {
         fromBlock: 10216727, //should be res.blockNumber but getting Error: Returned error: query returned more than 10000 results
         toBlock: 'latest'
    })


  res.map((tx) => {
      addressesMadeTxUsingToken.push(tx.returnValues.from)
      addressesMadeTxUsingToken.push(tx.returnValues.to)
    })

    addressesMadeTxUsingToken.map(async(address, index) => {
      let balance = await web3.utils.fromWei(await contract.methods.balanceOf(address).call());
      if(parseInt(balance) > 0){
        count++;
      }
      if(index == addressesMadeTxUsingToken.length - 1){
        console.log('Number of token holders: ', count);
      }
    })
}

tokenHolders();
/*
Create a function that inputs a contract address and output the deployer’s address.
*/
const axios = require("axios");
const Web3 = require("web3");
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);

const tokenAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //LINK ADDRESS


// https://stackoverflow.com/a/54066603/12163730
async function getContractCreatorAddress() {
    let currentBlockNum = await web3.eth.getBlockNumber();
    let txFound = false;

    while(currentBlockNum >= 0 && !txFound) {
        const block = await web3.eth.getBlock(currentBlockNum, true);
        const transactions = block.transactions;

        for(let j = 0; j < transactions.length; j++) {
            if(!transactions[j].to) {
                const receipt = await web3.eth.getTransactionReceipt(transactions[j].hash);
                if(receipt.contractAddress && receipt.contractAddress.toLowerCase() === tokenAddress.toLowerCase()) {
                    txFound = true;
                    console.log(`Contract Creator Address: ${transactions[j].from}`);
                    break;
                }
            }
        }
        currentBlockNum--;
    }
}
// getContractCreatorAddress(); //Method 1 for achieving this task - kinda infinite loop
// -----------------------------------------------------------------------------------------------------------

const contractDeployerAd = async () => {
    let apikey = "UBY73PQ1HIHCY9D5348318DFK92ZIP723E";
    let latestBlock = await web3.eth.getBlockNumber()
    let TxList = await axios.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${tokenAddress}&startblock=0&endblock=${latestBlock}&page=1&offset=3&sort=asc&apikey=${apikey}`);
    let res = await web3.eth.getTransactionReceipt(TxList.data.result[0].hash); //first transaction for the given contract address will definitely be of its own creation

   console.log('Contract Deployer: ', res.from);
}
contractDeployerAd(); //Method 2 with etherscan api
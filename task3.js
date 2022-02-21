/*Create a dynamic function that takes contract address, event name, start block, end block as input and then 
fetches the events of the contracts address defined. Also perform filtration on the events fetched.*/

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
  
//   readline.question('Who are you?\n', name => {
//     console.log(`Hey there ${name}!`);
//     readline.close();
//   });

const Web3 = require('web3')
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);

// LINK Token Contract
const tokenAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //LINK ADDRESS
const { abi } = require("./abi/ERC20Abi.json"); //erc20 abi
const contract = new web3.eth.Contract(abi, tokenAddress);

// Get Contract Event Stream
const contractEventStream = async () => {
    let latestBlock = await web3.eth.getBlockNumber();
    console.log(await contract.getPastEvents(
        'AllEvents',
        {
            // filter: {address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"},
            filter: {blockHash: "0xc420d7e35c09aad0984d148508e6f522f76d42247b59ca3c5c07f80af9bb047f"},
            fromBlock: latestBlock-50,
            toBlock: 'latest'
        }
    ))
}

contractEventStream();
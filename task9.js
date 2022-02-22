/*
Create a script that fetches all erc20 token transfers of a particular token.
*/
const Web3 = require("web3");
const url = "https://rinkeby.infura.io/v3/e586643099c84bb8b060976da87dfc6c";
const web3 = new Web3(url);

const tokenAddress = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //LINK ADDRESS
const { abi } = require("./abi/ERC20Abi.json"); //erc20 abi
const contract = new web3.eth.Contract(abi, tokenAddress);

const tokenTransfers = async () => {
  let res = await contract.getPastEvents("Transfer", {
    fromBlock: 10214328,
    toBlock: "latest",
  });
  console.log("LINK TRANSFER EVENTS", res);
};

tokenTransfers();
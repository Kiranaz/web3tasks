/*Create a dynamic function that takes contract address, events name and subscribes to the event defined.*/ 

const Web3 = require('web3')
const url = "wss://mainnet.infura.io/ws/v3/e586643099c84bb8b060976da87dfc6c"; //wss url as subscribe works for web socket provider
const web3 = new Web3(url);

const eventSubs = async () => {
    try {
      let options = {
        address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709", //Contract Address / An address or a list of addresses to only get logs from particular account(s).
        topics: [
          "null", //An array of values which must each appear in the log entries
        ],
      };
  //function lets you subscribe to specific events in the blockchain.
      web3.eth
        .subscribe("pendingTransactions", (err, res) => {
          if (!err) console.log("res => ", res);
          else console.log("err => ", err);
        })
        .on("data", log => {
          console.log("Got data => ", log);
        });
    } catch (error) {
      console.log("Error -> ", error);
    }
  };
  
  eventSubs();
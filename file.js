const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const EthWallet = require('ethereumjs-wallet')
const Web3 = require('web3');


const network = process.env.POLYGON_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rpc.ankr.com/polygon_mumbai`
  )
);

let arrayss =["0x0402B26fddA6ae9403b66CD6842a71f1d9Efd807","0xff28322e1fD7B3dFc5b6A7588acbA947cFB98116","0x3d99fD6Df0222D77829C4B40ae7282248b8c3892"];
  
  const leaves = arrayss.map(x => keccak256(x))
  console.log(leaves)
    
  const tree = new MerkleTree(leaves, keccak256, {
      sortPairs: true
  })
  const buf2hex = x => '0x' + x.toString("hex")
  
  const rootie = buf2hex(tree.getRoot())
  console.log("first root ------------------- ", buf2hex(tree.getRoot()))
  
  let arrays = arrayss[0]
  let hashedarrays = keccak256(arrays)
  let proof = tree.getHexProof(hashedarrays)
console.log("first proof------------------- ", proof)

  const leafd = buf2hex(keccak256(arrays))
  console.log("leaf------------------- ", leafd)
  
console.log("****************************************")
  


const merkleABI =
[
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "proof",
				"type": "bytes32[]"
			},
			{
				"internalType": "address[]",
				"name": "addresses",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "amt",
				"type": "uint256[]"
			}
		],
		"name": "changestatus",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_roootHash",
				"type": "bytes32"
			},
			{
				"internalType": "contract IERC20",
				"name": "token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "createHash",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_root",
				"type": "bytes32"
			}
		],
		"name": "setroootRoot",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "leaf",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32[]",
				"name": "proof",
				"type": "bytes32[]"
			}
		],
		"name": "_roootHashVerify",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "addressUser",
				"type": "address[]"
			}
		],
		"name": "ckeckaddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "doesHashExist",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "hassh",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32[]",
				"name": "proof",
				"type": "bytes32[]"
			},
			{
				"internalType": "bytes32",
				"name": "leaf",
				"type": "bytes32"
			}
		],
		"name": "isValid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "outofbalance",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OwnerOnly",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


const merkle = "0x530119D080C69713a401AD223e4ED7A5FeB597bA";
const maticaddress = "0x42159Bb27C4b6e4aee6A0eE2d2EB32b8A820FD49";
MyContract = new web3.eth.Contract(merkleABI, merkle);

//3 addresses
const walletAddress = "0x0402B26fddA6ae9403b66CD6842a71f1d9Efd807"; //WalletAddress//deployer
const addres1="0xff28322e1fD7B3dFc5b6A7588acbA947cFB98116";//address2
const addres2 = "0x3d99fD6Df0222D77829C4B40ae7282248b8c3892";//address3

console.log(web3.eth.accounts.wallet.add('b013b385021a23776eb52d46f28931069391b58adac223ba45fc1dc2c4a04f5a')); //walletAddress privateKey
console.log(web3.eth.accounts.wallet.add('45c9866a3f62994817c64fa3a9a5219172ab2a156c09a247877ae226eb881aa8')); //addres1 privateKey
console.log(web3.eth.accounts.wallet.add('c6c0d0fc12f595896d3b2624f080edcbbecaa4b4bdb74f313e5dd86f669eaa22')); //addres3 privateKey


// var myContract = new web3.eth.Contract(merkle,merkleABI); //contractAddress

const privateKey1 = Buffer.from('b013b385021a23776eb52d46f28931069391b58adac223ba45fc1dc2c4a04f5a', 'hex');

MyContract.methods.changestatus(proof,["0x0402B26fddA6ae9403b66CD6842a71f1d9Efd807","0xff28322e1fD7B3dFc5b6A7588acbA947cFB98116","0x3d99fD6Df0222D77829C4B40ae7282248b8c3892"],[1,1,1]).send({ from: walletAddress, gas: 6000000 }).then((txn) =>
{
    console.log("success", txn);
}).catch(function (e)
{
    console.log(e.message);
})

// MyContract.methods.ckeckaddress(["0x3372bAbF74fe18d94Be376516d83182925029c75","0x576A90b36C3cAe49Eba313cA4E2fa9C0CDe49619"]).send({ from: walletAddress, gas: 6000000 }).then((txn) =>
// {
//     console.log("success", txn);
// }).catch(function (e)
// {
//     console.log(e.message);
// })




// let outarrayss = ["0x3372bAbF74fe18d94Be376516d83182925029c75","0x576A90b36C3cAe49Eba313cA4E2fa9C0CDe49619"];
  
//   const outleaves = arrayss.map(x => keccak256(x))
//   console.log(leaves)
    
//   const outtree = new MerkleTree(leaves, keccak256, {
//       sortPairs: true
//   })
  
// const outrootie = buf2hex(tree.getRoot())
// console.log("root ------------------- ", buf2hex(tree.getRoot()))
  
  
//   MyContract.methods.setroootRoot(outrootie).send({ from: walletAddress, gas: 6000000 }).then((txn) =>
// {
//     console.log("success", txn);
// }).catch(function (e)
// {
//     console.log(e.message);
// })

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WrpEth, WrpEthInterface } from "../WrpEth";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002cc638038062002cc68339818101604052810190620000379190620003e7565b81818160039080519060200190620000519291906200019a565b5080600490805190602001906200006a9291906200019a565b5050506200008d62000081620000c960201b60201c565b620000d160201b60201c565b620000c17f927b3b2b195dcae87db842af0313b4c7064a0819a856ab1c7bc6c16e5105277b60001b6200019760201b60201c565b5050620004d1565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b828054620001a8906200049b565b90600052602060002090601f016020900481019282620001cc576000855562000218565b82601f10620001e757805160ff191683800117855562000218565b8280016001018555821562000218579182015b8281111562000217578251825591602001919060010190620001fa565b5b5090506200022791906200022b565b5090565b5b80821115620002465760008160009055506001016200022c565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002b38262000268565b810181811067ffffffffffffffff82111715620002d557620002d462000279565b5b80604052505050565b6000620002ea6200024a565b9050620002f88282620002a8565b919050565b600067ffffffffffffffff8211156200031b576200031a62000279565b5b620003268262000268565b9050602081019050919050565b60005b838110156200035357808201518184015260208101905062000336565b8381111562000363576000848401525b50505050565b6000620003806200037a84620002fd565b620002de565b9050828152602081018484840111156200039f576200039e62000263565b5b620003ac84828562000333565b509392505050565b600082601f830112620003cc57620003cb6200025e565b5b8151620003de84826020860162000369565b91505092915050565b6000806040838503121562000401576200040062000254565b5b600083015167ffffffffffffffff81111562000422576200042162000259565b5b6200043085828601620003b4565b925050602083015167ffffffffffffffff81111562000454576200045362000259565b5b6200046285828601620003b4565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004b457607f821691505b60208210811415620004cb57620004ca6200046c565b5b50919050565b6127e580620004e16000396000f3fe6080604052600436106100c35760003560e01c806306fdde03146100c8578063095ea7b3146100f357806318160ddd1461013057806323b872dd1461015b5780632e1a7d4d14610198578063313ce567146101c157806339509351146101ec57806347e7ef241461022957806370a0823114610245578063715018a6146102825780638da5cb5b1461029957806395d89b41146102c4578063a457c2d7146102ef578063a9059cbb1461032c578063dd62ed3e14610369578063f2fde38b146103a6575b600080fd5b3480156100d457600080fd5b506100dd6103cf565b6040516100ea9190611bf6565b60405180910390f35b3480156100ff57600080fd5b5061011a60048036038101906101159190611cb1565b610461565b6040516101279190611d0c565b60405180910390f35b34801561013c57600080fd5b5061014561047f565b6040516101529190611d36565b60405180910390f35b34801561016757600080fd5b50610182600480360381019061017d9190611d51565b610489565b60405161018f9190611d0c565b60405180910390f35b3480156101a457600080fd5b506101bf60048036038101906101ba9190611da4565b610841565b005b3480156101cd57600080fd5b506101d6610997565b6040516101e39190611ded565b60405180910390f35b3480156101f857600080fd5b50610213600480360381019061020e9190611cb1565b6109a0565b6040516102209190611d0c565b60405180910390f35b610243600480360381019061023e9190611cb1565b610a4c565b005b34801561025157600080fd5b5061026c60048036038101906102679190611e08565b610d5b565b6040516102799190611d36565b60405180910390f35b34801561028e57600080fd5b50610297610da3565b005b3480156102a557600080fd5b506102ae610e2b565b6040516102bb9190611e44565b60405180910390f35b3480156102d057600080fd5b506102d9610e55565b6040516102e69190611bf6565b60405180910390f35b3480156102fb57600080fd5b5061031660048036038101906103119190611cb1565b610ee7565b6040516103239190611d0c565b60405180910390f35b34801561033857600080fd5b50610353600480360381019061034e9190611cb1565b610fd2565b6040516103609190611d0c565b60405180910390f35b34801561037557600080fd5b50610390600480360381019061038b9190611e5f565b61106a565b60405161039d9190611d36565b60405180910390f35b3480156103b257600080fd5b506103cd60048036038101906103c89190611e08565b6110f1565b005b6060600380546103de90611ece565b80601f016020809104026020016040519081016040528092919081815260200182805461040a90611ece565b80156104575780601f1061042c57610100808354040283529160200191610457565b820191906000526020600020905b81548152906001019060200180831161043a57829003601f168201915b5050505050905090565b600061047561046e6111e9565b84846111f1565b6001905092915050565b6000600254905090565b60006104b77f18ccfe1de00d8975f7790918a9c8e837fd69c32ba9aee8a734506ccf90d946c460001b6113bc565b6104e37f9a7bbfae5478ee914ed71e1c17e5b81906ef05ed8ebd247a6424103049bd50a860001b6113bc565b61050f7f25fb96da7818b136e7e9a7e4b08dc7227b94541f7eb13b12f16936a87a41a1be60001b6113bc565b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16146107a95761056e7f92628e68a9ea034f3a4f428395bdc23f5e72fb6d204fcb7e322337058384907360001b6113bc565b61059a7fa4b56150e3602e2f74a2786a828ce56670df7fa579911868a35907df2e3c6f0860001b6113bc565b6105c67f961978adef9020ebaa57e18083120ce4aed8ca2cefae6806e587093b35bd73df60001b6113bc565b6105f27f7c842f3df839a7191f8211abf7af01d756c9b5a746850d4698113e5cbd96f2a460001b6113bc565b816105fd853361106a565b101561063e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161063590611f72565b60405180910390fd5b61066a7f3fc08fb0a2ace9467040ea8a51379c97dff864998ba5a2b0220c14f3b9de87b160001b6113bc565b6106967fba9ea3e0c31789e432960bf2189f55372d1289c2193acb0f30d6a89e00fcd56f60001b6113bc565b6106c27f6f4c1cec41cf14a06a83678b5bf523b367993c8d7d5fc94dea8f8431ed4e7c6760001b6113bc565b6000826106cf863361106a565b6106d99190611fc1565b90506107077f8baf02d1679e6535b6e5660c6bc474ce366b382a5dcaf04b4c13ebef396eefc460001b6113bc565b6107337f673ef2bae1f5f5350f33547776f2ad8c3523e4d59935cff8f657d8b7d412c20160001b6113bc565b61073d8582610461565b5061076a7f13d4c43ea803d244f3b2440644cac02016217456154cb7aabb5e6f2fbbf0c36960001b6113bc565b6107967fa309f61fa59e810a0f827168c66b600784ba2b362273c218d3f19cb489c1caab60001b6113bc565b6107a18585856113bf565b91505061083a565b6107d57f6c628ae6196b0a2c052d2ecc907fcdabc2f5fe92ecec26b068ce7fee8cb5837160001b6113bc565b6108017f6de5636c0cfcbff7fd0254bf81386967f4de8a56ab71b2b3d906522bcb22cc5060001b6113bc565b61082d7f6b6262590240f8015c3acb3fdcd8414eb0e223e043828917f8e30a9acccd728c60001b6113bc565b61083783836114b7565b90505b9392505050565b61086d7ff3618eac6c7f786ca155d23ad40f9e124425699e1f846a32802adece706785fd60001b6113bc565b6108997fb0942e6f92bcb81ff92843942a215c58a397cb99d484142f18d11a23498cf2b460001b6113bc565b6108c57f8d58f5ec159f77b83ddc95f74618f9523ff2a0e434bfd4a37706c07b5c15d26c60001b6113bc565b6108cf33826114d5565b6108fb7f0c741e7671ed9177a3670b3e3b0ade60cd09bd888a8df2ac0a403ada444df6b060001b6113bc565b6109277fd48ea151769506bb4fd618341d91b7b63d025cac92e1bb01e6f906e9df3af46f60001b6113bc565b60003373ffffffffffffffffffffffffffffffffffffffff168260405161094d90612026565b60006040518083038185875af1925050503d806000811461098a576040519150601f19603f3d011682016040523d82523d6000602084013e61098f565b606091505b505090505050565b60006012905090565b6000610a426109ad6111e9565b8484600160006109bb6111e9565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610a3d919061203b565b6111f1565b6001905092915050565b610a787fc9a9d60340e2fd40112ae460dc3b23160f553b82e7d2dfffd11443d7e18c0dc860001b6113bc565b610aa47f49d91f98d845ada0fcbf8a06276a2b658720efd596c843d2842a03d033b34a3a60001b6113bc565b610ad07f2f3f6d1d14d60b8d3bbaabad0684ba3c279a5c1024b4fb83b9a02b7973755dad60001b6113bc565b610afc7fc5e7038122977a9e8c88c0c1495d16ec674fce05ba5b63e0c71353cd4f01dc0f60001b6113bc565b80341015610b3f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b3690612103565b60405180910390fd5b610b6b7f014852c57d814d8925c83ffdfdc0cb0c834de925a52f2f7dd9c1c65eac98fdd360001b6113bc565b610b977ff61cc2265158e284f10171b7e623512e54b148f86467f55787b5546855ed74c460001b6113bc565b610bc37f857ba4c79ed82c09216273d5a7d11a5c90ff892b91ed0e6a12f271ddf317d37e60001b6113bc565b610bcd82826116ac565b610bf97f964d6d15a68928c0a808d09c3c1b0d03907bf91e0c4edc3bf3db7fdf0b2afaa960001b6113bc565b610c257f7b8fce3ddb3f122bd8d1b11cab3ca7d29db5bda1ac314472ddfa746524a9bdd160001b6113bc565b80341115610d2a57610c597fa50fa9f249c9cd0fece087e6d22f4e04bde780a580e027ce969b99994a9bd98d60001b6113bc565b610c857fde38a6fe9147673061cad0435abbc1c7b515b5a1b9ca785c8457ab2c73d1ddbc60001b6113bc565b610cb17ff067c7a61f191c5c8f4198681885a71af02ca57404088d79db73bfe0ccd54d0a60001b6113bc565b3373ffffffffffffffffffffffffffffffffffffffff168134610cd49190611fc1565b604051610ce090612026565b60006040518083038185875af1925050503d8060008114610d1d576040519150601f19603f3d011682016040523d82523d6000602084013e610d22565b606091505b505050610d57565b610d567ff66a0506e2e2706bbd6604cb4cac39edb2d75377241279319653b97a6c1193f460001b6113bc565b5b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b610dab6111e9565b73ffffffffffffffffffffffffffffffffffffffff16610dc9610e2b565b73ffffffffffffffffffffffffffffffffffffffff1614610e1f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e169061216f565b60405180910390fd5b610e29600061180c565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060048054610e6490611ece565b80601f0160208091040260200160405190810160405280929190818152602001828054610e9090611ece565b8015610edd5780601f10610eb257610100808354040283529160200191610edd565b820191906000526020600020905b815481529060010190602001808311610ec057829003601f168201915b5050505050905090565b60008060016000610ef66111e9565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610fb3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610faa90612201565b60405180910390fd5b610fc7610fbe6111e9565b858584036111f1565b600191505092915050565b60006110007f0d8891654007d6d39d2958557330b44e3cf9301f976a95a553ee4eabacab25c560001b6113bc565b61102c7fd81e2224fa3966aad2c898c09a464cc39c0d2f75ab8aa2ee03c2cca6a121343c60001b6113bc565b6110587f46cec2ca6529721c09110d672ccf1cea54f289725b56366e933951e2c1d2b2cb60001b6113bc565b61106283836114b7565b905092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6110f96111e9565b73ffffffffffffffffffffffffffffffffffffffff16611117610e2b565b73ffffffffffffffffffffffffffffffffffffffff161461116d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111649061216f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156111dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d490612293565b60405180910390fd5b6111e68161180c565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611261576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161125890612325565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156112d1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112c8906123b7565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516113af9190611d36565b60405180910390a3505050565b50565b60006113cc8484846118d2565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006114176111e9565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015611497576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161148e90612449565b60405180910390fd5b6114ab856114a36111e9565b8584036111f1565b60019150509392505050565b60006114cb6114c46111e9565b84846118d2565b6001905092915050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611545576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161153c906124db565b60405180910390fd5b61155182600083611b53565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156115d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115ce9061256d565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816002600082825461162e9190611fc1565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516116939190611d36565b60405180910390a36116a783600084611b58565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561171c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611713906125d9565b60405180910390fd5b61172860008383611b53565b806002600082825461173a919061203b565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461178f919061203b565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516117f49190611d36565b60405180910390a361180860008383611b58565b5050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611942576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119399061266b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156119b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119a9906126fd565b60405180910390fd5b6119bd838383611b53565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611a43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a3a9061278f565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611ad6919061203b565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611b3a9190611d36565b60405180910390a3611b4d848484611b58565b50505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611b97578082015181840152602081019050611b7c565b83811115611ba6576000848401525b50505050565b6000601f19601f8301169050919050565b6000611bc882611b5d565b611bd28185611b68565b9350611be2818560208601611b79565b611beb81611bac565b840191505092915050565b60006020820190508181036000830152611c108184611bbd565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611c4882611c1d565b9050919050565b611c5881611c3d565b8114611c6357600080fd5b50565b600081359050611c7581611c4f565b92915050565b6000819050919050565b611c8e81611c7b565b8114611c9957600080fd5b50565b600081359050611cab81611c85565b92915050565b60008060408385031215611cc857611cc7611c18565b5b6000611cd685828601611c66565b9250506020611ce785828601611c9c565b9150509250929050565b60008115159050919050565b611d0681611cf1565b82525050565b6000602082019050611d216000830184611cfd565b92915050565b611d3081611c7b565b82525050565b6000602082019050611d4b6000830184611d27565b92915050565b600080600060608486031215611d6a57611d69611c18565b5b6000611d7886828701611c66565b9350506020611d8986828701611c66565b9250506040611d9a86828701611c9c565b9150509250925092565b600060208284031215611dba57611db9611c18565b5b6000611dc884828501611c9c565b91505092915050565b600060ff82169050919050565b611de781611dd1565b82525050565b6000602082019050611e026000830184611dde565b92915050565b600060208284031215611e1e57611e1d611c18565b5b6000611e2c84828501611c66565b91505092915050565b611e3e81611c3d565b82525050565b6000602082019050611e596000830184611e35565b92915050565b60008060408385031215611e7657611e75611c18565b5b6000611e8485828601611c66565b9250506020611e9585828601611c66565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611ee657607f821691505b60208210811415611efa57611ef9611e9f565b5b50919050565b7f5772704574683a20416d6f756e7420657863636565647320616c6c6f77616e6360008201527f652e000000000000000000000000000000000000000000000000000000000000602082015250565b6000611f5c602283611b68565b9150611f6782611f00565b604082019050919050565b60006020820190508181036000830152611f8b81611f4f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611fcc82611c7b565b9150611fd783611c7b565b925082821015611fea57611fe9611f92565b5b828203905092915050565b600081905092915050565b50565b6000612010600083611ff5565b915061201b82612000565b600082019050919050565b600061203182612003565b9150819050919050565b600061204682611c7b565b915061205183611c7b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561208657612085611f92565b5b828201905092915050565b7f5772704574683a204e6f7420656e6f7567682065746820666f72206465706f7360008201527f69742e0000000000000000000000000000000000000000000000000000000000602082015250565b60006120ed602383611b68565b91506120f882612091565b604082019050919050565b6000602082019050818103600083015261211c816120e0565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612159602083611b68565b915061216482612123565b602082019050919050565b600060208201905081810360008301526121888161214c565b9050919050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006121eb602583611b68565b91506121f68261218f565b604082019050919050565b6000602082019050818103600083015261221a816121de565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061227d602683611b68565b915061228882612221565b604082019050919050565b600060208201905081810360008301526122ac81612270565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061230f602483611b68565b915061231a826122b3565b604082019050919050565b6000602082019050818103600083015261233e81612302565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b60006123a1602283611b68565b91506123ac82612345565b604082019050919050565b600060208201905081810360008301526123d081612394565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b6000612433602883611b68565b915061243e826123d7565b604082019050919050565b6000602082019050818103600083015261246281612426565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006124c5602183611b68565b91506124d082612469565b604082019050919050565b600060208201905081810360008301526124f4816124b8565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000612557602283611b68565b9150612562826124fb565b604082019050919050565b600060208201905081810360008301526125868161254a565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b60006125c3601f83611b68565b91506125ce8261258d565b602082019050919050565b600060208201905081810360008301526125f2816125b6565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000612655602583611b68565b9150612660826125f9565b604082019050919050565b6000602082019050818103600083015261268481612648565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006126e7602383611b68565b91506126f28261268b565b604082019050919050565b60006020820190508181036000830152612716816126da565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000612779602683611b68565b91506127848261271d565b604082019050919050565b600060208201905081810360008301526127a88161276c565b905091905056fea264697066735822122006c42631e810f6643a3b6062ee6da1de4fe920482cdeb4b1617ce5ffeb1caa0064736f6c63430008090033";

type WrpEthConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WrpEthConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WrpEth__factory extends ContractFactory {
  constructor(...args: WrpEthConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<WrpEth> {
    return super.deploy(name, symbol, overrides || {}) as Promise<WrpEth>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, overrides || {});
  }
  attach(address: string): WrpEth {
    return super.attach(address) as WrpEth;
  }
  connect(signer: Signer): WrpEth__factory {
    return super.connect(signer) as WrpEth__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WrpEthInterface {
    return new utils.Interface(_abi) as WrpEthInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): WrpEth {
    return new Contract(address, _abi, signerOrProvider) as WrpEth;
  }
}

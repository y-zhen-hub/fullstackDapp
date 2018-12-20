/*jshint esversion:6*/
//部署infura网络
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compileFactory = require('./build/CampainFactory.json');
// const compileCampain = require('../ethereum/build/Campain.json');
// const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(  //这里传递两个参数，一个是metamask的助记词，另一个是infura账户
  //的ropsten的网址，除了添加助记词，可以替换为私钥
  'own yard dawn junior rapid cushion veteran above brown address soul tray',

  // 'https://ropsten.infura.io/v3/b5437d183197466d97d545f00f74216d'
//部署在rinkeby网络上
  'https://rinkeby.infura.io/v3/b5437d183197466d97d545f00f74216d'
);


const web3 = new Web3(provider);
const deploy = async ()=>{
    // console.log(interface);
    const accounts = await web3.eth.getAccounts();
  // console.log('Attemp to deploy contract', accounts[0]);
  // 将合约/接口转换成JSON形式的二进制代码，在ropsten网络中，需要添加0x给
//在lottery中不需要,arguments:['jonson']，因此将其删除
    const result = await new web3.eth.Contract(JSON.parse(compileFactory.interface)).deploy({data:'0x'+compileFactory.bytecode}).send({from:accounts[0],gas:'1000000'});
    console.log('contract deployed to', result.options.address); //部署的合约地址0x19CCecb6ad25B89D997d680D0C5Af30D4378Bd40
}
//0x5780e861574df8Ecc87F6bF6544CF32fd0D3CA04
//运行后的账户地址与上面的地址相同--metamask第一个账户
deploy();

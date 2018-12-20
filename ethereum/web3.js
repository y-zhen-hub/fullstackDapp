/*jshint esversion:6*/
import Web3 from 'web3';

var web3;
if(typeof window !='undefined'&& window.web3 !='undefined'){
    web3 = new Web3(window.web3.currentProvider);
}else{
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/b5437d183197466d97d545f00f74216d'
    );
    web3 = new Web3(provider);
}

export default web3;

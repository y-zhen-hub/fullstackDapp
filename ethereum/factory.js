/*jshint esversion:6*/
import web3 from './web3.js';

import  CampainFactory from './build/CampainFactory.json';

//构建工厂实例
const instance = new web3.eth.Contract(
    JSON.parse(CampainFactory.interface),
    '0x9D4A7F0Bf0823baf821206dd35DeA72eC19Bb58A'
);
export default instance;

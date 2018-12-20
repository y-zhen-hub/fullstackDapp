import web3 from './web3';

import Campain from './build/Campain.json';

//传入地址，进行构建实例
export default (address)=>{
    return new web3.eth.Contract(JSON.parse(Campain.interface),address);
}

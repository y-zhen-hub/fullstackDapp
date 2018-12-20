
/*jshint esversion:6*/
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
//新建文件夹
const buildpath = path.resolve(__dirname, 'build');
//如果已经有该文件夹了，则会删除
fs.removeSync(buildpath);
//拿到绝对的路径
const CampainPath = path.resolve(__dirname,'contracts','campain.sol');
//读取文档内容,返回文件内容
const source = fs.readFileSync(CampainPath,'utf8');
//输出文件内容
const output = solc.compile(source,1).contracts;

// console.log(output);

fs.ensureDirSync(buildpath);  // 如果没有该文件，则会创建
//将合约编译文件存储，避免以后再次编译
for(let contract in output){
    //构建路径--合约中的内容---replace是将冒号去掉
    fs.outputJsonSync(path.resolve(buildpath,contract.replace(':','')+'.json'),output[contract]);
}

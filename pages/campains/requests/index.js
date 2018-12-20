import React,{Component} from 'react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campain from '../../../ethereum/campain';
import { Button,  Form, Input, Message, Table} from 'semantic-ui-react';
import RequestRow from '../../../components/RequestRow';

class CampainRequest extends Component{
    static async getInitialProps(props){
        const {address} =  props.query; //该行代码等价于const address = this.props.address;
        const campain = Campain(address); //获取地址

        const requestCount = await campain.methods.getRequestCount().call(); //获得请求的数量
        const approvesCount = await campain.methods.approvesCount().call(); //获得总的投资人的数量
        const requests = await Promise.all(
            //遍历每个请求request,并且返回请求的内容
            Array(parseInt(requestCount)).fill().map((element,index)=>{
                return campain.methods.requests(index).call();
            })
        );
        // console.log(requests);
        return {address,requests,approvesCount};
    }

    //遍历每个请求
    renderRow(){
        return this.props.requests.map((request,index)=>{
            return(
                <RequestRow
                key = {index}
                id = {index}
                request = {request}
                address = {this.props.address}
                approvesCount={this.props.approvesCount}></RequestRow>
            );
        });
    }

    render(){
        // console.log(this.props.requests);
        const {headerCell, Row, Header} = Table;
        return (

            <Layout>
            <Link route={`/campains/${this.props.address}`}>

                    <Button primary >返回众筹详情</Button>
            </Link>
                <h1> 请求列表</h1>
                <Link route={`/campains/${this.props.address}/requests/new`}>

                        <Button primary >增加请求</Button>
                </Link>
                <Table celled textAlign='center'>
                       <Table.Header>
                             <Table.Row>
                               <Table.HeaderCell>ID</Table.HeaderCell>
                               <Table.HeaderCell>描述</Table.HeaderCell>
                               <Table.HeaderCell>请求金额(ether)</Table.HeaderCell>
                               <Table.HeaderCell>受益人地址</Table.HeaderCell>
                               <Table.HeaderCell>同意的数量</Table.HeaderCell>
                               <Table.HeaderCell>是否同意</Table.HeaderCell>
                               <Table.HeaderCell>是否完成</Table.HeaderCell>

                             </Table.Row>
                       </Table.Header>
                       <Table.Body>
                        {  this.renderRow() }
                       </Table.Body>
                  </Table>

            </Layout>
        );
    }
}


export default CampainRequest;

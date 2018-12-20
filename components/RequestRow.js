import React from 'react';
import {Table,Button,Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campain from '../ethereum/campain';
import findDomeNode from 'react-dom';
import {Router} from '../routes';

class RequestRow extends React.Component{
    //*********添加代码**************
    //
    state = {
        loading1:false,
        loading2:false,
        errorMessage:'',
        hidden:true
    };

    //
    //***********************
onApprove = async()=>{
    event.preventDefault();
    const campain =  Campain(this.props.address);
    const accounts = await web3.eth.getAccounts();
    //*********添加代码**************
    //
    this.setState({loading1:true});
    this.setState({errorMessage:''});
    this.setState({hidden:true});
    try{
        await campain.methods.approveRequest(this.props.id).send({
            from:accounts[0]
        });

        Router.pushRoute(`/campains/${this.props.address}/requests`);
    }catch(err){
        this.setState({hidden:false});
        this.setState({errorMessage:err.message});
    }
    //
    //***********************

    //*********添加代码**************
    //
    this.setState({loading1:false});
    //
    //***********************
}

onFinish = async()=>{
    event.preventDefault();
    const campain =  Campain(this.props.address);
    const accounts = await web3.eth.getAccounts();
    //*********添加代码**************
    //
    this.setState({loading2:true});
    this.setState({errorMessage:''});
    this.setState({hidden:true});
    try{
        await campain.methods.finalizeRequest(this.props.id).send({
        from:accounts[0]
        });
    Router.pushRoute(`/campains/${this.props.address}/requests`);
}catch(err){
    this.setState({hidden:false});
    this.setState({errorMessage:err.message});
}
    //
    //***********************

    //*********添加代码**************
    //
    this.setState({loading2:false});
    //
    //***********************
}

    render(){

        const {Row, Cell} = Table;
        const {id, request,approvesCount} = this.props;
        return(
            <Row disable={!!request.complete} >
                <Cell>{id+1}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.request.value,'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approvesCount}</Cell>
                <Cell>
                {
                    request.complete?(<p>已经超过半数同意</p>):(<Button color='green'  onClick={this.onApprove} loading={this.state.loading1} error={!!this.state.errorMessage}>同意</Button>)

                }
                </Cell>
                <Cell>
                {
                    request.complete?(<p>已完成</p>):(<Button color='teal'  onClick={this.onFinish} loading={this.state.loading2} error={!!this.state.errorMessage}>完成</Button>)
                }
                </Cell>
                <Cell ref ="cell" hidden={this.state.hidden}><Message error header='错误提示'   content={this.state.errorMessage}/></Cell>
            </Row>

        );
    }
}

export default RequestRow;

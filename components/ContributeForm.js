import React, {Component} from 'react';

import {Form,Input, Button, Message} from 'semantic-ui-react';
import Campain from '../ethereum/campain';
import web3 from '../ethereum/web3';
import {Router} from '../routes';


class ContributeFrom extends Component{

    state = {
        value:'',
        errorMessage:'',
        loading:false //初始不加载
    };

onSubmit = async()=>{
    event.preventDefault();  //阻止页面默认提交
    const campain = Campain(this.props.address);//获得show.js中传过来的表单
    const accounts = await web3.eth.getAccounts();
    this.setState({loading:true}); //新建后加载
    try{
        await campain.methods.contribute().send({
            from:accounts[0],
            value:web3.utils.toWei(this.state.value,'ether')
        });
        Router.replaceRoute(`/campains/${this.props.address}`)
    }catch(error){
        this.setState({errorMessage:error.message})
    }
    this.setState({loading:false});
}
    render(){
        return(
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>总的投资额度</label>
                    <Input
                        value={this.state.value}
                        onChange={event=>this.setState({value:event.target.value})}
                        label='ether'
                        labelPosition='right'
                    />
                </Form.Field>
                <Message error header='错误提示' content={this.state.errorMessage}/>
                <Button loading={this.state.loading} primary>投资</Button>
            </Form>

        );
    }
}
export default ContributeFrom;

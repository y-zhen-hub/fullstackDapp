import React,{Component} from 'react';

import {Form,Input, Button, Message} from 'semantic-ui-react';
import Campain from '../../../ethereum/campain';
import web3 from '../../../ethereum/web3';
import {Router, Link} from '../../../routes';
import Layout from '../../../components/Layout';
class CampainRequestNew extends Component{

    static async getInitialProps(props){
        const {address} = props.query;
        return {address};
    }

    state = {
        description:'',
        value:'',
        recipientAddress:'',
        errorMessage:'',
        loading:false //初始不加载
    };


    onSubmit = async()=>{
        event.preventDefault();

        const campain = Campain(this.props.address);//获得show.js中传过来的表单
        const accounts = await web3.eth.getAccounts();
        const {description,value,recipientAddress} = this.state;

        this.setState({loading:true}); //新建后加载

        try{
            await campain.methods.createRequest(description,web3.utils.toWei(value,'ether'),recipientAddress).send({
                from:accounts[0]
            });
            Router.pushRoute(`/campains/${this.props.address}/requests`);
        }catch(error){
            this.setState({errorMessage:error.message})
        }
        this.setState({loading:false});
    }

    render(){
        return (
            <Layout>

                    <Link route={`/campains/${this.props.address}`}>
                        <a>
                            <Button primary>
                            <p color='white'>返回众筹详情</p>
                            </Button>
                        </a>
                    </Link>
                    <Link route={`/campains/${this.props.address}/requests`}>
                        <a>
                            <Button primary>
                            <p color='white'>返回</p>
                            </Button>
                        </a>
                    </Link>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>请求描述</label>
                        <Input
                            placeholder='请输入您对请求的描述'
                            value={this.state.description}
                            onChange={event=>this.setState({description:event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>请求金额</label>
                        <Input
                            placeholder='请输入您需要的金额，单位为wei'
                            value={this.state.value}
                            onChange={event=>this.setState({value:event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>受益人地址</label>
                        <Input
                            placeholder='请输入资金接收者的地址'
                            value={this.state.recipientAddress}
                            onChange={event=>this.setState({recipientAddress:event.target.value})}
                        />
                    </Form.Field>
                    <Message error header='错误提示' content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>增加请求</Button>
                </Form>
            </Layout>
        );
    }
}


export default CampainRequestNew;

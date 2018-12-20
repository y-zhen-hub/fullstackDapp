import React,{Component} from 'react';
import Layout from '../../components/Layout';
import { Button,  Form, Input, Message} from 'semantic-ui-react'
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import {Router} from '../../routes';

class CampainNew extends Component{

    //创建状态变量，最小贡献值
    state = {
        minimum:'',
        errorMessage:'',
        loading:''
    };

    onSubmit=async()=>{

        //每次创建合约后，错误置为空
        this.setState({errorMessage:''});
        this.setState({loading:true});
        try{
            //阻止浏览器默认提交表单
            event.preventDefault();

            //进行交互
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampain(this.state.minimum).send({from:accounts[0]});

            //返回到首页
            Router.pushRoute('/');
        }catch(err){
            this.setState({errorMessage:err.message});
        }
            this.setState({loading:false});
    }

    render(){
        // console.log(this.state.minimum);
        return (
            <Layout>
                <h3>创建你的众筹项目</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>请输入最小的贡献量</label>
                        <Input
                            placeholder='请输入您将贡献的数量，单位是wei'
                            label='wei'
                            labelPosition='right'
                            value={this.state.minimum}
                            onChange={event=>this.setState({minimum:event.target.value})}
                        />
                    </Form.Field>
                    <Message error header='错误！' content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary >创建众筹</Button>
                </Form>
            </Layout>
        );


    };
}

export default CampainNew;

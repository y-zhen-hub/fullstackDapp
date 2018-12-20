import React from 'react';

//导出的是一个带参数的函数,从ethereum--campain.js中创建合约
import Campain from '../../ethereum/campain';
import Layout from '../../components/Layout';  //获得导航栏
import { Card } from 'semantic-ui-react';
import ContributeFrom from '../../components/ContributeForm'; //显示右侧进行投资的半个页面
import { Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Link} from '../../routes';


class Campainshow extends React.Component{
    //生命周期函数
    //该函数必须有返回值，此时定义为空
    static async getInitialProps(props){
        // console.log(props.query.address);
        // 接收props.query.address地址
        const campain = Campain(props.query.address);
        //获得众筹项目的属性
        const summary = await campain.methods.getSummary().call();
        // console.log(summary);
        // 返回到class函数中
        return {
            address:props.query.address,
            minimumContribution:summary[0],
            balance:summary[1],
            requestcount:summary[2],
            approvalCount:summary[3],
            manager:summary[4]
        };
    }

    renderCard(){
        const {
            address,
            minimumContribution,
            balance,
            requestcount,
            approvalCount,
            manager
        }=this.props;
        const items = [
            {
                header:manager,
                meta:'管理者地址',
                description:'当前管理者创建了众筹列表，并且是众筹的受益人',
                style:{overflowWrap:'break-word'}
            },
            {
                header:minimumContribution,
                meta:'最小贡献量(wei)',
                description:'如果你想对此众筹投资，你就需要至少投资当前的金额',
                style:{overflowWrap:'break-word'}
            },
            {
                header:requestcount,
                meta:'请求的数量',
                description:'当前管理者创建请求，从合约中提钱，必须要大于50%的投资人数量',
                style:{overflowWrap:'break-word'}
            },
            {
                header:approvalCount,
                meta:'投资人的数量',
                description:'已经为当前众筹的投资人的数量',
                style:{overflowWrap:'break-word'}
            },
            {
                header:web3.utils.fromWei(balance,'ether'),
                meta:'众筹总的金额(ether)',
                description:'当前众筹中还剩下的金额',
                style:{overflowWrap:'break-word'}
            }
        ];
        return <Card.Group items={items}/>
    }

    render(){
        const summary = this.props.summary;
        //对象赋值

        // const address = this.props.address; 该方法与上面的address赋值方法一样

        // console.log(address);
        // console.log(minimumContribution);
        // console.log(manager);
        return (
            <Layout>
                <h1>众筹显示</h1>
                 <Grid >
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCard()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeFrom  address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column >
                            <Link route={`/campains/${this.props.address}/requests`}>
                                <a>
                                    <Button primary>查看请求</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>


                 </Grid>

            </Layout>
        )
    }
}

export default Campainshow;

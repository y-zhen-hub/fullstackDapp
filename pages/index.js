/*jshint esversion:6*/
import React, {Component} from 'react';
import factory from '../ethereum/factory';
import Campain from '../ethereum/campain'
import { Card } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import Layout from '../components/Layout';
import {Link} from '../routes';

// export default ()=>{
//     return <h1> index jonson! </h1>
// }

class Compaindex extends Component{

    state={
        count:1
    }
    //声明周期函数
    static async getInitialProps(){
        const campain = await factory.methods.getDeployeddCampain().call();
        // const newCampain = Campain(campain[0]);
        // const minimum = await newCampain.method.minimumContribution().call();
        return {campain};

    }

    renderCampin(){
        // console.log(newCampain)
        //*****************下面代码是删除的****************
        // const items = this.props.campain.map(address=>{
        //     return {
        //         header: address,
        //         description:<Link route={`/campains/${address}`}><a>查看众筹</a></Link>,
        //         fluid:true  //动态扩充大小
        //     }
        // });

        //******************添加的代码******************
        const items = this.props.campain.map(address=>{
            return {
                header: <p>当前众筹编号为：{this.state.count++}</p>,
                description:<Link route={`/campains/${address}`}><a>查看众筹</a></Link>,
                fluid:true  //动态扩充大小
            }
         });
        return <Card.Group items={items} />;
    }
    render(){//primary--蓝色，content--内容，icon-add cilcel---加号和圆圈，

            return(
                <Layout>
                    <div>
                        <h3>众筹列表</h3>
                        <Link route='/campains/new'>
                            <a>
                                <Button floated ='right' content='创建众筹' icon='add' labelPosition='right' primary />
                            </a>
                        </Link>
                        {this.renderCampin()}
                    </div>
                </Layout>
            );
        // return <div> {this.props.campain[0]} </div>
        // return <h1> index jonson! </h1>
    }
}
//linu浏览器特性
export default Compaindex;

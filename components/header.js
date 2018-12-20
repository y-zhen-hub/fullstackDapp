import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from '../routes';

export default()=>{
    return(
        <Menu style={{margainTop:'10px',}}>
            <Menu.Item>
                <Link route='/'>
                    <a >
                        首页
                    </a>
                </Link>
            </Menu.Item>
            <Menu.Menu position ='right'>
                <Menu.Item>
                    <Link route='/campains/new'>
                        <a>
                            创建众筹+
                        </a>
                    </Link>
                </Menu.Item>
                
            </Menu.Menu>
        </Menu>
    );
}

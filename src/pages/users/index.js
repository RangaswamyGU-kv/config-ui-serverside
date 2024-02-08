// Packages
import React,{ Component } from "react";
import { Link, Route } from "react-router-dom";

// Styles
import 'antd/dist/antd.css';

// Antd
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// HOC
import withAuth from '../../lib/auth/withAuth';

// Views
import CreateUser from './createUser';
import ViewUser from './view'

const { SubMenu } = Menu;
const { Sider } = Layout;

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            config: '',
            selected: '',
            selectedConfig: '',
            response: '',
            toggle: false
        }
    }

    onFinish = (values) => {
        // console.log('Success:', values);
    };

    onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <Layout style={{ margin: "73px 0px" }}>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ minHeight: '100vh', borderRight: 0}}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Manage Users">
                                <Menu.Item key="1">
                                    <Link href="#" to={`/users/create`}>
                                        Create User
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link href="#" to={`/users/view`}>
                                        View
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Route exact path="/users/create" component={CreateUser} />
                    <Route exact path="/users/view" component={ViewUser} />
                </Layout>
            </Layout>
        )
    }
}

export default withAuth(Users)

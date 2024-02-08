
import React,{ Component } from "react";
import withAuth from "../../lib/auth/withAuth";
// Styles
import 'antd/dist/antd.css';

// Antd
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from '../../styles/upload.module.css';
import uploadindex from './uploadbyd';
import displayByddetails from "./view/viewinfo";
 
import { Link, Route } from "react-router-dom";
import { requestFeedMastePost, requestbydservices } from "../../lib/request";
import editBydfInfo from "./editinfo/editSkuDetails";

const { Content } = Layout;
const { SubMenu } = Menu;
const { Sider } = Layout;



class UploadData extends Component {
    state = { 
    }
 
    render() { 
        return (
            <Layout style={{ margin: "73px 0px" }}>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ minHeight: '100vh', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Upload Data">
                                <Menu.Item key="1">
                                    <Link href="#" to={`/Newupload/uploadindex`}>
                                        Upload Data
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link href="#" to={`/Newupload/view`}>
                                        View
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    

                        <div className={styles.display_name_wrapper_forUpload}>
                            <Content  >
                                <div className={styles.main_wrapper_forUpload}>
                                    <Route exact path="/Newupload/uploadindex" component={uploadindex} />
                                    <Route exact path="/Newupload/view" component={displayByddetails} />
                                    <Route exact path="/Newupload/edit" component={editBydfInfo} />

                                </div>
                            </Content>

                        </div>

                     
                </Layout>
            </Layout>






        );
    }
}

export default withAuth(UploadData);
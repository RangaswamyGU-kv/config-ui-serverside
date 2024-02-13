// Packages
import React, { Fragment, useState } from "react";
import { Link, useLocation,useHistory } from "react-router-dom";

// Antd
import { Dropdown, Layout, Menu } from 'antd';

// Assets
import  logo from '../../assets/LIVERPOOL_logo.png';

// Services
import {
  getUserRole,
  getUserName,store,getDomainName
} from '../../lib/auth'

// View
// import LeftHandData from "../../module/config/DisplayName";
// import container from '../../Container';

// Style
import styles from '../../styles/navbar.module.css';
import { isEmpty } from "lodash";
import { DownOutlined } from "@ant-design/icons";
const { Header } = Layout;

export default function NavBar(props) {
  // const displayNavigation = () => {
  //   const { config, setSelected } = props
  //   return (config && config.body && config.body.map((item, key) => (
  //     <Menu.Item key={key}>
  //       <Link to={`/config/${item.urlPath}`} onClick={() => setSelected(item.urlPath)}>
  //         {item.displayName}
  //       </Link>
  //     </Menu.Item>
  //   )))
  // } 
  const [domainstate,updatedomainstate] = useState('search')
  const location = useLocation();  
  const history = useHistory();
  const handleClick =(e,domain)=> {
    e.preventDefault()
    store("domain",domain);
    updatedomainstate(domain)   
    let redPath = `/${domain}/config/configMap`  || '/search/config/configMap'   
    history.push(redPath)
    const { config, setSelected } = props
    setSelected("configMap");
  }

  let domainName =  (typeof window !== 'undefined') ? getDomainName() : 'search';
 

  const menu = (
    <Menu>
      <Menu.Item >
        <Link
          to={`/search/config/configMap`}
          onClick ={(e)=>handleClick(e,"search")} 
        >
          Feed Master
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to={`/byd/config/configMap`}
          onClick ={(e)=>handleClick(e,"byd")} 
        >
          BYD
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to={`/compras/config/configMap`}
          onClick ={(e)=>handleClick(e,"compras")} 
        >
          Compra service
        </Link>
      </Menu.Item>
  
      {(typeof window !== 'undefined') && getUserRole() === 'admin' && (
        <Menu.Item key="user"
  
        >
          <Link
            to={`/users/create`}
  
          >
            Manage User
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logo_img} src={logo} alt="logo" />
      </div>
      {props.isLogout &&
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['configurations']} className={styles.menu}>
          {props.isAuthorized && (
            <>
              {/* {getUserRole() === 'admin' && (
                <Menu.Item key="user"
                  className={styles.menu_item}
                >
                  <Link
                    to={`/users/create`}
                    className={styles.link}
                  >
                    Manage User
                  </Link>
                </Menu.Item>
              )} */}
              <Menu.Item key="configurations"
                className={styles.menu_item}
              >
                <Link
                  to={`/${domainName}/config/configMap`}
                  className={styles.link}
                >
                  Configurations
                </Link>

              </Menu.Item>
              { domainName && domainName=="search" && <Menu.Item key="upload"
                className={styles.menu_item}
              >
                <Link
                  to={`/${domainName}/upload`}
                  className={styles.link}
                >
                  Searchanise
                </Link>

              </Menu.Item>}
              {domainName && domainName=="byd"  && 
              <Menu.Item key="Newupload"
                className={styles.menu_item}
              >
                <Link
                  to={`/Newupload/uploadindex`}
                  className={styles.link}
                >
                  BYD
                </Link>
              </Menu.Item>}
              {domainName && domainName=="compras" && <Menu.Item key="uploadPrice"
                className={styles.menu_item}
              >
                <Link
                  to={`/${domainName}/service`}
                  className={styles.link}
                >
                  Comp Services
                </Link>

              </Menu.Item>}
              <Fragment style={{ marginLeft: "auto" }}>
                <Menu.Item key="Domain"
                  
                  style={{ marginLeft: "auto" }}
                >
                   <Dropdown overlay={menu} overlayClassName={'OverlayClass'} overlayStyle={{ top: "60px" }}>
                    <span>Domain  <DownOutlined /> </span>
                    {/* <DownOutlined /> */}
                  </Dropdown>
                </Menu.Item>
                <Menu.Item key="logout"
                  className={styles.menu_item}
                >
                 
                  <Link
                    to={`/logout`}
                    className={styles.link}
                  >
                    Logout
                  </Link>
                </Menu.Item>
                {getUserName() &&
                  <Menu.Item key="userName"
                    className={styles.menu_item}
                    style={{ fontSize: '16px', color: 'white' }}
                  >
                    Hi {" " + getUserName()}
                  </Menu.Item>
                }
              </Fragment>
            </>
          )}
        </Menu>
      }
    </Header>
  )
}

import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React,{ Component } from "react";
import PriceDetails from "../../components/PriceDetails/priceDetails";
import withAuth from "../../lib/auth/withAuth";
import styles from '../../styles/upload.module.css';
 

class UploadPriceDetails extends Component {
    state = {  } 
    render() { 
        return (

            <div>
                 <div className={styles.config_wrapper}>
                <Layout className={styles.display_name_wrapper}>
                    <Content>
                        <div className={styles.main_wrapper}>
                            <PriceDetails />
                        </div>
                    </Content>
                </Layout>
            </div>
            </div>
        );
    }
}
 
export default withAuth(UploadPriceDetails);
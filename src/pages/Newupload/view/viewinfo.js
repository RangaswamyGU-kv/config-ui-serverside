
import React,{ Component } from "react";
// import styles from '../upload-doc.css'
import EditTable from "./table";
import { requestbydservices } from '../../../lib/request'
import { Button, Layout,Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
// import styles from '../upload-doc.css'
import styles from '../../../styles/upload.module.css';
import EditSkuDetails from "../editinfo/editSkuDetails";
import EditBrowseMapping from "../editinfo/editBrowsemapping"; 

const { Title } = Typography;

class DisplayByddetails extends Component {
    state = {
        totalRecords: {},
        skuDetailsforEdit: {},
        skuBrowseMappingforEdit:{},
        editSkudetails: false,
        editBrowseMapping: false
    }


    redirectToView = () => {
        this.setState({
            editSkudetails: !this.state.editSkudetails
        })
    }

    redirectToViewBroswseMapping = () =>{
        this.setState({
            editBrowseMapping: !this.state.editBrowseMapping
        })
    }


    render() {
        const { totalRecords, editSkudetails, skuDetailsforEdit,editBrowseMapping,skuBrowseMappingforEdit } = this.state;
        const colwidth = 100;
        const ColumnforSkuDetails = [{

            title: 'Identifier',
            dataIndex: 'identifier',
            width: 150,
            render: (text, record, index) => <div> {record.identifier}  <span className={styles.editButton}
                onClick={
                    (e) => {
                        this.setState({
                            skuDetailsforEdit: record,
                            editSkudetails: true,
                        })
                    }
                }>
                Edit  </span> </div>

        },
        {

            title: 'Sku Type',
            dataIndex: 'skuType',
            width: colwidth,

        },
        {

            title: 'Sku Name',
            dataIndex: 'skuName',
            width: colwidth,

        }, {

            title: 'Sku Section',
            dataIndex: 'skuSection',
            width: colwidth,

        }, {

            title: 'BasePrice',
            dataIndex: 'basePrice',
            width: colwidth,

        }, {

            title: 'Price In Words',
            dataIndex: 'priceInWords',
            width: colwidth,

        }, {

            title: 'Indicator Active',
            dataIndex: 'indicatorActive',
            width: colwidth,
            render: (text,record,index) => record.indicatorActive == true ? "true" : "false"

        }, {

            title: 'Last Modified Time',
            dataIndex: 'lastModifiedTime',
            width: 150,
            render: (text,record,index) => <div>
                {record.lastModifiedTime}
            </div>

        }]

        const ColumnforBrowseSkumapping = [
            {

                title: 'Identifier',
                dataIndex: 'identifier',
                width: colwidth,
                render: (text, record, index) => <div> {record.identifier}  <span className={styles.editButton}
                onClick={
                    (e) => {
                        this.setState({
                            skuBrowseMappingforEdit: record,
                            editBrowseMapping: true,
                        })
                    }
                }>
                Edit  </span> </div>

            },
            {

                title: 'Transaction Sku Id',
                dataIndex: 'transactionSkuId',
                width: colwidth,

            }, {

                title: 'Enabled',
                dataIndex: 'enabled',
                width: colwidth,
                render: (text,record,index) => record.enabled == true ? "true" : "false"

            },
            {

                title: 'Last Modified Time',
                dataIndex: 'lastModifiedTime',
                width: colwidth,

            }]


        return (
            <>
            <div className={styles.marginBottom}>
            <Title level={2}>Transactional Sku Details</Title>
            {editSkudetails ? <EditSkuDetails
                    formdata={skuDetailsforEdit}
                    redirectToView={() => this.redirectToView()}

                /> : <EditTable url={"retrieveAllTransactionalSkuDetails"}
                    ColumnsforTable={ColumnforSkuDetails}
                    headerfortable={"Transactional Sku details"} />

                }
            </div>
                <>
                <Title level={2}>Browse Transactional Sku Mapping</Title>
                {editBrowseMapping?  <EditBrowseMapping 
                    formdata={skuBrowseMappingforEdit}
                    redirectToView={() => this.redirectToViewBroswseMapping()}
                
                /> :<EditTable url={"retrieveAllBrowseTransactionalSkuMappingData"}
                    ColumnsforTable={ColumnforBrowseSkumapping}
                    headerfortable={"Browse Transactional Sku Mapping"} />} 
                </>

                
            </>




        );
    }
}

export default DisplayByddetails;
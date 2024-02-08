import { Button, Form, Input, message, Radio } from "antd";
import { isEmpty, isEqual } from "lodash";
import { Component } from "react";
import { Route, Router } from "react-router-dom";
import { requestbydservices } from "../../../lib/request";
import styles from '../../../styles/upload.module.css';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
class EditBrowseMapping extends Component {
    state = {

        formData: {},
        disableSubmit:true

    }


    editBydataHandler = async (value) => {
        const { formdata } = this.props;
        if(!isEmpty(formdata)){
            delete formdata.lastModifiedTime;
            delete formdata.lastModifiedTimeInLong;
        }     
            
        if(isEqual(value,formdata)){
            message.info("None of the fields are updated")
        
        } else{
            const url = `editBrowseTransactionalSkuMappingData/${value.identifier}`

            try {
                const response = await requestbydservices(url, value, 'post');
                if (response) {
                    message.success("Succefully updated!")
                    this.props.redirectToView()
                }
            }
            catch (e) {
                message.error("Error in updating")
                console.error("Error in updating", e)
            }
        }
       
    }

    valuechange = (val) =>{ 
        if(val){
            this.setState({
                disableSubmit : false
            })
        }
    }
    render() {
        const { formdata } = this.props;
        const { disableSubmit } = this.state
         return (
            <div className={styles.formOutline}>

                <p className={styles.editButton} onClick={()=>{this.props.redirectToView()}}>Back to View</p>

                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    {...layout}
                    style={{ maxWidth: 600 }}
                    initialValues={formdata}
                    onFinish={this.editBydataHandler}
                    onValuesChange={this.valuechange}
                // onFinish={onFinishSubmit}
                >

                    <Form.Item label="Browsing Sku " name="identifier" >
                        <Input placeholder="Ex : 2323"   />
                    </Form.Item>

                    <Form.Item label="Transaction Sku" name="transactionSkuId">
                        <Input placeholder="input placeholder" />
                    </Form.Item>

                     

                    <Form.Item label="Enabled" name="enabled">
                        <Radio.Group>
                            <Radio value={true}> True </Radio>
                            <Radio value={false}> False </Radio>
                        </Radio.Group>
                    </Form.Item>


                    <Form.Item wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}>
                        <Button type="primary" htmlType="submit" disabled={disableSubmit}>
                            Submit
                        </Button>
                    </Form.Item>


                </Form>
            </div>
        );
    }
}

export default EditBrowseMapping;
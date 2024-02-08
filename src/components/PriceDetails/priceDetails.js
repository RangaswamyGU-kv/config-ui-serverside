import { Button, Form, message, Radio, Spin } from "antd";
import { Component } from "react";
import withAuth from "../../lib/auth/withAuth";
import { configRequestforComp } from "../../lib/request";
import styles from '../../styles/upload.module.css';

class PriceDetail extends Component {
    state = {

        filedata: null,
        serviceType: '',
        isselected: false,
        isuploaded: false,
        isload: false
    }

    handleFileUpload = (e) => {
        console.log("e", e, e.target.files[0].type)
        e.preventDefault()
        if (e.target.files[0]) {
            this.setState({
                filedata: e.target.files[0],
                isuploaded: true
            })
        }


    }

    submitPriceFile = async () => {
        const { filedata, serviceType } = this.state; 
        let formData = new FormData();
        formData.append('priceFile', filedata)
        formData.append('serviceType', serviceType)
        try {
            this.setState({isload:true})
            const response = await configRequestforComp('upload/priceDataUpload', formData)
            console.log(response) 
            if (response) {
                if (!!response.data.errorMessage) {
                    message.error(response.data.errorMessage);
                }
                else {
                    if (!!response.data) {
                        message.success(response.data);
                    }
                    else {
                        console.log("error", response)
                    }
                }

                this.setState({ isload: false })
            }
            else {
                console.error("error")
                this.setState({ isload: false })
            }
            
        }
        catch (e) {
            message.error(e.message)
            this.setState({isload:false})
        }

    }
    radioChange = (e) => {
        this.setState({
            serviceType: e.target.value,
            isselected: true
        })
    }



    render() {
        const { isselected, isuploaded,isload } = this.state;


        return (

            <div>
                <div className={styles.main_class}>
                    <h3>{"Servicios Complementarios"}</h3>
                    <hr />
                    <h3>{'Archivo de precios Importación'}</h3>
                    <p>{'Solo se permiten archivos xlsx '}</p>
                    <Spin spinning={isload} >
                    <div>
                        < >
                            <label htmlFor="file"> Tipo de servicio*  :</label>
                            <Radio.Group className="" name="servicetype" onChange={(e) => this.radioChange(e)}>
                                <Radio value='EXTENDEDWARRANTY'>Garantía</Radio>
                                <Radio value='CELLULARPROTECTION'>Protección Celular</Radio>

                            </Radio.Group>
                            
                                <div>
                                    <label htmlFor="file">Recoger el archive xlsx para cargar*  :</label>
                                    <input
                                        type="file"
                                        name="file"
                                        required
                                        onChange={(e) => { this.handleFileUpload(e) }}
                                    />

                                    {

                                        <Button type="primary" disabled={!isselected || !isuploaded} onClick={() => { this.submitPriceFile() }}>
                                            Cargar ahora </Button>
                                    }

                                </div> 

                        </ >
                    </div>
                    </Spin>


                </div>
            </div>


        );
    }
}

export default withAuth(PriceDetail);
import React,{ Component } from "react";
import Papa from "papaparse";
import { Button,message,Spin } from "antd";
import { isEmpty, isNumber, lowerCase, toUpper } from "lodash";
import SeacrhSkuComponent from "../searchSku/searchsku";
import styles from '../../../styles/upload.module.css';
import withAuth from '../../../lib/auth/withAuth';
import { requestbydservices } from "../../../lib/request"; 
class UploadBydComponent extends Component {
    state = {
        fileData: null,
        allRecord: null,
        recordCount: 0,
        fileName: null,
        isRecordEmpty: false,
        isCSVformat: true,
        totalRecordsCount: {},
        isload :false
    }



    handleFileUpload = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0].type.includes('csv')) {
                this.setState({
                    fileData: e.target.files[0],
                    isRecordEmpty: false,
                    fileName: e.target.files[0].name,
                    isCSVformat: true
                })
            }
            else {
                this.setState({
                    isCSVformat: false,
                    isRecordEmpty: false,
                })
            }

        }

    }
    setloaderState= (value) =>{
        this.setState({
            isload:value
        })
    }


    initiateFileUpload = async (totalRecords, type, batchsize) => {
        message.info("Data Upload Started..")
        this.setloaderState(true)
        const { fileName } = this.state;
        const url = 'file/uploadStarts';
        const uploadtype = toUpper(type)
        let batchcount = Math.ceil(totalRecords / batchsize);
        let payload = {
            "fileName": fileName,
            "uploadFor": uploadtype,
            "uploadingRecordsCount": totalRecords,
            "batchCount": batchcount
        }
        try {             
            const response = await requestbydservices(url,payload,'post')
            if (response && response.data) {
                return response.data
            }
            else{
                this.setloaderState(false)
                return false                
            }
            
        }
        catch (e) {
            message.error("cannot start Data Upload", e)
            this.setloaderState(false)
            return false
        }


    }
    finishedFileUpload = async (totalRecords, type, failedcount, batchcount, jobid) => {
        const { fileName } = this.state;
        const url ="file/uploadFinished";
        const uploadtype = toUpper(type)
        let payload = {
            "id": jobid,
            "fileName": fileName,
            "uploadFor": uploadtype,
            "uploadingRecordsCount": totalRecords,
            "failedRecordsCountAtClient": failedcount,
            "batchCount": batchcount
        }
        try {
            const response = await requestbydservices(url,payload,'post')
            if (response && response.data) {
                this.setloaderState(false)
                return response.data              
                
            }
            return false
        }
        catch (e) {
            message.error("Eroor in fileUploadFinished service", e)
            this.setloaderState(false)
            return false            
        }


    }

    HandlerForTransSkuDetails = async() => {
        const { uploadtype } = this.props;
        if (this.state.fileData == null) {
            this.setState({
                isRecordEmpty: true
            })
        }
        else {
            let records = [];
            let ImproperRecords = [];
            const file = this.state.fileData;
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, {
                    step: function (row) {
                        if (row.data && !isEmpty(row.data)) {
                            if (  !isEmpty(row.data[0])  && !(row.data[0].includes('sku'))) {
                                let data = {}
                                data['identifier'] = row.data[0]
                                data['skuType'] = row.data[1]
                                if(Number(row.data[6])){
                                    data['indicatorActive'] = Number(row.data[6]) === 1 ? true : false;
                                   
                                }
                                else{
                                    data['indicatorActive'] = lowerCase(row.data[6]) === "true" ? true : false;
                                }
                                data['skuName'] = row.data[2]
                                
                                data['basePrice'] = Number(row.data[3])
                                data['skuSection'] = row.data[5]
                                data['priceInWords'] = row.data[4]
                                records.push(data)
                            }
                            else{
                                ImproperRecords.push(row.data)
                            }

                        } else {
                            ImproperRecords.push(row.data)
                        } 
                    },
                    complete: function () {
                        if(!isEmpty(ImproperRecords)){
                            console.log("Unable to Upload these data",ImproperRecords)
                        }
                    }
                });
                let count = 0;
                let succescount = 0;
                let failedcount = 0
                let batchsize = 1000;
                let totalsize = Object.keys(records).length; 
                const data = await this.initiateFileUpload(totalsize, uploadtype, batchsize) 
                let response = null;
                let jobId = data && data.id 
                if (data && data.s === 0 ) {
                    let startIndex = 0;
                    let endIndex = batchsize; 
                    const url =`${uploadtype}/${jobId}`;
                    do {
                        try {
                            response = await requestbydservices(url, records.slice(startIndex, endIndex),'post').then((res) => {
                                succescount = succescount + 1
                            }).catch((e)=>{
                                console.error("problem with count after " + count, e);
                                failedcount = failedcount + (records.slice(startIndex, endIndex)).length;
                            })
                          
                            if (response && response.status !== 200){
                                failedcount = failedcount + (records.slice(startIndex, endIndex)).length;
                            }
                        } catch (e) {
                            console.error("problem with count after " + count, e);
                            failedcount = failedcount + (records.slice(startIndex, endIndex)).length;

                        }
                        startIndex = startIndex + batchsize;
                        endIndex = endIndex + batchsize;
                        count = count + 1; 
                    } while (startIndex < totalsize);
                }
                //calling finishedfileuploadservice
                if (data && data.s === 0 ) {
                    try {
                        const finished = await this.finishedFileUpload(totalsize, uploadtype, failedcount, succescount, jobId)
                        if (finished && finished.s == 0){
                            if(failedcount === 0){
                                message.success("Succesfully Completed Data Upload")
                            }else{
                                message.warning("Data uploaded but"+ failedcount +"failed ")
                            }                           
                        }
                    }
                    catch (e) {
                        console.error("error", e)
                    }
                }
            };
            reader.readAsText(file);
        }


    }

    HandlerforTransSkuMapping = async() => {
        const { uploadtype } = this.props;
        if (this.state.fileData == null) {
            this.setState({
                isRecordEmpty: true
            })
        }
        else {
            let records = []
            let ImproperRecords= []
            const file = this.state.fileData;
            const reader = new FileReader();
            reader.onload = async ({ target }) => {
                const csv = Papa.parse(target.result, {
                    step: function (row) {
                        if (row.data && !isEmpty(row.data) ) {
                            if (!(row.data[0].includes("sku")) &&  !isEmpty(row.data[0]) ) { //need to check for 
                                let data = {}
                                data['identifier'] = row.data[0] 
                                data['transactionSkuId'] = row.data[1] 
                                if(Number(row.data[2])){
                                    data['enabled'] = Number(row.data[2]) === 1 ? true : false;
                                   
                                }
                                else{
                                    data['enabled'] = lowerCase(row.data[2]) === "true" ? true : false;
                                }
                                records.push(data)
                            }
                            else{
                                ImproperRecords.push(row.data)
                            }

                        } else {
                            ImproperRecords.push(row.data)
                        } 
                    },
                    complete: function () {
                        if(!isEmpty(ImproperRecords)){
                            console.log("unable to upload these records for material group",ImproperRecords)
                        }
                       
                    }
                }); 
                 
                let count = 0;
                let succescount = 0;
                let failedcount = 0
                let batchsize = 1000;
                let totalsize = Object.keys(records).length; 
                const data = await this.initiateFileUpload(totalsize, uploadtype, batchsize) 
                let response = null;
                let jobId = data && data.id ;
                if (data && data.s == 0) { 
                    let startIndex = 0;
                    let endIndex = batchsize;
                  
                    const url = `${uploadtype}/${jobId}`
                    do {
                        try {
                            response = await requestbydservices(url, records.slice(startIndex, endIndex),'post').then((res) => {
                                succescount = succescount + 1
                            }).catch((e)=>{
                                console.error("problem with count after " + count, e);
                                failedcount = failedcount + (records.slice(startIndex, endIndex)).length;
                            })
                        } catch (e) {
                            console.error("problem with count after " + count, e);
                            failedcount = failedcount + (records.slice(startIndex, endIndex)).length;

                        }
                        startIndex = startIndex + batchsize;
                        endIndex = endIndex + batchsize;
                        count = count + 1;
                    } while (startIndex < totalsize);
                }
                //calling finishedfileuploadservice
                if (data && data.s == 0) {
                    try {
                        const finished = await this.finishedFileUpload(totalsize, uploadtype, failedcount, succescount, jobId)
                        if (finished && finished.s == 0){
                            if(failedcount === 0){
                                message.success("Succesfully Completed Data Upload")
                            }else{
                                message.warning("Data uploaded but"+ failedcount +"failed ")
                            }
                           
                        }                            
                    }
                    catch (e) {
                        console.error("error", e)
                       
                    }
                }
            };
            reader.readAsText(file);
        }


    }



    render() {
        const { isRecordEmpty, isCSVformat ,isload} = this.state
        const { uploadtype } = this.props
        return (

            
            <div className={styles.main_class}>
                <h3>{this.props.headerLable}</h3>
                <hr />
                <h3>{this.props.mainlable}</h3>
                <p>{this.props.messagelable}</p>



                <div>
                <Spin spinning={isload}>
                    <div>
                        <label htmlFor="file">Recoger el archive CSV para cargar:</label>
                        <input
                            type="file"
                            name="file"
                            required
                            onChange={(e) => { this.handleFileUpload(e) }}
                        />

                        { uploadtype === "transactionalSkuDetails" ?
                            <Button type="primary" disabled={!isCSVformat} onClick={() => { this.HandlerForTransSkuDetails() }}>
                                Cargar ahora </Button> :
                            <Button type="primary" disabled={!isCSVformat} onClick={() => { this.HandlerforTransSkuMapping() }}>
                                Cargar ahora </Button>
                        }
                        {isRecordEmpty && <p className={styles.error}>{"por favor cargue un archivo !"}</p>}
                        {!isCSVformat && <p className={styles.error}>{"upload CSV file only!"}</p>}
                    </div>
                    </Spin>   


                    <hr />
                    <h3>{this.props.countfisrt} 
                    {this.props.totalcount &&<span className={styles.badge}>{this.props.totalcount}</span>} 
                    {this.props.countsecond} {this.props.enablecount &&<span  className={styles.badge}>{this.props.enablecount}</span>}</h3>
                    <hr />
                </div>

                {/* <div>
                    <SeacrhSkuComponent {...this.props} />
                </div> */}

            </div>
                        
        );
    }
}

export default withAuth(UploadBydComponent);
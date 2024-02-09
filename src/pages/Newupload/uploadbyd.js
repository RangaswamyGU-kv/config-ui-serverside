
import React,{ Component } from "react";
import withAuth from "../../lib/auth/withAuth";
import { Layout } from 'antd';
import styles from '../../styles/upload.module.css';
// import UploadDocument from "./uploadDoc/uploadDoc"; 
import './upload-doc.css';
import { requestbydservices } from "../../lib/request";
import UploadBydComponent from "./uploadByd/upload";
const { Content } = Layout;
 
 
 
class UploadData extends Component {
    state = { 
        totalrecordCount: {}
     } 


    componentDidMount = async() =>{
        const url =  '/bydrecordsCount';
        try{
             
            const response = await requestbydservices(url,{},'post')
            if(response && response.data) {
                    this.setState({
                        totalrecordCount: response.data 
                    })
            }
        }
        catch(e){
            console.error("error in fetch records",e)
        }
    }

    render() { 
        const { totalrecordCount } = this.state
        return (
             
                            <div> 
                                
                                <UploadBydComponent
                                    headerLable="Transactional SKU details"
                                    mainlable="Buscar nuevo producto Archivo de datos de llegada Sección de carga y verificación"
                                    messagelable="[Solo se permiten archivos CSV y cada archivo CSV espera 200,000 como entradas máximas]"
                                    countfisrt={`Actualmente, el número total de registros de llegada de nuevos productos disponibles es: `}
                                    countsecond ={'donde el recuento habilitado es '}
                                    seacrhmessagelable="Es recomendable ingresar varios SKU a la vez con coma como separador"
                                    searchlable="SKUS"
                                    totalcount ={totalrecordCount.TransactionalSkuDetailsTotalCount}
                                    enablecount ={totalrecordCount.TransactionalSkuDetailsEnabledCount}
                                    uploadtype ="transactionalSkuDetails"
                                    // searchtype ="skudetails" 
                                    />
                                {/* <hr className="main-separator"></hr> */}
                                <UploadBydComponent    
                                    headerLable="Browse Transactional SkuMapping"
                                    mainlable="Datos de configuración del  Browse Transactional SkuMapping específicos de los accesorios relacionados con el motor de búsqueda Sección de verificación y carga"
                                    messagelable="[Solo se permiten archivos CSV y cada archivo CSV espera 200,000 como entradas máximas]"
                                    seacrhmessagelable="Es recomendable ingresar varios SKU a la vez con coma como separador"
                                    searchlable="Grupos de Material"  
                                    uploadtype ="browseTransactionalSkuMapping"  //SKUBROWSEDETAILS
                                    // searchtype = "retrieveMaterialGroupData"
                                    countfisrt={`Actualmente, el número total de registros de llegada de nuevos productos disponibles es: `}
                                    countsecond ={'donde el recuento habilitado es '}
                                    totalcount ={totalrecordCount.BrowseTransactionalSkuMappingTotalCount}
                                    enablecount ={totalrecordCount.BrowseTransactionalSkuMappingEnabledCount}
                                    />
    
                            </div>
 
             
    
        );
    }
}
 
export default withAuth(UploadData);
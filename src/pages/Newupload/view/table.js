
import React,{ Component } from "react";
import { Input, Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { requestbydservices, requestbydservicesPost } from '../../../lib/request'
class EditTable extends Component {
  state = {
    totalRecords: [],
    filterTable:null
  }


  componentDidMount = async () => {
    const url = this.props.url;
    try {
      const response = await requestbydservicesPost(url)
      if (response && response.data) {
        this.setState({
          totalRecords: response.data
        })
      }
    }
    catch (e) {
      console.error("error in fetch records", e)
    }
  }

  search = value => {
    const { totalRecords } = this.state; 
    const filterTable = totalRecords.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );

    this.setState({ filterTable });
  };
  render() {

    const { totalRecords ,filterTable} = this.state;
    const { ColumnsforTable, headerfortable, } = this.props



    return (
      <>
      <Input.Search
          style={{ width:'50%', margin: "0 0 10px 0" ,float:'right'}}
          placeholder="Search by..."
          enterButton
          onSearch={this.search}
        />
        <Table
          columns={ColumnsforTable}
          dataSource={filterTable === null ? totalRecords : filterTable} //props.records 
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 400,
            x: 450
          }}

        /></>

    );
  }
}

export default EditTable;



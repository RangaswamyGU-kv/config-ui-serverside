const endpoints = require("../endpoints");
const { serviceReq, loginToken } = require("../axios-calls");
const FormData = require('form-data');
const logger = require("../logger");


var reactAppUrl = process && process.env && process.env.REACT_APP_BASE_URL;
var feedmaster = process && process.env && process.env.REACT_APP_FEED_MASTER_URL;
var bydservice = process && process.env && process.env.REACT_APP_BYD_URL;
var comprasService = process && process.env && process.env.REACT_APP_BYD_URL;

module.exports = {
  loginService: async (req, res, next) => {
    res.send({message:'Welcome to my world'})
  },
  configlogin: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configlogin}`;
    
    // console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "POST", req.body,req.headers,false);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  config: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.config}`;    
    // console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    // console.log("response",response)
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  configMap: async (req, res, next) => {
     let finalUrl = `${reactAppUrl}${endpoints.configMap}`;    
    // console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  createconfigMap: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configMap}`;    
   // console.log("finalUrl===",finalUrl);
   let response = await serviceReq(req,finalUrl, "POST",req.body,req.headers,true);
   let statusCode = response && response.status || 400
   res.status(statusCode).send(response && response.data);
 },
 createstaticKeys: async (req, res, next) => {
  let finalUrl = `${reactAppUrl}${endpoints.staticKeys}`;    
 // console.log("finalUrl===",finalUrl);
 let response = await serviceReq(req,finalUrl, "POST",req.body,req.headers,true);
 let statusCode = response && response.status || 400
 res.status(statusCode).send(response && response.data);
},
createsupplierConfig: async (req, res, next) => {
  let finalUrl = `${reactAppUrl}${endpoints.supplierConfig}`;    
 // console.log("finalUrl===",finalUrl);
 let response = await serviceReq(req,finalUrl, "POST",req.body,req.headers,true);
 let statusCode = response && response.status || 400
 res.status(statusCode).send(response && response.data);
},
createconfigList: async (req, res, next) => {
  let finalUrl = `${reactAppUrl}${endpoints.configList}`;    
 // console.log("finalUrl===",finalUrl);
 let response = await serviceReq(req,finalUrl, "POST",req.body,req.headers,true);
 let statusCode = response && response.status || 400
 res.status(statusCode).send(response && response.data);
},
  staticKeys: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.staticKeys}`;
    
    // console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  supplierConfig: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.supplierConfig}`;
    
    // console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  configList: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.configList}`;
    
    // console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  searchCount: async (req, res, next) => {
        let finalUrl = `${feedmaster}${endpoints.configList}`;    
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    // console.log("searchCount response===",response);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  searchUploadstart: async (req, res, next) => {
    let finalUrl = `${feedmaster}${endpoints.uploadStarts}`;
    console.log("finalUrl===", finalUrl);
    console.log("payload",req.FormData)
    let response = await serviceReq(req, finalUrl, "POST",req.body, req.headers, true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  searchUploadfinish: async (req, res, next) => {
    let finalUrl = `${feedmaster}${endpoints.uploadFinished}`;
    console.log("finalUrl===", finalUrl);
    console.log("payload",req.FormData)
    let response = await serviceReq(req, finalUrl, "POST",req.body, req.headers, true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  materialgroupUpload: async (req, res, next) => {
    console.log("req",req.params)
    let finalUrl = `${feedmaster}${endpoints.matrialGroupupload}${req.params.id}`;
    console.log("finalUrl===", finalUrl);    
    let response = await serviceReq(req, finalUrl, "POST",req.body, req.headers, true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  newArrivalsUpload: async (req, res, next) => {
    console.log("req",req.params)
    let finalUrl = `${feedmaster}${endpoints.newArrivalupload}${req.params.id}`;
    console.log("finalUrl===", finalUrl);    
    let response = await serviceReq(req, finalUrl, "POST",req.body, req.headers, true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  createUser: async (req, res, next) => {
   let finalUrl = `${reactAppUrl}${endpoints.createUser}`;
    console.log("createUser finalUrl===", finalUrl);
    console.log("createUser payload",req.body)
    let response = await serviceReq(req, finalUrl, "POST",req.body, req.headers, true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  getUsers: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.getusers}`;    
    // console.log("finalUrl===",finalUrl);
    let response = await serviceReq(req,finalUrl, "GET",{},req.headers,true);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  searchSkudetails: async (req, res, next) => {
    let finalUrl = `${bydservice}${endpoints.searchtranSkuDetails}`;
    let response = await serviceReq(req, finalUrl, "GET", {}, req.headers, true);
    // console.log("searchCount response===",response);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  searchSkumapping: async (req, res, next) => {
    let finalUrl = `${bydservice}${endpoints.searchtranSkuMapping}`;
    let response = await serviceReq(req, finalUrl, "GET", {}, req.headers, true);
    // console.log("searchCount response===",response);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  getBydCount: async (req, res, next) => {
    let finalUrl = `${bydservice}${endpoints.getBydCount}`;
    let response = await serviceReq(req, finalUrl, "POST", {}, req.headers, true);
    // console.log("searchCount response===",response);
    let statusCode = response && response.status || 400
    res.status(statusCode).send(response && response.data);
  },
  comprasPrice: async (req, res, next) => {
    let finalUrl = `${reactAppUrl}${endpoints.comprasPrice}`;
     console.log("createUser finalUrl===", finalUrl);
     console.log("createUser payload",req.body)
     let response = await serviceReq(req, finalUrl, "POST",req.body, req.headers, true);
     let statusCode = response && response.status || 400
     res.status(statusCode).send(response && response.data);
   },
  
};

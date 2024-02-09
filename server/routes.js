
const express = require("express");
const routes = express.Router();
const serverController = require("./controllers/server-controller");
const endpoints = require("../server/endpoints");
routes.post("/login", serverController.loginService);
routes.post("/config-ui-login", serverController.configlogin);
routes.get("/config", serverController.config);
routes.get("/configMap", serverController.configMap);
routes.get("/staticKeys", serverController.staticKeys);
routes.get("/supplierConfig", serverController.supplierConfig);
routes.get("/configList", serverController.configList);

routes.post("/configMap", serverController.createconfigMap);
routes.post("/staticKeys", serverController.createstaticKeys);
routes.post("/supplierConfig", serverController.createsupplierConfig);
routes.post("/configList", serverController.createconfigList);


routes.get('/recordsCount',serverController.searchCount);
routes.post('/uploadStarts',serverController.searchUpload);
routes.post('/uploadFinished',serverController.searchUpload);
routes.post('/createUser',serverController.createUser);
routes.get("/users", serverController.getUsers);
module.exports = routes;

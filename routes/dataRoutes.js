const express = require('express');
const router = express.Router();

//Inporter les controllers
const dataContrller = require('../controllers/dataControllers')

router.post('/', dataContrller.postData);
router.get('/', dataContrller.getAllDatas);
router.get('/test', dataContrller.pingServer);

module.exports = router;
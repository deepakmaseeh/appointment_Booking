const express = require('express');
const router = express.Router();

const {changeAvailability ,doctorList} = require('../Controller/doctorController')



router.get('/doctorList',doctorList)

module.exports = router
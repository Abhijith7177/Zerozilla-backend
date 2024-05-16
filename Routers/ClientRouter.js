const express = require('express');
const router = express.Router();
const { updateClient } = require('../Controllers/ClientController');

router.put('/update-one', updateClient);


module.exports = router;
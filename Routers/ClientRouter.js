const express = require('express');
const router = express.Router();
const { updateClient } = require('../Controllers/clientController');

router.put('/update-one', updateClient);


module.exports = router;
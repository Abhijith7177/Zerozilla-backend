const express = require('express');
const router = express.Router();
const { createAgencyAndClient, topClients } = require('../Controllers/agencyController');

router.post('/create-agency-client', createAgencyAndClient);
router.get('/top-clients', topClients);

module.exports = router;
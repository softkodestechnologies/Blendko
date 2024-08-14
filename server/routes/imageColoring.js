const { Router } = require('express');
const { transformImageColor } = require('../controllers/imageColoring.controller');
const router = Router();

router.post('/transform', transformImageColor);

module.exports = router;

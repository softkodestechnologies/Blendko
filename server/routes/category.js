const { Router } = require('express');

const { getCategories, getCategoryByName } = require('../controllers/category.controller');

const router = Router();

router.get('/', getCategories);
router.get('/:name', getCategoryByName);

module.exports = router;

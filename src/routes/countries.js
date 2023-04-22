const { Router } = require('express');
const getCountries = require('../controllers/getCountries')
const getCountryById = require('../controllers/getCountryById')
const getCountryByName = require('../controllers/getCountryByName')

const router=Router();

router.get("/", getCountries)
router.get("/name", getCountryByName)
router.get("/:id", getCountryById)

module.exports=router;
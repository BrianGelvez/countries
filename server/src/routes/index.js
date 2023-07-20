const { Router } = require("express");
const getCountryById = require("../controllers/getCountryById");
const getCountries = require("../controllers/getCountries");
const getCountriesByName = require("../controllers/getCountriesByName");
const createActivity = require("../controllers/createActivity");
const getActivities  = require("../controllers/getActivities");
const updateActivity = require("../controllers/updateActivity")
const deleteActivity = require("../controllers/deleteActivity");

const router = Router();

router.get('/countries/search/name', getCountriesByName);
router.get('/countries/id/:id', getCountryById); 
router.get('/countries', getCountries);
router.get('/countries/:page', getCountries);
router.post('/activities', createActivity);
router.get('/activities', getActivities);
router.put('/activities/:id', updateActivity);
router.delete('/activities/:id', deleteActivity);

module.exports = router;
